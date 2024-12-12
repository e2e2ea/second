import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RateLimiter from './RateLimit/index.js';
import fs from 'fs';
import safeNavigate from './controllers/helpers/coles/safeNavigate.js';
import mongoose from 'mongoose';

// Add stealth plugin
puppeteer.use(StealthPlugin());


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



const WOOLWORTHS_API_ENDPOINT = 'https://www.woolworths.com.au/apis/ui/browse/category';
const CATEGORIES = [
  // { id: '1_ACA2FC2', name: 'Freezer', url: '/shop/browse/freezer', location: '/shop/browse/freezer' }, // done
  // { id: '1-E5BEE36E', name: 'Fruit & Veg', url: '/shop/browse/fruit-veg', location: '/shop/browse/fruit-veg' }, // done
  // { id: '1_D5A2236', name: 'Poultry, Meat & Seafood', url: '/shop/browse/poultry-meat-seafood', location: '/shop/browse/poultry-meat-seafood' }, // done
  // { id: '1_39FD49C', name: 'Pantry', url: '/shop/browse/pantry', location: '/shop/browse/pantry' }, // only done in vic
  // { id: '1_9851658', name: 'Health & Wellness', url: '/shop/browse/health-wellness', location: '/shop/browse/health-wellness' }, // only done in nsw
  // { id: '1_894D0A8', name: 'Beauty & Personal Care', url: '/shop/browse/beauty-personal-care', location: '/shop/browse/beauty-personal-care' }, // not yet process
  // { id: '1_61D6FEB', name: 'Pet', url: '/shop/browse/pet', location: '/shop/browse/pet' }, // only done in nsw
];
const WOOLWORTHS_URL = 'https://www.woolworths.com.au';
const SPEED_LIMIT = 20;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
(async () => {
  await dbConnect()
  const name = 'Woolworths';
  const rateLimit = new RateLimiter(SPEED_LIMIT, 5);

  const browser = await puppeteer.launch({
    headless: false, // Set to false if you want to see the browser in action
    // args: [
    //   '--no-sandbox',
    //   '--disable-setuid-sandbox',
    //   '--disable-blink-features=AutomationControlled',
    // ],
  });

  const page = await browser.newPage();

  // Set a user agent to mimic a real browser
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );

  // Navigate to the target website

  await page.goto('https://www.woolworths.com.au', { waitUntil: 'domcontentloaded' });

  // Optionally wait for a specific element to load
  await page.waitForSelector('h1');

  // Extract cookies
  const cookies = await page.cookies();
  console.log('Extracted Cookies:', cookies);

  // Save cookies to a file or database (optional)
  fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));

  // Close the browser after extracting cookies
  await browser.close();

  // Reload the session with cookies
  const browser2 = await puppeteer.launch({ headless: false });
  const page2 = await browser2.newPage();
  // Load cookies from the file
  const loadedCookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
  await page2.setCookie(...loadedCookies);

  // Navigate to the target website again, with the cookies
  await page2.goto('https://www.woolworths.com.au', { waitUntil: 'domcontentloaded' });
  await delay(60000)
  console.log('1')
  // await delay(60000)
  // console.log('2')
  // await delay(60000)
  // console.log('3')

  // Verify login or session persistence
  const content = await page2.evaluate(() => document.body.innerText);
  // console.log('Page Content After Setting Cookies:', content);

  const htmlOnly = async (page) => {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (!['document', 'xhr', 'fetch'].includes(req.resourceType())) {
        return req.abort();
      }
      req.continue();
    });
  };
  await htmlOnly(page2);

  try {
    await safeNavigate(page2, WOOLWORTHS_URL);
  } catch (err) {
    console.log('Failed to load page: ', err);
    await browser.close();
    return [];
  }

  await page2.setBypassCSP(true);

  // const category = CATEGORIES[0];
  for (const category of CATEGORIES) {
    const products = await scrapeCategory(page2, category);
    // console.log('Products:', products);
    console.log('Number of products:', products.length);
    // Save products to a JSON file
    // const filePath = 'productsWoolWorths - frez.json';
    // fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
    // await delay(5000)
  }
  // await browser2.close();
})();

const scrapeCategory = async (page, category) => {
  console.log('Scraping category: ', category.name);

  const body = {
    categoryId: category.id,
    pageNumber: 1,
    pageSize: 24,
    sortType: 'Name',
    url: category.url,
    location: category.location,
    formatObject: `{"name":"${category.name}"}`,
    isSpecial: false,
    isBundle: false,
    isMobile: false,
    filters: [],
    token: '',
    gpBoost: 0,
    isHideUnavailableProducts: false,
    isRegisteredRewardCardPromotion: false,
    enableAdReRanking: false,
    groupEdmVariants: true,
    categoryVersion: 'v2',
  };

  const res = await callFetch(page, body);
  // console.log('First category response:', res);

  const numProducts = res.TotalRecordCount || 0;
  const numPages = Math.ceil(numProducts / 24);
  // console.log('Products: ', numProducts, 'Pages: ', numPages);
  console.log('Pages: ', numPages);

  const productRes = [];
  for (let i = 1; i <= numPages; i++) {
    console.log('on page:', i)
    body.pageNumber = i;
    body.location = `${category.location}?pageNumber=${i}`;
    body.url = `${category.url}?pageNumber=${i}`;
    const products = await scrapeURL(page, body);
    productRes.push(...products);
    // await delay(2000)
  }

  return productRes;
}

const scrapeURL = async (page, request) => {
  const res = await callFetch(page, request);

  if (!res.Bundles) {
    console.log('Failed to scrape category: ', request.categoryId, res);
    return [];
  }

  const products = res.Bundles.map((bundle) => {
    const product = bundle.Products[0];

    // console.log('product1:', product)
    // const location = 'nsw'
    // const location = 'vic'
    const location = 'qld'
    // const location = 'wa'
    // const location = 'sa'
    // const location = 'tas'

    const inputString = product.CupMeasure;

    // Extract values
    const price = parseFloat(product.InstorePrice || product.Price);
    // const priceOnly = price.replace("$", "");
    const priceInCents = parseFloat(price) * 100
    const price2 = parseFloat(product.CupPrice || product.InstoreCupPrice);
    const priceInCentsPerUnits = parseFloat(price2) * 100
    // Remove numbers and keep only letters
    const unit = inputString.replace(/[0-9]/g, "");
    return {
      name: product.DisplayName,
      discounted_from: product.WasPrice,
      image_url: product.DetailsImagePaths[0],
      shop: 'Woolworths',
      source_url: `https://www.woolworths.com.au/shop/productdetails/${product.Stockcode}/${product.UrlFriendlyName}`,
      retailer_product_id: product.Stockcode,
      barcode: product.Barcode,
      name: product.DisplayName,
      realName: product.name,
      isNew: product.IsNew,
      weight: product.CupMeasure,
      category: product.AdditionalAttributes.piesdepartmentnamesjson,
      subCategory: product.AdditionalAttributes.piescategorynamesjson,
      extensionCategory: product.AdditionalAttributes.piessubcategorynamesjson,
      prices: {
        ...(location === 'nsw' && { nsw: priceInCents }),
        ...(location === 'nsw' && { nsw_price_per_unit: priceInCentsPerUnits }),
        ...(location === 'nsw' && { nsw_unit: unit }),
        ...(location === 'vic' && { vic: priceInCents }),
        ...(location === 'qld' && { qld: priceInCents }),
        ...(location === 'wa' && { wa: priceInCents }),
        ...(location === 'sa' && { sa: priceInCents }),
        ...(location === 'tas' && { tas: priceInCents }),
      },
    };
  });
  if (products.length > 0) {
    for (const data of products) {
      const q = await Product.findOne({ retailer_product_id: data.retailer_product_id })
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
  return products;
}

const callFetch = async (page, request) => {
  return await page.evaluate(
    async (request, url) => {
      return await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })
        .then((res) => res.json())
        .catch((err) => ({ error: err.message }));
    },
    request,
    WOOLWORTHS_API_ENDPOINT
  );
}