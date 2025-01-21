import categories from './constant/copy.js';
import fs from 'fs';

const getData = async () => {
  let totalProducts = 0;
  for (const categ of categories) {
    const category = categ.category;
    for (const sub of categ.subCategories) {
      const subCategory = sub.subCategory;
      for (const ext of sub.childItems) {
        const extensionCategory = ext.extensionCategory ? ext.extensionCategory : '';
        let products = [];
        let woolworthsData;
        try {
          woolworthsData = JSON.parse(fs.readFileSync(`woolworths/data/1-21-2025/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, 'utf8'));
        } catch (error) {
          continue;
        }
        for (const data of woolworthsData) {
          try {
            if (!data.source_url || data.source_url === '' || data.source_url === null) throw new Error(`No source URL, id: ${data.source_id}, category:${category} - ${subCategory} - ${extensionCategory}.json`);
            if (!data.image_url || data.image_url === '' || data.image_url === null) throw new Error(`No image URL, id: ${data.source_id}, category:${category} - ${subCategory} - ${extensionCategory}.json`);
          } catch (error) {
            console.log('error', error);
            continue;
          }
          try {
            if (data.prices && Array.isArray(data.prices)) {
              for (const priceEntry of data.prices) {
                let price = parseFloat(priceEntry.price);
                let pricePerUnit = parseFloat(priceEntry.price_per_unit);

                if (!Number.isInteger(price)) {
                  if (!Number.isNaN(price)) {
                    price = Math.round(price * 100);
                    pricePerUnit = Math.round(pricePerUnit / 100);
                  } else {
                    priceEntry.price = '';
                    priceEntry.price_per_unit = pricePerUnit.toString();
                  }
                }
              }
            }
          } catch (priceError) {
            console.error(`Price issue detected: ${priceError.message}`);
            continue; // Skip this product if there are price issues
          }
          products.push(data);
        }
        try {
          if (products && products.length > 0) {
            console.log('running here');
            fs.writeFileSync(`woolworths/data/1-21-2025/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, JSON.stringify(products, null, 2)); // Pretty print with 2 spaces
          }
        } catch (error) {
          console.error('Error writing data to file:', error);
        }
      }
    }
  }
  console.log('All products in woolworths passed in test');
};

(async () => {
  await getData();
})();
