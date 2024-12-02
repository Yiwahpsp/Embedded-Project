#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <Adafruit_Fingerprint.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define WIFI_SSID "Yiwahpsp"
#define WIFI_PASSWORD "1234567890"
#define USER_EMAIL "lnwlockhacker69@gmail.com"
#define USER_PASSWORD "Embedded123"
#define API_KEY "AIzaSyC_LXPtK-FW47cLFagdc9RBda9WcegZvK4"
#define DATABASE_URL "https://smart-lock-embedded-project-default-rtdb.asia-southeast1.firebasedatabase.app"

// Fingerprint
#define RX_PIN 16 // GPIO for RX (sensor's TX)
#define TX_PIN 17 // GPIO for TX (sensor's RX)
#define LOCK_PIN 18

// Blynk
#define BLYNK_PRINT Serial
#define BLYNK_TEMPLATE_ID "TMPL61hwcGp-v"
#define BLYNK_TEMPLATE_NAME "embeded"
#define BLYNK_AUTH_TOKEN "GkfMi5Ps6KQlrQahmVq0Ku_bqRewBTFw"
#include <BlynkSimpleEsp32.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <BH1750.h>
#include <Wire.h>


BH1750 lightMeter;
#define LNPIN 12 
#define RELAYPIN 23

#define DHTPIN 4 
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

BlynkTimer timer; // Announcing the timer

int V4_val = 2;
int V5_val = 0;
volatile bool doorUnlocked = false;

// Night light
BLYNK_WRITE(V4)
{
  V4_val = param.asInt();
  Serial.print("V4 value is: ");
  Serial.println(V4_val);
}

// Lock
BLYNK_WRITE(V5)
{
  V5_val = param.asInt();
  Serial.print("V5 value is: ");
  Serial.println(V5_val);
  if (V5_val == 1) {
    doorOpen();
    Blynk.virtualWrite(V5, 0);
  }

}

const char* ntpServer = "pool.ntp.org";

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial2);

QueueHandle_t controlQueue;  // (0 = stop, 1 = run)
SemaphoreHandle_t operationSemaphore;
bool operationInProgress = false;

String lastCommand = "";
int lastIndex = -1;
int p = -1;

unsigned long getTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    return 0;
  }
  return time(NULL);
}

void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi...");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(500);
  }

  Serial.print("Connected with IP: "); Serial.println(WiFi.localIP());
  Serial.println();
}

void initFingerprint() {
  pinMode(LOCK_PIN, OUTPUT);
  digitalWrite(LOCK_PIN, LOW);
 
  Serial2.begin(115200, SERIAL_8N1, RX_PIN, TX_PIN);
  finger.begin(57600);
  
  Serial.println("Finding fingerprint sensor...");
  while (!finger.verifyPassword()) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("Found fingerprint sensor! :D");
}

void setup() {
  Serial.begin(115200);

  initWiFi();
  initFingerprint();
  Blynk.begin(BLYNK_AUTH_TOKEN, WIFI_SSID, WIFI_PASSWORD);
  Wire.begin();
  lightMeter.begin();
  dht.begin();

  // Create FreeRTOS queue and mutex
  controlQueue = xQueueCreate(5, sizeof(uint8_t));
  operationSemaphore = xSemaphoreCreateBinary();
  xSemaphoreGive(operationSemaphore);

  // Configure NTP for time synchronization
  configTime(0, 0, ntpServer);
  
  // Create FreeRTOS tasks
  xTaskCreate(firebaseTask, "Firebase Task", 8192, NULL, 2, NULL);
  xTaskCreate(fingerprintTask, "Fingerprint Task", 8192, NULL, 1, NULL);

  pinMode(LNPIN, OUTPUT);
  pinMode(RELAYPIN, OUTPUT);
  digitalWrite(LNPIN, LOW);
  digitalWrite(RELAYPIN, LOW);

  timer.setInterval(2000L, dhtNlux); //timer will run every sec
}

void loop() {
  Blynk.run();
  timer.run();
  if (doorUnlocked) {
        Blynk.virtualWrite(V5, 1);
    } else {
        Blynk.virtualWrite(V5, 0);
    }
}

void firebaseTask(void* param) {
    while (true) {
        if (WiFi.status() == WL_CONNECTED) {
            HTTPClient firebaseHttp;
            String url = String(DATABASE_URL) + "/fingerprint/action.json?auth=" + String(API_KEY);

            firebaseHttp.begin(url);
            int httpResponseCode = firebaseHttp.GET();

            if (httpResponseCode == HTTP_CODE_OK) {
                String response = firebaseHttp.getString();

                if (response == "null" || response.length() == 0) {
                    Serial.print(".");
                    firebaseHttp.end();
                    vTaskDelay(1000 / portTICK_PERIOD_MS);
                    continue;
                }

                Serial.println("Listening Firebase Response: " + response);

                DynamicJsonDocument doc(256);
                DeserializationError error = deserializeJson(doc, response);
                if (!error) {
                    String command = doc["command"].as<String>();
                    int index = doc["index"].as<int>();

                    if (command == lastCommand && index == lastIndex) {
                        Serial.println("Duplicate command detected. Skipping...");
                        vTaskDelay(1000 / portTICK_PERIOD_MS);
                        continue;
                    }

                    lastCommand = command;
                    lastIndex = index;

                    if (command == "create" || command == "delete") {
                        Serial.printf("Received command: %s, index: %d\n", command.c_str(), index);
                        handleFingerprintCommand(command, index);

                        // Clear the action in Firebase
                        String clearUrl = String(DATABASE_URL) + "/fingerprint/action.json?auth=" + String(API_KEY);
                        HTTPClient clearHttp;
                        clearHttp.begin(clearUrl);
                        clearHttp.sendRequest("DELETE");
                        clearHttp.end();
                    }
                } else {
                    Serial.println("Failed to parse JSON response.");
                }
            } else {
                Serial.printf("Error during HTTP GET: %s\n", firebaseHttp.errorToString(httpResponseCode).c_str());
            }

            firebaseHttp.end();
        } else {
            Serial.println("Wi-Fi disconnected.");
        }

        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}


void fingerprintTask(void* param) {
    while (true) {
        int result = finger.getImage();
        uint8_t fingerprintID = 0;

        if (result == FINGERPRINT_NOFINGER) {
            vTaskDelay(500 / portTICK_PERIOD_MS);
            continue;
        }

        if (result == FINGERPRINT_OK) {
            result = finger.image2Tz();
            if (result == FINGERPRINT_OK) {
                result = finger.fingerFastSearch();
                if (result == FINGERPRINT_OK) {
                    fingerprintID = finger.fingerID;
                    Serial.printf("Fingerprint match with ID #%d\n", fingerprintID);

                    // Unlock the door
                    doorUnlocked = true;
                    digitalWrite(RELAYPIN, HIGH);
                    Serial.println("Door unlocking...");
                    vTaskDelay(5000 / portTICK_PERIOD_MS); // Keep door unlocked for 5 seconds

                    // Lock the door
                    doorUnlocked = false;
                    digitalWrite(RELAYPIN, LOW);
                    Serial.println("Door locked");
                } else {
                    Serial.println("No match found.");
                }
            } else {
                Serial.println("Error converting fingerprint.");
            }
        }

        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}

void doorOpen(){
  digitalWrite(RELAYPIN, HIGH);
  Serial.print("dooropen");
  delay(5000);
  digitalWrite(RELAYPIN, LOW);
  delay(1000);
}


void handleFingerprintCommand(String command, int index) {
  if (xSemaphoreTake(operationSemaphore, portMAX_DELAY) == pdTRUE) {
        // Critical section
        if (index < 1 || index > 127) {
            Serial.println("Invalid index");
            xSemaphoreGive(operationSemaphore);
            return;
        }

        if (command == "create") {
            Serial.printf("Creating fingerprint at index %d...\n", index);
            createFingerprint(index);
        } else if (command == "delete") {
            Serial.printf("Deleting fingerprint at index %d...\n", index);
            int result = finger.deleteModel(index);
            if (result == FINGERPRINT_OK) {
                Serial.printf("Successfully deleted fingerprint at index %d.\n", index);
            } else {
                Serial.printf("Failed to delete fingerprint at index %d. Error code: %d\n", index, result);
            }
        }

        delay(3000);
        xSemaphoreGive(operationSemaphore);
  } else {
        Serial.println("Operation already in progress. Skipping command.");
  }
}

void createFingerprint(int index) {
  Serial.println("Place your finger for the first scan");
  if(takeFingerprint(1)) { //1st buffer
    delay(2000);
    Serial.println("Place the same finger for the second scan");

    if(takeFingerprint(2)) { //2nd buffer

      if (finger.createModel() == FINGERPRINT_OK) { //Create model
        Serial.println("Fingerprint model created successfully!");

        if (finger.storeModel(index) == FINGERPRINT_OK) { //Store model
          Serial.println("Fingerprint model stored successfully!");
        } else Serial.println("Failed to store fingerprint");
      } else Serial.println("Failed to create fingerprint");
    } else Serial.println("Second scan failed");
  } else Serial.println("First scan failed");
  delay(5000);
}

bool takeFingerprint(uint8_t id) {
  p = -1;
  uint8_t timeout = 10000;
  Serial.println("Place your finger on the sensor...");

  while (p != FINGERPRINT_OK && timeout > 0) { //Take fingerprint buffer #BufferID
    p = finger.getImage();
    timeout -= 500;
    delay(500);
    
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.print(".");
        break;
      default:
        Serial.println("Error ID# " + p);
        return false;
    }
  }

  p = finger.image2Tz(id); //Fingerprint to template #BufferID
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      return true;
    default:
      Serial.println("Error ID# " + p);
      return false;
  }
}

void postToFirebase(String jsonData) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient firebaseHttp;
    String url = String(DATABASE_URL) + "/fingerprint/log.json?auth=" + String(API_KEY);

    firebaseHttp.begin(url);
    firebaseHttp.addHeader("Content-Type", "application/json"); // Required header for JSON data

    // Send POST request
    int httpResponseCode = firebaseHttp.POST(jsonData);
    delay(1000);

    if (httpResponseCode > 0) {
      Serial.print("Sending FIREBASE Response Code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error sending POST: ");
      Serial.println(firebaseHttp.errorToString(httpResponseCode).c_str());
    }

    firebaseHttp.end(); // Free resources
  } else {
    Serial.println("Wi-Fi Disconnected");
  }
}

void dhtNlux() {
    // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);
  // Read lux
  float lux = lightMeter.readLightLevel();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) ||  isnan(f) || isnan(lux)) {
    return;
  }

  // Compute heat index in Fahrenheit (the default)
  float humidity = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float temperature = dht.computeHeatIndex(t, h, false);
  //Serial.print("Light: ");
  //Serial.print(lux);
  //Serial.println(" lx");
  if(V4_val == 2){
    if (lux < 40){
      digitalWrite(LNPIN, HIGH);
    } else if (lux < 40) {
      digitalWrite(LNPIN, LOW);
    }
  } else {
    digitalWrite(LNPIN, V4_val);
  }
  Blynk.virtualWrite(V0, temperature);
  Blynk.virtualWrite(V1, humidity);
  Blynk.virtualWrite(V3, lux);
}
