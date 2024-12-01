export async function getTemp() {
    try {
        const response = await fetch('https://sgp1.blynk.cloud/external/api/get?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&V0')
        if (!response) {
            return null;
        }
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
} 