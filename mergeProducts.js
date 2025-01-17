import categories from './constant/copy.js';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const getData = async () => {
  // console.log('categ', categories.length)
  let totalProducts = 0;
  // let data = [];

  let woolworthsData;
  let ColesData;
  try {
    woolworthsData = JSON.parse(fs.readFileSync(`colesProducts.json`, 'utf8'));
    ColesData = JSON.parse(fs.readFileSync(`woolyProducts.json`, 'utf8'));
  } catch (error) {
    console.error('Error reading data from file:', error);
  }

  try {
    if (woolworthsData.length > 0 && ColesData.length > 0) {
      // fs.writeFileSync('allproducts.json', JSON.stringify([...ColesData, ...woolworthsData], null, 2)); // Pretty print with 2 spaces
    }
  } catch (error) {
    console.error('Error writing data to file:', error);
  }

  return [...ColesData];
};
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // (async () => {
// //   try {
// //     const data = await getData(); // Replace with your function to fetch data
// //     const externalApiUrl = 'https://tell-me-backend-dev.appelloproject.xyz/import-products';
// //     const apiKey = 'x2M+ObTQi1pWce/Aeof0PRBK+cGht2RbUow4iwWFrA0=';

// //     // // Send the products to the external API
// //     // const response = await axios.post(externalApiUrl, data, {
// //     //   headers: {
// //     //     accept: 'application/json',
// //     //     'X-API-Key': apiKey,
// //     //     'Content-Type': 'application/json',
// //     //   },
// //     // });
// //     const curlCommand = `
// //       curl -X 'POST' \
// //       '${externalApiUrl}' \
// //       -H 'accept: application/json' \
// //       -H 'X-API-Key: ${apiKey}' \
// //       -H 'Content-Type: application/json' \
// //       -d '${jsonData}'
// //     `;

// //   exec(curlCommand, (error, stdout, stderr) => {
// //     if (error) {
// //       console.error(`Error executing curl: ${error.message}`);
// //       return;
// //     }

// //     if (stderr) {
// //       console.error(`Curl stderr: ${stderr}`);
// //       return;
// //     }

// //     console.log(`Curl response: ${stdout}`);
// //   });
// //     // Log the success response
// //     console.log('Success! Data uploaded successfully.');
// //     console.log('Response Data:', response.data);
// //     console.log('Status Code:', response.status);
// //   } catch (error) {
// //     // Handle errors and log them
// //     console.error('Error occurred during the API request:');

// //     if (error.response) {
// //       // Server responded with a status code out of the 2xx range
// //       console.error('Status Code:', error.response.status);
// //       console.error('Response Data:', error.response.data);
// //     } else if (error.request) {
// //       // Request was made but no response received
// //       console.error('No response received:', error.request);
// //     } else {
// //       // Something else caused the error
// //       console.error('Error Message:', error.message);
// //     }
// //   }
// // })();
// (async () => {
//   try {
//     const data = await getData(); // Replace with your function to fetch data
//     const externalApiUrl = 'https://tell-me-backend-dev.appelloproject.xyz/import-products';
//     const apiKey = 'x2M+ObTQi1pWce/Aeof0PRBK+cGht2RbUow4iwWFrA0=';
//     const jsonPayload = JSON.parse(JSON.stringify(data));
//     // Write data to a temporary file
//     // const tempFilePath = path.join(__dirname, 'woolyProducts.json');
//     // fs.writeFileSync(tempFilePath, JSON.stringify(data));

//     // Define the curl command
//     const curlCommand = `
//   curl -X 'POST' \
//   'https://tell-me-backend-dev.appelloproject.xyz/import-products' \
//   -H 'accept: application/json' \
//   -H 'X-API-Key: x2M+ObTQi1pWce/Aeof0PRBK+cGht2RbUow4iwWFrA0=' \
//   -H 'Content-Type: application/json' \
//   -d '${jsonPayload}'
// `;

//     // Execute the curl command
//     exec(curlCommand, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error executing curl: ${error.message}`);
//         return;
//       }

//       if (stderr) {
//         console.error(`Curl stderr: ${stderr}`);
//       }

//       // Log the raw response
//       console.log(`Raw Curl response:`, stdout);

//       // If stdout is empty, notify
//       if (!stdout.trim()) {
//         console.error('Curl response is empty or undefined.');
//       } else {
//         console.log(`Curl response: ${stdout}`);
//       }
//     });
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// })();
(async () => {
  try {
    const externalApiUrl = 'https://tell-me-backend-dev.appelloproject.xyz/import-products';
    const apiKey = '';
    const a = fs.readFileSync('colesProducts.json', 'utf-8')
    const data = JSON.parse(JSON.stringify(a));

    const response = await axios.post(externalApiUrl, data, {
      headers: {
        accept: 'application/json',
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    console.log('Success! Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
})();
