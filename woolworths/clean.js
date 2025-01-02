import mongoose from 'mongoose';
import Product from './models/products.js';

const dbConnect = async () => {
    const getDate = new Date();
    const month = getDate.getMonth() + 1;
    const day = getDate.getDate();
    const year = getDate.getFullYear();
    
    const formattedDate = `${month}-${day}-${year}`;
    try {
        await mongoose.connect(`mongodb://127.0.0.1/wooly_${formattedDate}`);
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed:', error.message);
    }
};



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
    // process.exit(0);
};

export default cleanUpPrices
