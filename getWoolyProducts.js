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

const getData = async () => {
    await dbConnect();
    const a = await Product.find().exec();

    for (const categ of categories) {
        const category = categ.category
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

                    // First, check if category matches
                    const hasCategory = parsedFields.productCategories.some(
                        (cat) => cat.toLowerCase() === mycat.toLowerCase()
                    );
                    if (!hasCategory) return false;

                    let mySubCategory
                    mySubCategory = subCategory
                    if (category === 'Poultry, Meat & Seafood' && subCategory === 'BBQ Meat & Seafood') mySubCategory = 'BBQ Meat'
                    // Next, filter by subCategory only for matching categories
                    const hasSubCategory = parsedFields.productSubCategories.some(
                        (sub) => sub.toLowerCase() === mySubCategory.toLowerCase()
                    );

                    // If no matching subCategory, skip this product
                    if (!hasSubCategory) return false;

                    let mySubCategoryExtension
                    mySubCategoryExtension = extensionCategory
                    if (category === 'Poultry, Meat & Seafood' && subCategory === 'Seafood' && extensionCategory === 'Fish') mySubCategoryExtension = 'Salmon & Other Fish'
                    if (category === 'Health & Beauty' && subCategory === 'Vitamins' && extensionCategory === 'Brain & Heart Health') mySubCategoryExtension = 'Brain & Heart'
                    if (category === 'Health & Beauty' && subCategory === 'First Aid & Medicinal' && extensionCategory === 'Bandaids & Bandages') mySubCategoryExtension = 'First Aid & Bandages'
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
                    const cleanedPrices = productObj.prices.map((price) => {
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
