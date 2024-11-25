import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import safeNavigate from './controllers/helpers/coles/safeNavigate.js';
import waitForElement from './controllers/helpers/coles/waitForElement.js';
import handleSteps from './controllers/helpers/coles/steps.js';
import mongoose from 'mongoose';
import path from 'path';
import locations from './constant/location.js'
puppeteer.use(StealthPlugin());

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
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const scraper = async () => {
  await dbConnect();

  // page = await browser.newPage();

  try {
    const category = "Dairy, Eggs & Fridge"
    const updatedCategory = category.replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace one or more spaces with a single hyphen
      .replace(/-+/g, '-'); // Remove consecutive hyphens
    const subCategory = "Cheese"
    const updatedSubCategory = subCategory.replace(/ /g, '-');
    const extensionCategory = "Sliced Cheese"
    const updatedextensionCategory = extensionCategory.replace(/ /g, '-');
    let url
    if (extensionCategory) {
      url = `https://www.coles.com.au/browse/${updatedCategory.toLowerCase()}/${updatedSubCategory.toLowerCase()}/${updatedextensionCategory.toLowerCase()}`;
    } else {
      url = `https://www.coles.com.au/browse/${updatedCategory.toLowerCase()}/${updatedSubCategory.toLowerCase()}`;
    }
    console.log(`Navigating to ${url}...`);



    for (const loc of locations) {
      const browser = await puppeteer.launch({
        headless: false,
      });
      let page
      page = await browser.newPage();
      await safeNavigate(page, url);

      console.log('Page loaded successfully.');
      await page.waitForSelector('body', { timeout: 60000 });
      await delay(5000);
      const a = await handleSteps(page, loc);
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await delay(5000);
      let hasProducts = true;
      let i = 1;
      while (hasProducts) {
        if (i !== 1) {
          const url2 = `${url}?page=${i}`;
          await page.goto(url2, { waitUntil: 'domcontentloaded' });
          await delay(5000);
        }
        try {
          await page.waitForSelector('section[data-testid="product-tile"]', { timeout: 10000 });
        } catch (error) {
          hasProducts = false;
          await browser.close();
          await delay(5000);
          break;
        }
        console.log('Products found, extracting data...');

        // Extract product data
        const productData = await page.evaluate(
          (category, subCategory, extensionCategory, loc) => {
            const products = document.querySelectorAll('section[data-testid="product-tile"]');
            if (!products || products.length === 0) return [];
            return Array.from(products).map((product) => {
              const href = product.querySelector('.product__image_area a')?.href || 'N/A';

              let weight = 'N/A';
              let barcode = 'N/A';
              let unit = null;

              if (href !== 'N/A') {
                const parts = href.split('-');
                const potentialWeight = parts.length > 2 ? parts[parts.length - 2] : 'N/A';

                if (/\d/.test(potentialWeight)) {
                  weight = potentialWeight;
                  unit = weight.replace(/[\d\s]/g, '');
                } else {
                  weight = parts.length > 3 ? parts[parts.length - 3] + potentialWeight : 'N/A';
                  unit = potentialWeight;
                }

                barcode = parts.length > 0 ? parts[parts.length - 1] : 'N/A';
              }

              // Extract and convert price to cents
              const priceText = product.querySelector('.price__value')?.textContent.trim() || 'N/A';
              let pricePerUnit = 'N/A';
              if (priceText !== 'N/A' && priceText.startsWith('$')) {
                pricePerUnit = Math.round(parseFloat(priceText.replace('$', '')) * 100);
              }

              // Extract price per unit
              const pricePerUnitText = product.querySelector('.price__calculation_method')?.textContent.trim() || 'N/A';
              let priceInCents = 'N/A';
              if (pricePerUnitText !== 'N/A') {
                const match = pricePerUnitText.match(/\$(\d+(\.\d+)?)/); // Regex to extract "$5.95"
                if (match && match[1]) {
                  priceInCents = Math.round(parseFloat(match[1]) * 100); // Convert to cents
                }
              }

              return {
                source_url: href !== 'N/A' ? href : 'N/A',
                category: category,
                subCategory: subCategory,
                extensionCategory: extensionCategory,
                name: product.querySelector('.product__title')?.textContent.trim() || 'N/A',
                image_url: product.querySelector('img[data-testid="product-image"]')?.src || 'N/A',
                barcode: barcode,
                shop: 'coles',
                weight: weight,
                prices: {
                  ...(loc.location === 'Sydney, NSW 2000' && { nsw: priceInCents }),
                  ...(loc.location === 'Sydney, NSW 2000' && { nsw_price_per_unit: pricePerUnit }),
                  ...(loc.location === 'Sydney, NSW 2000' && { nsw_unit: unit }),
                  ...(loc.location === 'Chadstone Shopping Centre, 1341 Dandenong Road' && { vic: priceInCents }),
                  ...(loc.location === 'Kedron, QLD 4031' && { qld: priceInCents }),
                  ...(loc.location === 'Perth, WA 6000' && { wa: priceInCents }),
                  ...(loc.location === 'Kilburn, SA 5084' && { sa: priceInCents }),
                },
              };
            });
          },
          category,
          subCategory,
          extensionCategory,
          loc
        );

        if (productData.length > 0) {
          console.log('Product data: ', productData)
          for (const data of productData) {
            const q = await Product.findOne({ barcode: data.barcode })
            if (!q) {
              // console.log('Product not found. Creating new product:', { ...data });
              const createdProduct = await Product.create({ ...data });
              // console.log('Created product:', createdProduct);
            } else {
              const updatedPrice = {
                ...q.prices,
                ...data.prices,
              };
              await Product.findByIdAndUpdate(q._id, { $set: { prices: updatedPrice } }, { new: true })
            }
          }
        }
        i = i + 1;
        console.log('length find...', productData.length);
      }
    }


  } catch (error) {
    console.error('Error:', error);
    // await page.screenshot({ path: 'error_screenshot.png' });
  } finally {
    // await browser.close();
  }
};

(async () => {
  await scraper();
})();
