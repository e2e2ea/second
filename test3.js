import categories from './constant/categories.js'
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1/scrape');
        console.log('database connected');
        return conn;
    } catch (error) {
        console.log('database error');
    }
};

const ProductSchema = new mongoose.Schema(
    {
        source_url: { type: String, default: 'N/A' },
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

const Product = mongoose.model('Product', ProductSchema);

const getData = async () => {
    await dbConnect();
    const products = await Product.find({ category: 'Drinks', subCategory: 'Long Life Milk' });

    // Check if any products are found
    if (products.length > 0) {
        // Loop through the products and log category and subCategory
        products.forEach(product => {
            console.log(`Category: ${product.category}, SubCategory: ${product.subCategory}, exte: ${product.extensionCategory}`);
        });
    } else {
        console.log('No products found.');
    }
}

(async () => {
    await getData();
})();
