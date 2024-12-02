export async function getHumid() {
    try {
        const url = `https://sgp1.blynk.cloud/external/api/get?token=GkfMi5Ps6KQlrQahmVq0Ku_bqRewBTFw&V1`
        console.log(url)
        const response = await fetch(`https://sgp1.blynk.cloud/external/api/get?token=GkfMi5Ps6KQlrQahmVq0Ku_bqRewBTFw&V1`)
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