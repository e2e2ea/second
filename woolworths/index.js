import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RateLimiter from '../RateLimit/index.js';
import fs from 'fs';
import safeNavigate from '../controllers/helpers/coles/safeNavigate.js';
import handleSteps from './controllers/helpers/steps.js';
import mongoose from 'mongoose';

// Add stealth plugin
puppeteer.use(StealthPlugin());
const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.1.2 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43",
    "Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Android 11; Mobile; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Mozilla/5.0 (Linux; Android 11; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36 OPR/68.0.2254.63568",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
]

const mylocation = ['nsw', 'vic', 'qld', 'wa', 'sa', 'tas', 'act', 'nt']
// const mylocation = ['act', 'nt']
const dbConnect = async () => {
    const getDate = new Date();
    const month = getDate.getMonth() + 1;
    const day = getDate.getDate();
    const year = getDate.getFullYear();
    
    const formattedDate = `${month}-${day}-${year}`;
    try {
        const conn = await mongoose.connect(`mongodb://127.0.0.1/wooly_${formattedDate}`);
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
const getPrices = (location, priceInCents, priceInCentsPerUnits, unit) => {
    const prices = [];
    if (priceInCents) {
        if (location === 'nsw') {
            prices.push({
                state: 'nsw'.toUpperCase(),
                price: priceInCents ? parseFloat(Number(priceInCents).toFixed(2)) : null,
                price_per_unit: priceInCentsPerUnits ? parseFloat(Number(priceInCentsPerUnits).toFixed(2)) : null,
                price_unit: unit ? unit : '',
            });
        }
        if (location === 'vic') {
            prices.push({
                state: 'vic'.toUpperCase(),
                price: priceInCents ? parseFloat(Number(priceInCents).toFixed(2)) : null,
                price_per_unit: priceInCentsPerUnits ? parseFloat(Number(priceInCentsPerUnits).toFixed(2)) : null,
                price_unit: unit ? unit : '',
            });
        }
        if (location === 'qld') {
            prices.push({
                state: 'qld'.toUpperCase(),
                price: priceInCents ? parseFloat(Number(priceInCents).toFixed(2)) : null,
                price_per_unit: priceInCentsPerUnits ? parseFloat(Number(priceInCentsPerUnits).toFixed(2)) : null,
                price_unit: unit ? unit : '',
            });
        }
        if (location === 'wa') {
            prices.push({
                state: 'wa'.toUpperCase(),
                price: priceInCents ? parseFloat(Number(priceInCents).toFixed(2)) : null,
                price_per_unit: priceInCentsPerUnits ? parseFloat(Number(priceInCentsPerUnits).toFixed(2)) : null,
                price_unit: unit ? unit : '',
            });
        }
        if (location === 'sa') {
            prices.push({
                state: 'sa'.toUpperCase(),
                price: priceInCents ? parseFloat(Number(priceInCents).toFixed(2)) : null,
                price_per_unit: priceInCentsPerUnits ? parseFloat(Number(priceInCentsPerUnits).toFixed(2)) : null,
                price_unit: unit ? unit : '',
            });
        }
        if (location === 'tas') {
            prices.push({
                state: 'tas'.toUpperCase(),
                price: priceInCents ? parseFloat(Number(priceInCents).toFixed(2)) : null,
                price_per_unit: priceInCentsPerUnits ? parseFloat(Number(priceInCentsPerUnits).toFixed(2)) : null,
                price_unit: unit ? unit : '',
            });
        }
        if (location === 'act') {
            prices.push({
                state: 'act'.toUpperCase(),
                price: priceInCents ? parseFloat(Number(priceInCents).toFixed(2)) : null,
                price_per_unit: priceInCentsPerUnits ? parseFloat(Number(priceInCentsPerUnits).toFixed(2)) : null,
                price_unit: unit ? unit : '',
            });
        }
        if (location === 'nt') {
            prices.push({
                state: 'nt'.toUpperCase(),
                price: priceInCents ? parseFloat(Number(priceInCents).toFixed(2)) : null,
                price_per_unit: priceInCentsPerUnits ? parseFloat(Number(priceInCentsPerUnits).toFixed(2)) : null,
                price_unit: unit ? unit : '',
            });
        }
    }

    return prices;
};


let pageReset = 0
let booool = false
const WOOLWORTHS_API_ENDPOINT = 'https://www.woolworths.com.au/apis/ui/browse/category';
const CATEGORIES = [
    // Home & Lifestyle
    // { id: '1_792C364', name: 'Party Supplies', url: '/shop/browse/home-lifestyle/party-supplies', location: '/shop/browse/home-lifestyle/party-supplies' },
    // { id: '1_3D142C0', name: 'Clothing Accessories', url: '/shop/browse/home-lifestyle/clothing-accessories', location: '/shop/browse/home-lifestyle/clothing-accessories' },

    // Health & Wellness
    // { id: '1_67B032F', name: 'Vitamins', url: '/shop/browse/health-wellness/vitamins', location: '/shop/browse/health-wellness/vitamins' },
    // { id: '1_329A89C', name: 'First Aid & Medicinal', url: '/shop/browse/health-wellness/first-aid-medicinal', location: '/shop/browse/health-wellness/first-aid-medicinal' },

    //Beauty & Personal Care
    // { id: '1_877B999', name: 'Cosmetics', url: '/shop/browse/beauty-personal-care/cosmetics', location: '/shop/browse/beauty-personal-care/cosmetics' },
    // { id: '1_266FCD7', name: 'Skin Care', url: '/shop/browse/beauty-personal-care/skin-care', location: '/shop/browse/beauty-personal-care/skin-care' },
    // { id: '1_098A313', name: 'Hair Care', url: '/shop/browse/beauty-personal-care/hair-care', location: '/shop/browse/beauty-personal-care/hair-care' },

    // Pantry
    // { id: '1_8458E3A', name: 'Baking', url: '/shop/browse/pantry/baking', location: '/shop/browse/pantry/baking' },
    // { id: '1_C7A623D', name: 'Breakfast & Spreads', url: '/shop/browse/pantry/breakfast-spreads', location: '/shop/browse/pantry/breakfast-spreads' },
    // { id: '1_23C59D3', name: 'Canned Food & Instant Meals', url: '/shop/browse/pantry/canned-food-instant-meals', location: '/shop/browse/pantry/canned-food-instant-meals' },
    // { id: '1_F43CC25', name: 'Condiments', url: '/shop/browse/pantry/condiments', location: '/shop/browse/pantry/condiments' },
    // { id: '1_69A326C', name: 'Desserts', url: '/shop/browse/pantry/desserts', location: '/shop/browse/pantry/desserts' },
    // { id: '1_F779C5C', name: 'Herbs & Spices', url: '/shop/browse/pantry/herbs-spices', location: '/shop/browse/pantry/herbs-spices' },
    // { id: '1_53601CD', name: 'International Foods', url: '/shop/browse/pantry/international-foods', location: '/shop/browse/pantry/international-foods' },
    // { id: '1_B5F8608', name: 'Pasta, Rice & Grains', url: '/shop/browse/pantry/pasta-rice-grains', location: '/shop/browse/pantry/pasta-rice-grains' },
    // { id: '1_8A702B7', name: 'Tea & Coffee', url: '/shop/browse/pantry/tea-coffee', location: '/shop/browse/pantry/tea-coffee' },
    // { id: '1_0B44952', name: 'Long Life Milk', url: '/shop/browse/pantry/long-life-milk', location: '/shop/browse/pantry/long-life-milk' },

    // Cleaning and maintenance
    // { id: '1_6174AF3', name: 'Cleaning Goods', url: '/shop/browse/cleaning-maintenance/cleaning-goods', location: '/shop/browse/cleaning-maintenance/cleaning-goods' },
    // { id: '1_F364D22', name: 'Garden & Outdoors', url: '/shop/browse/cleaning-maintenance/garden-outdoors', location: '/shop/browse/cleaning-maintenance/garden-outdoors' },
    // { id: '1_A2E3843', name: 'Kitchen', url: '/shop/browse/cleaning-maintenance/kitchen', location: '/shop/browse/cleaning-maintenance/kitchen' },
    // { id: '1_2F587AA', name: 'Laundry', url: '/shop/browse/cleaning-maintenance/laundry', location: '/shop/browse/cleaning-maintenance/laundry' },
    // { id: '1_AF39A7A', name: 'Pest Control', url: '/shop/browse/cleaning-maintenance/pest-control', location: '/shop/browse/cleaning-maintenance/pest-control' },
    // { id: '1_8AF7215', name: 'Hardware', url: '/shop/browse/cleaning-maintenance/hardware', location: '/shop/browse/cleaning-maintenance/hardware' },

    // { id: '1_499FEB0', name: 'Packaged', url: '', location: '' },


    // { id: '1_717A94B', name: 'Baby', url: '/shop/browse/baby', location: '/shop/browse/baby' },
    // { id: '1_ACA2FC2', name: 'Freezer', url: '/shop/browse/freezer', location: '/shop/browse/freezer' },
    { id: '1-E5BEE36E', name: 'Fruit & Veg', url: '/shop/browse/fruit-veg', location: '/shop/browse/fruit-veg' },
    { id: '1_D5A2236', name: 'Poultry, Meat & Seafood', url: '/shop/browse/poultry-meat-seafood', location: '/shop/browse/poultry-meat-seafood' },
    { id: '1_DEB537E', name: 'Bakery', url: '/shop/browse/bakery', location: '/shop/browse/bakery' },
    { id: '1_5AF3A0A', name: 'Drinks', url: '/shop/browse/drinks', location: '/shop/browse/drinks' },
    { id: '1_3151F6F', name: 'Deli & Chilled Meals', url: '/shop/browse/deli-chilled-meals', location: '/shop/browse/deli-chilled-meals' },
    { id: '1_6E4F4E4', name: 'Dairy, Eggs & Fridge', url: '/shop/browse/dairy-eggs-fridge', location: '/shop/browse/dairy-eggs-fridge' },
    { id: '1_61D6FEB', name: 'Pet', url: '/shop/browse/pet', location: '/shop/browse/pet' },
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
    const browser2 = await puppeteer.launch({
        headless: false,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        userDataDir: "C:\\Users\\OBI - Raymond\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1"
    });
    
    for (let i = 0; i < mylocation.length; i++) {
        const page = (await browser2.newPage()).removeAllListeners('request');
        // page = await browser2.newPage();
        // await page.setUserAgent(
        //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'
        // );
        await page.setExtraHTTPHeaders({
            Referer: "https://www.woolworths.com.au/",
        });
        const loadedCookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
        await page.setCookie(...loadedCookies);
        await safeNavigate(page, 'https://www.woolworths.com.au');
        await delay(2000)
        await page.reload()
        await delay(3000)
        await page.reload()
        await delay(3000)
        // await delay(60000)
        // await delay(60000)
        if (!booool) {
            
            console.log('1')
            booool = true
        } else {
            await delay(5000)
            for(let i = 1; i > 5; i++) {
                await delay(3000)
                await page.reload()
            }
            await delay(20000)
            console.log('2')
        }
        await handleSteps(page, mylocation[i], 'https://www.woolworths.com.au')
        await delay(2000)
        await Promise.allSettled(
            CATEGORIES.map(async (category, index) => {
                let page2
                page2 = (await browser2.newPage()).removeAllListeners('request');
                const randomUserAgent = userAgents[index];
                await page2.setUserAgent(randomUserAgent);
                await page2.setExtraHTTPHeaders({
                    Referer: "https://www.woolworths.com.au/",
                });
                await safeNavigate(page2, 'https://www.woolworths.com.au');
                await delay(20000)


                // const content = await page2.evaluate(() => document.body.innerText);
                
                const htmlOnly = async (page) => {
                    await page.removeAllListeners('request');
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
                    await browser2.close();
                    return [];
                }

                await page2.setBypassCSP(true);
                
                const products = await scrapeCategory(page2, category, mylocation[i], page);
                console.log('Number of products:', products.length);
                await page2.close()
            }))
        console.log('all done in location:', mylocation[i])
        // await browser2.close();
        await delay(3000)
        console.log('1')
        await delay(3000)
        console.log('2')
    }
    console.log('all is done')
})();

const scrapeCategory = async (page, category, myloc, p) => {
    console.log('Scraping category: ', category.name);

    const body = {
        categoryId: category.id,
        pageNumber: 1,
        pageSize: 36,
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
        isHideUnavailableProducts: true,
        isRegisteredRewardCardPromotion: false,
        enableAdReRanking: false,
        groupEdmVariants: true,
        categoryVersion: 'v2',
    };

    const res = await callFetch(page, body);
    // console.log('First category response:', res);

    const numProducts = res.TotalRecordCount || 0;
    const numPages = Math.ceil(numProducts / 36);
    console.log('Products: ', numProducts, 'Pages: ', numPages);
    console.log('Pages: ', numPages);

    const productRes = [];

    for (let i = 1; i <= numPages; i++) {
        console.log('pageResetvalue', pageReset)
        if (pageReset > 250) {
            const loadedCookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
            await page.setCookie(...loadedCookies);
            await safeNavigate(page, 'https://www.woolworths.com.au');
            // await page.goto('https://www.woolworths.com.au', { waitUntil: 'domcontentloaded' });
            // await delay(20000)
            for(let i = 1; i > 5; i++) {
                await delay(2000)
                await p.reload()
            }
            await delay(25000)
            for(let i = 1; i > 3; i++) {
                await delay(2500)
                await page.reload()
            }
            console.log('creating new page')
            await delay(5000)
            page.removeAllListeners('request');
            const content = await page.evaluate(() => document.body.innerText);
            const htmlOnly = async (page) => {
                await page.setRequestInterception(true);
                page.on('request', (req) => {
                    if (!['document', 'xhr', 'fetch'].includes(req.resourceType())) {
                        return req.abort();
                    }
                    req.continue();
                });
            };
            await htmlOnly(page);

            try {
                await safeNavigate(page, WOOLWORTHS_URL);
            } catch (err) {
                console.log('Failed to load page: ', err);
                // await browser2.close();
                // return [];
            }

            await page.setBypassCSP(true);
            pageReset = 0
        }
        pageReset = pageReset + 1
        body.pageNumber = i;
        body.location = `${category.location}?pageNumber=${i}`;
        body.url = `${category.url}?pageNumber=${i}`;
        const products = await scrapeURL(page, body, myloc);
        console.log('Number of products:', products.length, 'on page:', i);
        if (products && products.length === 0) {
            console.log('No more products:')
            break
        }
        productRes.push(...products);
        // await delay(1000)
    }
    // if (productRes && productRes.length > 0) console.log('all products', productRes.length)
    return productRes;
}

const scrapeURL = async (page, request, myloc) => {
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
        // const location = 'qld'
        // const location = 'wa'
        // const location = 'sa'
        // const location = 'tas'
        const location = myloc
        const inputString = product.CupMeasure || '';

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
            prices: getPrices(location, priceInCents, priceInCentsPerUnits, unit),
            // prices: [{
            //   ...(location === 'nsw' && { nsw: priceInCents }),
            //   ...(location === 'nsw' && { nsw_price_per_unit: priceInCentsPerUnits }),
            //   ...(location === 'nsw' && { nsw_unit: unit }),
            //   ...(location === 'vic' && { vic: priceInCents }),
            //   ...(location === 'qld' && { qld: priceInCents }),
            //   ...(location === 'wa' && { wa: priceInCents }),
            //   ...(location === 'sa' && { sa: priceInCents }),
            //   ...(location === 'tas' && { tas: priceInCents }),
            // }],
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
                const updatedPrices = [...q.prices];
                let priceUpdated = false;

                // Compare and update prices
                for (let i = 0; i < updatedPrices.length; i++) {
                    if (data.prices > 0 && updatedPrices > 0) {
                        if (updatedPrices[i].state.toLowerCase() === data.prices[0].state.toLowerCase()) { // Compare location
                            updatedPrices[i].price = data.prices[0].price;
                            updatedPrices[i].price_per_unit = data.prices[0].price_per_unit;
                            updatedPrices[i].price_unit = data.prices[0].price_unit;
                            priceUpdated = true;
                            break;
                        }
                    }
                }

                // If no match, push the new price data
                if (!priceUpdated) {
                    updatedPrices.push(data.prices[0]);
                }
                await Product.findByIdAndUpdate(q._id, { $set: { prices: updatedPrices } }, { new: true })
            }
        }
    }
    return products;
}

const callFetch = async (page, request) => {
    const retries = 99999
    for (let i = 0; i < retries; i++) {
        try {
            const a = await page.evaluate(
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
            if (a.error || !a || a === undefined) {
                console.error('Error in fetch:', a.error);
                throw new Error('');
            }
            return a
        } catch (err) {
            console.error(`Attempt ${i + 1} failed: ${err}`);
            if (i === retries - 1) throw err;
            await delay(2000);
        }
    }
}