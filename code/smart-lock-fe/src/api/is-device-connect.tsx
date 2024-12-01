export async function isDeviceConnected(): Promise<boolean> {
    try {
        const response = await fetch('https://sgp1.blynk.cloud/external/api/isHardwareConnected?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR')
        if (!response) {
            return false;
        }
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
        return false;
    }
}