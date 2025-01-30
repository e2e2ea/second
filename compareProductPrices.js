import dotenv from 'dotenv';

dotenv.config();
import categories from './constant/copy.js';
import fs from 'fs';
import path from 'path';
const safeParseFloat = (value) => {
  return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
};
const getData = async () => {
  let totalProducts = 0;
  for (const categ of categories) {
    const category = categ.category;
    for (const sub of categ.subCategories) {
      const subCategory = sub.subCategory;
      for (const ext of sub.childItems) {
        const extensionCategory = ext.extensionCategory ? ext.extensionCategory : '';
        let productsPricesUpdated = [];
        let oldData;
        let newData;

        try {
          oldData = JSON.parse(fs.readFileSync(`matched/1-22-2025/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, 'utf8'));
        } catch (error) {
          continue;
        }
        try {
          newData = JSON.parse(fs.readFileSync(`matched/1-27-2025/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, 'utf8'));
        } catch (error) {
          continue;
        }

        for (const data of oldData) {
          const product = newData.find((p) => p.shop === data.shop && p.source_id === data.source_id);
          let toSave = false;
          let pricesUpdated = [];
          if (product) {
            toSave = true;
            for (const price of data.prices) {
              if (price && price.state) {
                const a = await product.prices.find((p) => p.state === price.state);
                if (a && a.price && price && price.price) {
                  let priceGap;
                  let oldPrice;
                  let newPrice;
                  let ratePrice;
                  if (price.price && a.price) {
                    oldPrice = safeParseFloat(price.price);
                    newPrice = safeParseFloat(a.price);
                    priceGap = oldPrice - newPrice;
                    ratePrice = oldPrice !== 0 ? (priceGap / oldPrice) * 100 : 0;
                  }
                  let pricePerUnitGap;
                  let oldPricePerUnit;
                  let newPricePerUnit;
                  let ratePricePerUnitGap;
                  if (price.price_per_unit && a.price_per_unit) {
                    oldPricePerUnit = safeParseFloat(price.price_per_unit);
                    newPricePerUnit = safeParseFloat(a.price_per_unit);
                    pricePerUnitGap = oldPricePerUnit - newPricePerUnit;
                    ratePricePerUnitGap = oldPrice !== 0 ? (pricePerUnitGap / oldPricePerUnit) * 100 : 0;
                    // console.log(
                    //   `${category} - ${subCategory} - ${extensionCategory}`,
                    //   'id',
                    //   data.source_id,
                    //   'state',
                    //   price.state,
                    //   'oldPricePerUnit: ',
                    //   oldPricePerUnit,
                    //   'newPricePerUnit',
                    //   newPricePerUnit,
                    //   'pricePerUnitGap',
                    //   pricePerUnitGap
                    // );
                  }
                  pricesUpdated.push({
                    state: price.state,
                    ...(oldPrice !== null || oldPrice !== undefined ? { oldPrice: oldPrice } : {}),
                    ...(newPrice !== null || newPrice !== undefined ? { newPrice: newPrice } : {}),
                    ...(priceGap !== null || priceGap !== undefined ? { priceGap: priceGap } : {}),
                    ...(ratePrice !== null || ratePrice !== undefined ? { ratePrice: ratePrice } : {}),
                    ...(oldPricePerUnit !== null || oldPricePerUnit !== undefined ? { oldPricePerUnit: oldPricePerUnit } : {}),
                    ...(newPricePerUnit !== null || newPricePerUnit !== undefined ? { newPricePerUnit: newPricePerUnit } : {}),
                    ...(pricePerUnitGap !== null || pricePerUnitGap !== undefined ? { pricePerUnitGap: pricePerUnitGap } : {}),
                    ...(ratePricePerUnitGap !== null || ratePricePerUnitGap !== undefined ? { ratePricePerUnitGap: ratePricePerUnitGap } : {}),
                  });
                }
              }
            }
          }
          if (toSave) {
            const formattedProduct2 = {
              source_url: data.source_url || null,
              name: data.name || null,
              image_url: data.image_url || null,
              source_id: data.source_id || null,
              barcode: data.barcode || null,
              shop: data.shop || null,
              category_id: data.category_id,
              weight: data.weight || null,
              prices: pricesUpdated,
            };
            productsPricesUpdated.push(formattedProduct2);
          }
        }
        try {
          if (productsPricesUpdated && productsPricesUpdated.length > 0) {
            totalProducts = totalProducts + productsPricesUpdated.length;
            console.log('totalProducts', totalProducts);
            const baseFolder = `./pricing/${process.env.FOLDER_DATE}`;
            const folderPath = path.join(baseFolder, `${category}`);
            const fileName = `${category} - ${subCategory} - ${extensionCategory}.json`;
            const filePath = path.join(folderPath, fileName);
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath, { recursive: true });
              console.log(`Created folder: ${folderPath}`);
            }
            fs.writeFileSync(filePath, JSON.stringify(productsPricesUpdated, null, 2));
            console.log(`Data saved to ${filePath}`);
          }
          // try {
          //   const externalApiUrl = process.env.JARROD_API;
          //   const apiKey = process.env.JARROD_KEY;

          //   const response = await axios.post(externalApiUrl, productsMatched, {
          //     headers: {
          //       accept: 'application/json',
          //       'X-API-Key': apiKey,
          //       'Content-Type': 'application/json',
          //     },
          //   });

          //   console.log('Success! Response:', response.data);
          // } catch (error) {
          //   if (error.response) {
          //     console.error('Error response:', error.response.status, error.response.data);
          //   } else if (error.request) {
          //     console.error('No response received:', error.request);
          //   } else {
          //     console.error('Error:', error.message);
          //   }
          // }
        } catch (error) {
          console.error('Error writing data to file:', error);
        }
      }
    }
  }
};

(async () => {
  await getData();
})();
