import categories from './constant/main.js';
import fs from 'fs';
import path from 'path';
import Product from './coles/models/products.js';
import dbConnect from './coles/db/dbConnect.js';

const categoriesId = JSON.parse(fs.readFileSync(`./coles/constant/categories.json`, 'utf8'));
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
            name: productObj.name || null,
            sourceUrl: productObj.source_url || null,
            imageUrl: productObj.image_url || null,
            sourceId: `Coles - ${productObj.coles_product_id}` || null,
            barcode: productObj.barcode || '',
            categoryId: categId || '',
            shop: productObj.shop || null,
            weight: productObj.weight || '',
            prices: cleanedPrices,
          };

          return formattedProduct;
        });

        data.push(...productsData);
      }
    }
  }

  try {
    fs.writeFileSync('colesProducts.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
};

(async () => {
  await getData();
})();
