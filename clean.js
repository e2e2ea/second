import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/exwooly3');
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed:', error.message);
    }
};

// Define Product Schema
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
        prices: [
            {
                state: { type: String },
                price: { type: String },
                price_per_unit: { type: String },
                price_unit: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

const cleanUpPrices = async () => {
    await dbConnect();

    // Fetch all products
    const products = await Product.find();

    for (const product of products) {
        const uniquePrices = new Map();

        // Remove duplicates: Keep the first occurrence of each state
        for (const price of product.prices) {
            if (price !== null && price && price.state !== null) {
                if (!uniquePrices.has(price.state)) {
                    uniquePrices.set(price.state, price);
                }

            }
        }

        // Update the prices array with unique entries only
        product.prices = Array.from(uniquePrices.values());

        // Save the cleaned product back to the database
        await product.save();
        console.log(`Cleaned duplicate prices for Product ID: ${product.retailer_product_id}`);
    }

    console.log('Finished cleaning up all products.');
    process.exit(0);
};

cleanUpPrices();
