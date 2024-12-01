export async function getNightLightStatus() {
    try {
        const response = await fetch('https://sgp1.blynk.cloud/external/api/get?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&V4')
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

export async function updateNightLightStatus(status: number) {
    try {
        const response = await fetch(`https://blynk.cloud/external/api/update?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&V4=${status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
    }
    catch (err) {
        console.log(err);
        return null;
    }
}