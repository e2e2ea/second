import dotenv from 'dotenv';

dotenv.config();
import categories from './constant/copy.js';
import fs from 'fs';
import path from 'path';

const getData = async () => {
  let totalProducts = 0;
  for (const categ of categories) {
    const category = categ.category;
    for (const sub of categ.subCategories) {
      const subCategory = sub.subCategory;
      for (const ext of sub.childItems) {
        const extensionCategory = ext.extensionCategory ? ext.extensionCategory : '';
        let products = [];
        let ColesData;
        try {
          ColesData = JSON.parse(fs.readFileSync(`coles/data/${process.env.FOLDER_DATE}/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, 'utf8'));
        } catch (error) {
          continue;
        }
        for (const data of ColesData) {
          try {
            if (!data.source_url || data.source_url === '' || data.source_url === null) throw new Error(`No source URL, id: ${data.source_id}, category:${category} - ${subCategory} - ${extensionCategory}.json`);
            if (!data.image_url || data.image_url === '' || data.image_url === null) throw new Error(`No image URL, id: ${data.source_id}, category:${category} - ${subCategory} - ${extensionCategory}.json`);
          } catch (error) {
            console.log('error', error);
            continue;
          }
        //   try {
        //     if (data.prices && Array.isArray(data.prices)) {
        //       for (const priceEntry of data.prices) {
        //         // Parse the price and price_per_unit
        //         let price = parseFloat(priceEntry.price);
        //         let pricePerUnit = parseFloat(priceEntry.price_per_unit);

        //         // Check if price is a decimal
        //         if (!Number.isInteger(price)) {
        //           if (!Number.isNaN(price)) {
        //             price = Math.round(price * 100); // Convert to cents
        //             pricePerUnit = Math.round(pricePerUnit * 100);
        //           } else {
        //             priceEntry.price = '';
        //             priceEntry.price_per_unit = pricePerUnit.toString();
        //           }
        //         }
        //       }
        //     }
        //   } catch (priceError) {
        //     console.error(`Price issue detected: ${priceError.message}`);
        //     continue; // Skip this product if there are price issues
        //   }
          products.push(data);
        }
        try {
          // if (products && products.length > 0) {
          //   fs.writeFileSync(`coles/data/${process.env.FOLDER_DATE}/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, JSON.stringify(products, null, 2)); // Pretty print with 2 spaces
          // }
        } catch (error) {
          console.error('Error writing data to file:', error);
        }
      }
    }
  }
  console.log('All products in coles passed in test')
};

(async () => {
  await getData();
})();
