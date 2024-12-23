import categories from './constant/example.js'
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1/wooly4');
        console.log('database connected');
        return conn;
    } catch (error) {
        console.log('database error');
    }
};

const ProductSchema = new mongoose.Schema(
    {
        source_url: { type: String, default: 'N/A' },
        retailer_product_id: { type: String },
        category: [{ type: String }],
        subCategory: [{ type: String }],
        extensionCategory: [{ type: String }],
        name: { type: String, default: 'N/A' },
        image_url: { type: String, default: 'N/A' },
        barcode: { type: String, default: 'N/A' },
        shop: { type: String, default: '' },
        isNew: { type: Boolean },
        weight: { type: String, default: 'N/A' },
        prices: [{
            state: { type: String },
            price: { type: String },
            price_per_unit: { type: String },
            price_unit: { type: String }
        }],
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
const categoriesId = [
    { id: '1_717A94B', name: 'Baby', url: '/shop/browse/baby', location: '/shop/browse/baby' }, // done
    { id: '1_DEB537E', name: 'Bakery', url: '/shop/browse/bakery', location: '/shop/browse/bakery' }, // done
    { id: '1_6E4F4E4', name: 'Dairy, Eggs & Fridge', url: '/shop/browse/dairy-eggs-fridge', location: '/shop/browse/dairy-eggs-fridge' }, // done
    { id: '1_3151F6F', name: 'Deli & Chilled Meats', url: '/shop/browse/deli-chilled-meals', location: '/shop/browse/deli-chilled-meals' }, // done
    { id: '1_5AF3A0A', name: 'Drinks', url: '/shop/browse/drinks', location: '/shop/browse/drinks' }, // done
    { id: '1_ACA2FC2', name: 'Freezer', url: '/shop/browse/freezer', location: '/shop/browse/freezer' }, // done
    { id: '1-E5BEE36E', name: 'Fruit & Veg', url: '/shop/browse/fruit-veg', location: '/shop/browse/fruit-veg' }, // done
    { id: '1_894D0A8', name: 'Health & Beauty', url: '/shop/browse/beauty-personal-care', location: '/shop/browse/beauty-personal-care' }, // done
    // { id: '1_9851658', name: 'Health & Wellness', url: '/shop/browse/health-wellness', location: '/shop/browse/health-wellness' }, // done
    { id: '1_D5A2236', name: 'Poultry, Meat & Seafood', url: '/shop/browse/poultry-meat-seafood', location: '/shop/browse/poultry-meat-seafood' }, // done
    { id: '1_2432B58', name: 'Household', url: '/shop/browse/cleaning-maintenance', location: '/shop/browse/cleaning-maintenance' }, // done in vic
    { id: '1_39FD49C', name: 'Pantry', url: '/shop/browse/pantry', location: '/shop/browse/pantry' }, // done


    { id: '1_61D6FEB', name: 'Pet', url: '/shop/browse/pet', location: '/shop/browse/pet' }, // done


    // { id: '1_DEA3ED5', name: 'Home & Lifestyle', url: '/shop/browse/home-lifestyle', location: '/shop/browse/home-lifestyle' }, // done // but no products in the list of categ
];
const getData = async () => {
    await dbConnect();
    const a = await Product.find().exec();

    for (const categ of categories) {
        const category = categ.category
        let categId = ''
        const matchedCategory = categoriesId.find(cat => cat.name === category);
        if (matchedCategory) {
            categId = matchedCategory.id;
        } else {
            console.warn(`Category "${category}" not found in categoriesId`);
        }
        for (const sub of categ.subCategories) {
            const subCategory = sub.subCategory
            for (const ext of sub.childItems) {
                const extensionCategory = ext.extensionCategory ? ext.extensionCategory : ''
                // { category: category, subCategory: subCategory, extensionCategory: extensionCategory }
                // Filter products matching the current category, subCategory, and extensionCategory
                const filteredProducts = a.filter((product) => {
                    // Parse the stringified arrays
                    const parsedFields = {
                        productCategories: product.category.flatMap((cat) => JSON.parse(cat)),
                        productSubCategories: product.subCategory.flatMap((sub) => JSON.parse(sub)),
                        productExtensionSubCategories: product.extensionCategory.flatMap((ext) => JSON.parse(ext)),
                    };

                    let mycat = category
                    mycat = category
                    if (category === 'Deli & Chilled Meats') mycat = 'Deli & Chilled Meals'
                    if (category === 'Health & Beauty') mycat = 'Health & Wellness'
                    // if (category === 'Health & Beauty') mycat = 'Beauty & Personal Care'
                    // if (category === 'Household') mycat = 'Home & Lifestyle'
                    if (category === 'Household') mycat = 'Cleaning & Maintenance'
                    // console.log('mycat', mycat)
                    // First, check if category matches
                    const hasCategory = parsedFields.productCategories.some(
                        (cat) => cat.toLowerCase() === mycat.toLowerCase()
                    );
                    if (!hasCategory) return false;

                    let mySubCategory
                    mySubCategory = subCategory
                    if (category === 'Poultry, Meat & Seafood' && subCategory === 'BBQ Meat & Seafood') mySubCategory = 'BBQ Meat'
                    if (category === 'Baby' && subCategory === 'Baby Formula') mySubCategory = 'Baby Formula & Toddler Milk'
                    if (category === 'Baby' && subCategory === 'Nappies Wipes') mySubCategory = 'Nappies'
                    // if (category === 'Household' && subCategory === 'Clothing Accessories') mySubCategory = 'Clothing & Accessories'
                    // if (category === 'Household' && subCategory === 'Parties & Entertaining') mySubCategory = 'Party Supplies'
                    if (category === 'Household' && subCategory === 'Bathroom') mySubCategory = 'Toilet Paper, Tissues & Paper Towels'

                    if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Baby Health & Safety') mySubCategory = 'Health & Safety'
                    if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Baby Toys & Playtime') mySubCategory = 'Toys & Playtime'
                    if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Bath & Skincare') mySubCategory = 'Bath & Skincare'
                    if (category === 'Baby' && subCategory === 'Baby Accessories' && extensionCategory === 'Bottles and Baby Feeding') mySubCategory = 'Bottles & Baby Feeding'
                    // Next, filter by subCategory only for matching categories
                    // console.log('mySubCategory', mySubCategory)
                    const hasSubCategory = parsedFields.productSubCategories.some(
                        (sub) => sub.toLowerCase() === mySubCategory.toLowerCase()
                    );
                    // return baby here
                    if (category === 'Baby' && subCategory === 'Baby Accessories') return hasSubCategory
                    // If no matching subCategory, skip this product
                    if (!hasSubCategory) return false;

                    let mySubCategoryExtension
                    mySubCategoryExtension = extensionCategory
                    if (category === 'Poultry, Meat & Seafood' && subCategory === 'Seafood' && extensionCategory === 'Fish') mySubCategoryExtension = 'Salmon & Other Fish'
                    if (category === 'Health & Beauty' && subCategory === 'Vitamins' && extensionCategory === 'Brain & Heart Health') mySubCategoryExtension = 'Brain & Heart'
                    if (category === 'Health & Beauty' && subCategory === 'First Aid & Medicinal' && extensionCategory === 'Bandaids & Bandages') mySubCategoryExtension = 'First Aid & Bandages'
                    if (category === 'Household' && subCategory === 'Bathroom' && extensionCategory === 'Toilet Cleaners') mySubCategoryExtension = 'Toilet Paper'
                    if (category === 'Household' && subCategory === 'Clothing Accessories' && extensionCategory === 'Socks') mySubCategoryExtension = 'Boys & Girls Socks'
                    if (category === 'Household' && subCategory === 'Clothing Accessories' && extensionCategory === 'Underwear') mySubCategoryExtension = 'Boys & Girls Underwear'
                    // Lastly, filter by extensionCategory for matching subCategories
                    const hasExtensionSubCategories = parsedFields.productExtensionSubCategories.some(
                        (ext) => ext.toLowerCase() === mySubCategoryExtension.toLowerCase()
                    );

                    // Return true only if all three conditions match
                    return hasExtensionSubCategories;
                });

                // console.log(`all products : `, a.length)
                // console.log('Filtered products in filteredCateg: ', filteredProducts.length)
                console.log(`Filtered products in ${category} - ${subCategory} - ${extensionCategory}: `, filteredProducts.length)
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
                        source_url: productObj.source_url || null,
                        name: productObj.name || null,
                        image_url: productObj.image_url || null,
                        source_id: `Woolworths - ${productObj.retailer_product_id}` || null,
                        barcode: productObj.barcode || null,
                        category_id: categId || '',
                        shop: productObj.shop || null,
                        weight: productObj.weight || null,
                        prices: cleanedPrices,
                    };

                    return formattedProduct;
                });
                // console.log('Filtered product format:', productsData[0])
                if (productsData && productsData.length > 0) {
                    const baseFolder = './woolworths';
                    const folderPath = path.join(baseFolder, category);

                    // Ensure the folder exists
                    if (!fs.existsSync(folderPath)) {
                        fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist
                        console.log(`Created folder: ${folderPath}`);
                    }

                    const fileName = `${category} - ${subCategory} ${extensionCategory ? `- ${extensionCategory}` : ''}.json`;
                    const filePath = path.join(folderPath, fileName);
                    // Check if the file already exists
                    if (fs.existsSync(filePath)) {
                        console.log(`File already exists: ${filePath}. Skipping save.`);
                        // return; // Skip saving the file
                    }
                    try {
                        console.log(`${fileName} - ${productsData.length} products`)
                        fs.writeFileSync(filePath, JSON.stringify(productsData, null, 2)); // Pretty print with 2 spaces
                        console.log(`Data saved to ${filePath}`);
                    } catch (error) {
                        console.error('Error writing data to file:', error);
                    }
                }
            }
        }
    }
};

(async () => {
    await getData();
})();
