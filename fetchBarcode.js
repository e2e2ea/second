import axios from 'axios'
import axiosRetry from 'axios-retry';
import mongoose from 'mongoose';

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

const Product = mongoose.model('Product', ProductSchema);

const axiosInstance = axios.create({
    timeout: 60000 // 10 seconds
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

axiosRetry(axiosInstance, {
    retries: 15, // Number of retries
    retryDelay: (retryCount) => retryCount * 3000, // Exponential backoff: retry after 1s, 2s, 3s...
    retryCondition: (error) => {
        // Retry only if the error is a network error or timeout
        return axiosRetry.isNetworkOrIdempotentRequestError(error);
    },
});

const getBarcode = async () => {
    try {
        await dbConnect();
        const products = await Product.find().limit(500)

        let i = 1
        for (const product of products) {
            // await delay(5000)
            try {
                const { data } = await axiosInstance.get(`https://barcodes.groceryscraper.mc.hzuccon.com/barcode?product=${product.coles_product_id}`)
                console.log(`data${i}`, `${data}-${product.name}`)
            } catch (error) {
                console.log('no product found', 'skip')
            }
            i++
        }
        return
    } catch (err) {
        console.error('Error Details:', {
            message: err.message,
            config: err.config,
            code: err.code,
            response: err.response?.data,
        });
        return ''
    }
}

(async () => {
    const a = await getBarcode();
    console.log('a', a)
})();