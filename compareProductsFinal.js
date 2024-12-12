import categories from './constant/copy.js'
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const dbConnect2 = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1/scrape');
        console.log('database connected');
        return conn;
    } catch (error) {
        console.log('database error');
    }
};

const ProductSchema2 = new mongoose.Schema(
    {
        source_url: { type: String, default: 'N/A' },
        coles_product_id: { type: String },
        category: { type: String },
        subCategory: { type: String },
        extensionCategory: { type: String },
        name: { type: String, default: 'N/A' },
        image_url: { type: String, default: 'N/A' },
        barcode: { type: String, default: 'N/A' },
        shop: { type: String, default: '' },
        weight: { type: String, default: 'N/A' },
        prices: {
            nsw: { type: String },
            nsw_price_per_unit: { type: String },
            nsw_unit: { type: String },
            vic: { type: String },
            qld: { type: String },
            wa: { type: String },
            sa: { type: String },
            tas: { type: String },
        },
    },
    { timestamps: true }
);

const ProductColes = mongoose.model('Product', ProductSchema2);
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1/wooly');
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
        prices: {
            nsw: { type: String },
            nsw_price_per_unit: { type: String },
            nsw_unit: { type: String },
            vic: { type: String },
            qld: { type: String },
            wa: { type: String },
            sa: { type: String },
            tas: { type: String },
        },
    },
    { timestamps: true }
);


const Product = mongoose.model('Product', ProductSchema);

const getData = async () => {
    await dbConnect();
    const a = await Product.find().exec();
    await dbConnect2();
    const b = await ProductColes.find().exec();

    for (const categ of categories) {
        const category = categ.category
        for (const sub of categ.subCategories) {
            const subCategory = sub.subCategory
            for (const ext of sub.childItems) {
                const extensionCategory = ext.extensionCategory ? ext.extensionCategory : ''
            
                const woolworthsData = JSON.parse(fs.readFileSync(`woolworths/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, 'utf8'));
                const ColesData = JSON.parse(fs.readFileSync(`woolworths/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, 'utf8'));
                // console.log(`all products : `, a.length)
                // console.log('Filtered products in filteredCateg: ', filteredProducts.length)
                console.log(`Filtered coles in ${category} - ${subCategory} - ${extensionCategory}: `, filteredProductsInColes.length)
                console.log(`Filtered woolworths in ${category} - ${subCategory} - ${extensionCategory}: `, filteredProductsInWolly.length)
                const productsData = filteredProducts.map((product) => {
                    const productObj = product.toObject();
                    const formattedProduct = {
                        source_url: productObj.source_url || null,
                        name: productObj.name || null,
                        image_url: productObj.image_url || null,
                        barcode: productObj.barcode || null,
                        shop: productObj.shop || null,
                        weight: productObj.weight || null,
                        prices: { ...productObj.prices },
                    };

                    return formattedProduct;
                });
                // console.log('Filtered product format:', productsData[0])
                // if (productsData && productsData.length > 0) {
                //     const baseFolder = './woolworths';
                //     const folderPath = path.join(baseFolder, category);

                //     // Ensure the folder exists
                //     if (!fs.existsSync(folderPath)) {
                //         fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist
                //         console.log(`Created folder: ${folderPath}`);
                //     }

                //     const fileName = `${category} - ${subCategory} ${extensionCategory ? `- ${extensionCategory}` : ''}.json`;
                //     const filePath = path.join(folderPath, fileName);
                //     // Check if the file already exists
                //     if (fs.existsSync(filePath)) {
                //         console.log(`File already exists: ${filePath}. Skipping save.`);
                //         // return; // Skip saving the file
                //     }
                //     try {
                //         console.log(`${fileName} - ${productsData.length} products`)
                //         fs.writeFileSync(filePath, JSON.stringify(productsData, null, 2)); // Pretty print with 2 spaces
                //         console.log(`Data saved to ${filePath}`);
                //     } catch (error) {
                //         console.error('Error writing data to file:', error);
                //     }
                // }
            }
        }
    }
};

(async () => {
    await getData();
})();
