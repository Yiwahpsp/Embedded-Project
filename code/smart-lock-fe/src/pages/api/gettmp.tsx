import { error } from "console"


export async function getTemp(){
    try {
        const response = await fetch('https://blynk.cloud/external/api/get?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&V0')
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