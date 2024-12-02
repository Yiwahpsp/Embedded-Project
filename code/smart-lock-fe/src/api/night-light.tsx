export async function getNightLightStatus() {
    try {
        const response = await fetch('https://sgp1.blynk.cloud/external/api/get?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&V4')
        if (!response) {
            return null;
        }
        const data = await response.json();
        console.log(data);

        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const updateNightLightStatus = async (value: number): Promise<boolean> => {
    try {
        const response = await fetch(
            `https://blynk.cloud/external/api/update?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&V4=${value}`,
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            console.error(`Server Error: ${response.statusText}`);
            return false;
        }

        // Check if response has content
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Update Successful:', data);
        } else {
            console.warn('No JSON response received.');
        }

        return true;
    } catch (error) {
        console.error('Fetch Error:', error);
        return false;
    }
};