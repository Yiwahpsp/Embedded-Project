
// const express = require('express');
// const axios = require('axios'); // For HTTP requests

// const app = express();
// const PORT = 3000;

// // Blynk configuration
// const BLYNK_AUTH_TOKEN = 'vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR'; // Replace with your token

// // Function to fetch data from Blynk
// async function fetchData(pin:string) {
//   try {
//       const response = await axios.get(`https://blynk.cloud/external/api/get?token=vXdbpLJhdWTQ5SSgZKoJJqFsorep2MKR&D12`);
//       return response.data;
//   } catch (error:any) {
//       console.error('Error fetching data:', error.message);
      
//       throw error;
//   }
// }

// // API Endpoint to fetch data dynamically
// app.get('/api/sensor-value', async (req : any, res: any) => {
//     const pin = req.query.pin; // Get pin from query parameter (e.g., /api/sensor-value?pin=V0)
//     if (!pin) {
//         return res.status(400).send('Pin parameter is required');
//     }

//     try {
//         const value = await fetchData(pin);
//         res.json({ value });
//     } catch (error) {
//         res.status(500).send('Error fetching data from Blynk');
//     }
// });

// // Serve frontend files (if needed)
// app.use(express.static('public')); // Ensure your frontend files are in a folder named "public"

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
