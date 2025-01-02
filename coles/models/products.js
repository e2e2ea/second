import mongoose from 'mongoose';

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

export default Product;