import dotenv from 'dotenv';

dotenv.config();
import categories from './constant/copy.js';
import fs from 'fs';
import path from 'path';
import { search } from 'fast-fuzzy';

const getData = async () => {
  let totalProducts = 0;

  for (const categ of categories) {
    const category = categ.category;

    for (const sub of categ.subCategories) {
      const subCategory = sub.subCategory;

      for (const ext of sub.childItems) {
        const extensionCategory = ext.extensionCategory ? ext.extensionCategory : '';
        let productsMatched = [];
        let woolworthsData = [];
        let woolworthsDataToBeMatched = [];
        let ColesData = [];
        let colesFilteredWithoutBarcode = [];
        let colesDataToBeMatched = [];
        let productsDataMatched = [];

        try {
          woolworthsData = JSON.parse(fs.readFileSync(`woolworths/data/${process.env.FOLDER_DATE}/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, 'utf8'));
          ColesData = JSON.parse(fs.readFileSync(`coles/data/${process.env.FOLDER_DATE}/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, 'utf8'));
        } catch (error) {
          continue;
        }

        try {
          productsDataMatched = JSON.parse(fs.readFileSync(`matched/${process.env.FOLDER_DATE}/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, 'utf8'));
          // woolworthsFilteredWithoutBarcode = await woolworthsData.filter((p) => !p.barcode);
          const matchedSourceIds = new Set(productsDataMatched.map((data) => data.source_id.toString()));
          // // Filter woolworthsData
          woolworthsDataToBeMatched = woolworthsData.filter((p) => {
            return matchedSourceIds.has(p.source_id.toString()) ? false : true;
          });

          colesFilteredWithoutBarcode = await ColesData.filter((p) => !p.barcode);
          colesDataToBeMatched = ColesData.filter((p) => {
            return matchedSourceIds.has(p.source_id.toString()) ? false : true;
          });

        } catch (error) {
          // console.log('skipping');
        }

        const filteredColesData = colesFilteredWithoutBarcode;
        const filteredwoolworthsData = woolworthsDataToBeMatched;

        for (const data of filteredwoolworthsData) {
          const a = search(data.name, filteredColesData, { keySelector: (obj) => obj.name, returnMatchData: true });
          if (a.length > 0) {
            const filteredMatches = a.filter((match) => match.score > 0.75);
            if (filteredMatches && filteredMatches.length === 0) continue;
            const bestMatch = filteredMatches[0].item;
            if(!data.barcode) console.log('no barcode found')
            const formattedProduct1 = {
              source_url: bestMatch.source_url || null,
              name: bestMatch.name || null,
              image_url: bestMatch.image_url || null,
              source_id: bestMatch.source_id || null,
              barcode: data.barcode || null,
              shop: bestMatch.shop || null,
              category_id: bestMatch.category_id,
              weight: bestMatch.weight || null,
              prices: bestMatch.prices,
            };

            const formattedProduct2 = {
              source_url: data.source_url || null,
              name: data.name || null,
              image_url: data.image_url || null,
              source_id: data.source_id || null,
              barcode: data.barcode || null,
              shop: data.shop || null,
              category_id: data.category_id,
              weight: data.weight || null,
              prices: data.prices,
            };

            productsMatched.push(formattedProduct1);
            productsMatched.push(formattedProduct2);
          }
        }

        try {
          if (productsMatched.length > 0) {
            totalProducts += productsMatched.length;
            console.log('totalProducts', totalProducts);
            const baseFolder = `./similar/${process.env.FOLDER_DATE}`;
            const folderPath = path.join(baseFolder, `${category}`);
            const fileName = `${category} - ${subCategory} - ${extensionCategory}.json`;
            const filePath = path.join(folderPath, fileName);
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath, { recursive: true });
              console.log(`Created folder: ${folderPath}`);
            }
            fs.writeFileSync(filePath, JSON.stringify(productsMatched, null, 2));
            console.log(`Data saved to ${filePath}`);
          }
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
