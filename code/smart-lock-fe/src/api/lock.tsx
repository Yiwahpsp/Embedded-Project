export async function getLockStatus() {
  const url = `https://blynk.cloud/external/api/token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&V5=1`;
  try {
    const response = await fetch(url, { method: "GET" });
    if (response.ok) {
      console.log("Blynk API request successful!");
    } else {
      console.log("Blynk API request failed!");
    }
    return await response.json();
  } catch (error) {
    console.error("Error interacting with Blynk:", error);
  }
}

export async function updateLockStatus() {
  const url = `https://blynk.cloud/external/api/update?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&V5=${1}`;
  try {
    const response = await fetch(url, { method: "GET" });
    if (response.ok) {
      console.log("Blynk API request successful!");
    } else {
      console.log("Blynk API request failed!");
    }
  } catch (error) {
    console.error("Error interacting with Blynk:", error);
  }
}