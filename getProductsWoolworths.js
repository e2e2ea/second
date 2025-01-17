import categories from './woolworths/constant/categories.js';
import fs from 'fs';
import path from 'path';
import Product from './woolworths/models/products.js';
import cleanUpPrices from './woolworths/clean.js';
import dbConnect from './woolworths/db/dbConnect.js';

const categoriesId = [
  { id: '22060', name: 'Bakery', url: '/shop/browse/bakery', location: '/shop/browse/bakery' },
  { id: '22351', name: 'Fruit & Veg', url: '/shop/browse/fruit-veg', location: '/shop/browse/fruit-veg' },
  { id: '22713', name: 'Poultry, Meat & Seafood', url: '/shop/browse/poultry-meat-seafood', location: '/shop/browse/poultry-meat-seafood' },
  { id: '24023', name: 'Deli & Chilled Meals', url: '/shop/browse/deli-chilled-meals', location: '/shop/browse/deli-chilled-meals' },
  { id: '22089', name: 'Dairy, Eggs & Fridge', url: '/shop/browse/dairy-eggs-fridge', location: '/shop/browse/dairy-eggs-fridge' },
  { id: '22770', name: 'Pantry', url: '/shop/browse/pantry', location: '/shop/browse/pantry' },
  { id: '22280', name: 'Freezer', url: '/shop/browse/freezer', location: '/shop/browse/freezer' },
  { id: '22164', name: 'Drinks', url: '/shop/browse/drinks', location: '/shop/browse/drinks' },
  { id: '22394', name: 'Health & Wellness', url: '/shop/browse/health-wellness', location: '/shop/browse/health-wellness' },
  { id: '22394', name: 'Beauty & Personal Care', url: '/shop/browse/beauty-personal-care', location: '/shop/browse/beauty-personal-care' },
  { id: '22015', name: 'Baby', url: '/shop/browse/baby', location: '/shop/browse/baby' },
  { id: '22459', name: 'Home & Lifestyle', url: '/shop/browse/home-lifestyle', location: '/shop/browse/home-lifestyle' },
  { id: '22459', name: 'Cleaning & Maintenance', url: '/shop/browse/cleaning-maintenance', location: '/shop/browse/cleaning-maintenance' },
  { id: '22916', name: 'Pet', url: '/shop/browse/pet', location: '/shop/browse/pet' },
];
const getData = async () => {
  //   console.log('start clean');
  //   await cleanUpPrices();
  //   console.log('end clean');
  await dbConnect();
  const a = await Product.find().exec();
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
        const filteredProducts = a.filter((product) => {
          const parsedFields = {
            productCategories: product.category.flatMap((cat) => JSON.parse(cat)),
            productSubCategories: product.subCategory.flatMap((sub) => JSON.parse(sub)),
            productExtensionSubCategories: product.extensionCategory.flatMap((ext) => JSON.parse(ext)),
          };

          // console.log('mycat', mycat)
          // First, check if category matches
          const hasCategory = parsedFields.productCategories.some((cat) => cat.toLowerCase() === category.toLowerCase());
          if (!hasCategory) return false;

          let mySubCategory;
          mySubCategory = subCategory;
          if (category === 'Poultry, Meat & Seafood' && subCategory === 'BBQ Meat & Seafood') mySubCategory = 'BBQ Meat';
          if (category === 'Baby' && subCategory === 'Baby Formula') mySubCategory = 'Baby Formula & Toddler Milk';
          if (category === 'Baby' && subCategory === 'Nappies Wipes') mySubCategory = 'Nappies';
          //   if (category === 'Household' && subCategory === 'Clothing Accessories') mySubCategory = 'Clothing & Accessories'
          //   if (category === 'Household' && subCategory === 'Parties & Entertaining') mySubCategory = 'Party Supplies'
          if (category === 'Cleaning & Maintenance' && subCategory === 'Bathroom') mySubCategory = 'Toilet Paper, Tissues & Paper Towels';

          if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Baby Health & Safety') mySubCategory = 'Health & Safety';
          if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Baby Toys & Playtime') mySubCategory = 'Toys & Playtime';
          if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Bath & Skincare') mySubCategory = 'Bath & Skincare';
          if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Bottles and Baby Feeding') mySubCategory = 'Bottles & Baby Feeding';
          // Next, filter by subCategory only for matching categories
          // console.log('mySubCategory', mySubCategory)
          const hasSubCategory = parsedFields.productSubCategories.some((sub) => sub.toLowerCase() === mySubCategory.toLowerCase());

          if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Baby Health & Safety') return hasSubCategory;
          if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Baby Toys & Playtime') return hasSubCategory;
          if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Bath & Skincare') return hasSubCategory;
          if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Bottles & Baby Feeding') return hasSubCategory;
          // If no matching subCategory, skip this product
          if (!hasSubCategory) return false;

          let mySubCategoryExtension;
          mySubCategoryExtension = extensionCategory;
          if (category === 'Poultry, Meat & Seafood' && subCategory === 'Seafood' && extensionCategory === 'Fish') mySubCategoryExtension = 'Salmon & Other Fish';
          if (category === 'Health & Wellness' && subCategory === 'Vitamins' && extensionCategory === 'Brain & Heart Health') mySubCategoryExtension = 'Brain & Heart';
          if (category === 'Health & Wellness' && subCategory === 'First Aid & Medicinal' && extensionCategory === 'Bandaids & Bandages') mySubCategoryExtension = 'First Aid & Bandages';
          if (category === 'Cleaning & Maintenance' && subCategory === 'Bathroom' && extensionCategory === 'Toilet Cleaners') mySubCategoryExtension = 'Toilet Paper';
          if (category === 'Home & Lifestyle' && subCategory === 'Clothing Accessories' && extensionCategory === 'Socks') mySubCategoryExtension = 'Boys & Girls Socks';
          if (category === 'Home & Lifestyle' && subCategory === 'Clothing Accessories' && extensionCategory === 'Underwear') mySubCategoryExtension = 'Boys & Girls Underwear';
          const hasExtensionSubCategories = parsedFields.productExtensionSubCategories.some((ext) => ext.toLowerCase() === mySubCategoryExtension.toLowerCase());

          return hasExtensionSubCategories;
        });

        let mycat = category;
        mycat = category;
        if (category === 'Deli & Chilled Meals') mycat = 'Deli & Chilled Meats';
        if (category === 'Health & Wellness') mycat = 'Health & Beauty';
        if (category === 'Beauty & Personal Care') mycat = 'Health & Beauty';
        if (category === 'Home & Lifestyle') mycat = 'Household';
        if (category === 'Cleaning & Maintenance') mycat = 'Household';

        // const toPush = [mycat, subCategory, extensionCategory, filteredProducts.length];
        // data.push(toPush);
        const productsData = filteredProducts.map((product) => {
          const productObj = product.toObject();
          // console.log('productObj', productObj)
          const filteredPrices = productObj.prices.filter((p) => p !== null && p !== undefined);
          const cleanedPrices = filteredPrices.map((price) => {
            if (!price || price === null) return;
            const { _id, ...rest } = price; // Destructure to exclude _id
            return rest; // Return the remaining price object without _id
          });

          const formattedProduct = {
            name: productObj.name || null,
            sourceUrl: productObj.source_url || null,
            imageUrl: productObj.image_url || null,
            sourceId: `Woolworths - ${productObj.retailer_product_id}` || null,
            barcode: productObj.barcode || null,
            categoryId: categId || '',
            shop: productObj.shop || null,
            weight: productObj.weight || null,
            prices: cleanedPrices,
          };

          return formattedProduct;
        });
        // console.log('Filtered product format:', productsData[0])
        if (productsData && productsData.length > 0) {
          data.push(...productsData);
        }
      }
    }
  }
  try {
    fs.writeFileSync('woolyProducts.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
};

(async () => {
  await getData();
})();
