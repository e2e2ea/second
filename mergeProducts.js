import categories from './constant/copy.js';
import fs from 'fs';
import path from 'path';

const getData = async () => {
  // console.log('categ', categories.length)
  let totalProducts = 0;
  // let data = [];
  for (const categ of categories) {
    const category = categ.category;
    for (const sub of categ.subCategories) {
      const subCategory = sub.subCategory;
      for (const ext of sub.childItems) {
        const extensionCategory = ext.extensionCategory ? ext.extensionCategory : '';
        let woolworthsData;
        let ColesData;
        try {
          woolworthsData = JSON.parse(fs.readFileSync(`colesProducts.json`, 'utf8'));
          ColesData = JSON.parse(fs.readFileSync(`woolyProducts.json`, 'utf8'));
        } catch (error) {
          continue; // Skip to the next extensionCategory
        }

        try {
          if (woolworthsData.length > 0 && ColesData.length > 0) {
            fs.writeFileSync('allproducts.json', JSON.stringify([...ColesData, ...woolworthsData], null, 2)); // Pretty print with 2 spaces
          }
        } catch (error) {
          console.error('Error writing data to file:', error);
        }
      }
    }
  }
  return [...ColesData, ...woolworthsData];
};

(async () => {
  const data = await getData();
  const externalApiUrl = 'https://tell-me-backend-dev.appelloproject.xyz/import-products';
  const apiKey = 'x2M+ObTQi1pWce/Aeof0PRBK+cGht2RbUow4iwWFrA0=';

  // Send the products to the external API
  const response = await axios.post(externalApiUrl, data, {
    headers: {
      accept: 'application/json',
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
  });
})();
