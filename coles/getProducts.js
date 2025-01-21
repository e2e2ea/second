import categories from '../constant/main.js';
import fs from 'fs';
import path from 'path';
import Product from './models/products.js';
import dbConnect from './db/dbConnect.js';
import { createArrayCsvWriter } from 'csv-writer';

const getDate = new Date();
const month = getDate.getMonth() + 1;
const day = getDate.getDate();
const year = getDate.getFullYear();

const formattedDate = `${month}-${day}-${year}`;
const csvWriter = createArrayCsvWriter({
  path: `./coles/output_${formattedDate}.csv`,
  header: ['Category', 'SubCategory', 'Extension', 'Products'],
});
const categoriesId = JSON.parse(fs.readFileSync(`./constant/categories.json`, 'utf8'));

const getData = async () => {
  await dbConnect();
  let data = [];
  for (const categ of categories) {
    const category = categ.category;
    let categId = '';
    const matchedCategory = categoriesId.find((cat) => cat.name === category);
    if (matchedCategory) {
      categId = matchedCategory.id;
    } else {
      console.warn(`Category "${category}" not found in categoriesId`);
    }
    for (const sub of categ.subCategories) {
      const subCategory = sub.subCategory;
      for (const ext of sub.childItems) {
        const extensionCategory = ext.extensionCategory ? ext.extensionCategory : '';
        const a = await Product.find({ category: category, subCategory: subCategory, extensionCategory: extensionCategory }).exec();
        const productsData = a.map((product) => {
          const productObj = product.toObject();
          const cleanedPrices = productObj.prices.map((price) => {
            const { _id, ...rest } = price; // Destructure to exclude _id
            return rest; // Return the remaining price object without _id
          });
          const formattedProduct = {
            source_url: productObj.source_url || null,
            name: productObj.name || null,
            image_url: productObj.image_url || null,
            source_id: `Coles - ${productObj.coles_product_id}` || null,
            barcode: productObj.barcode || '',
            category_id: categId || '',
            shop: productObj.shop || null,
            weight: productObj.weight || '',
            prices: cleanedPrices,
          };

          return formattedProduct;
        });
        // const baseFolder = `./coles/data/${formattedDate}`;
        const baseFolder = `./coles/data/1-21-2025`;
        const folderPath = path.join(baseFolder, category);
        const toPush = [category, subCategory, extensionCategory, productsData.length];
        data.push(toPush);
        // Ensure the folder exists
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist
          console.log(`Created folder: ${folderPath}`);
        }

        const fileName = `${category} - ${subCategory} ${extensionCategory ? `- ${extensionCategory === 'Floor/Carpet Cleaners' ? 'Floor - Carpet Cleaners' : extensionCategory}` : ''}.json`;
        const filePath = path.join(folderPath, fileName);
        // Check if the file already exists
        if (fs.existsSync(filePath)) {
          console.log(`File already exists: ${filePath}. Skipping save.`);
          // return; // Skip saving the file
        }
        try {
          console.log(`${fileName} - ${productsData.length} products`);
          fs.writeFileSync(filePath, JSON.stringify(productsData, null, 2)); // Pretty print with 2 spaces
          console.log(`Data saved to ${filePath}`);
        } catch (error) {
          console.error('Error writing data to file:', error);
        }
        // try {
        //   if (productsData.length > 0) {
        //     const externalApiUrl = 'https://tell-me-backend-dev.appelloproject.xyz/import-products';
        //     const apiKey = 'x2M+ObTQi1pWce/Aeof0PRBK+cGht2RbUow4iwWFrA0=';
        //     const data = JSON.parse(JSON.stringify(productsData));

        //     const response = await axios.post(externalApiUrl, data, {
        //       headers: {
        //         accept: 'application/json',
        //         'X-API-Key': apiKey,
        //         'Content-Type': 'application/json',
        //       },
        //     });

        //     console.log('Success! Response:', response.data);
        //   }
        // } catch (error) {
        //   if (error.response) {
        //     console.error('Error response:', error.response.status, error.response.data);
        //   } else if (error.request) {
        //     console.error('No response received:', error.request);
        //   } else {
        //     console.error('Error:', error.message);
        //   }
        // }
      }
    }
  }
  csvWriter
    .writeRecords(data)
    .then(() => {
      console.log('CSV file created successfully!');
    })
    .catch((err) => {
      console.error('Error writing CSV file:', err);
    });
};

(async () => {
  await getData();
})();
