

export async function getHumid(){
    try {
        const response = await fetch('https://blynk.cloud/external/api/get?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&V1')
        if (!response){
            return null;
        }
        const data = await response.json();
        // Adjust this based on the actual data structure
        
        return data;
    }catch(err){
         console.log(err);
         return null;
    }
} 