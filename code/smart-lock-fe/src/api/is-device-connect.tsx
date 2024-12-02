export async function isDeviceConnected(): Promise<boolean> {
    try {
        const response = await fetch(`https://sgp1.blynk.cloud/external/api/isHardwareConnected?token=GkfMi5Ps6KQlrQahmVq0Ku_bqRewBTFw`)
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