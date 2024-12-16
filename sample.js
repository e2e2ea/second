// import categories from './constant/example.js'
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
const categories = [{ category: "Baby" }]
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1/wooly3');
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
        const filteredProducts = a.filter((product) => {
            // Parse the stringified arrays
            const parsedFields = {
                productCategories: product.category.flatMap((cat) => JSON.parse(cat)),
            };

            let mycat = category
            mycat = category
            // if (category === 'Health & Beauty') mycat = 'Health & Wellness'
            if (category === 'Health & Beauty') mycat = 'Beauty & Personal Care'

            // First, check if category matches
            const hasCategory = parsedFields.productCategories.some(
                (cat) => cat.toLowerCase() === mycat.toLowerCase()
            );
            if (!hasCategory) return false;



            return hasCategory;
        });

        // console.log(`all products : `, a.length)
        // console.log('Filtered products in filteredCateg: ', filteredProducts.length)
        console.log(`Filtered products in ${category}: `, filteredProducts.length)
        const productsData = filteredProducts.map((product) => {
            const productObj = product.toObject();
            const cleanedPrices = productObj.prices.map((price) => {
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
        if (productsData && productsData.length > 0) {
            const fileName = `${category} - SAMPLE.json`;

            try {
                console.log(`${fileName} - ${productsData.length} products`)
                fs.writeFileSync(fileName, JSON.stringify(productsData, null, 2)); // Pretty print with 2 spaces
                console.log(`Data saved to ${fileName}`);
            } catch (error) {
                console.error('Error writing data to file:', error);
            }
        }
    }
};

(async () => {
    await getData();
})();
