import mongoose from 'mongoose';
import fs from 'fs';
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
  const a = await Product.find({ category: 'Dairy, Eggs & Fridge', subCategory: 'Cheese', extensionCategory: 'Sliced Cheese' }).exec();
  const productsData = a.map((product) => {
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
    // Remove unwanted fields
    // delete productObj._id;
    // delete productObj.category;
    // delete productObj.subCategory;
    // delete productObj.extensionCategory;
    // delete productObj.__v;
    // delete productObj.createdAt;
    // delete productObj.updatedAt;

    return formattedProduct;
  });

  // Write the data to a JSON file
  const filePath = `./Dairy, Eggs & Fridge - cheese - Sliced Cheese.json`;
  try {
    fs.writeFileSync(filePath, JSON.stringify(productsData, null, 2)); // Pretty print with 2 spaces
    console.log(`Data saved to ${filePath}`);
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
};

(async () => {
  await getData();
})();
