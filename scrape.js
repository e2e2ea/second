import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import safeNavigate from './controllers/helpers/coles/safeNavigate.js';
import waitForElement from './controllers/helpers/coles/waitForElement.js';
import handleSteps from './controllers/helpers/coles/steps.js';
import mongoose from 'mongoose';
import path from 'path';
import locations from './constant/location.js'
import categories from './constant/categories.js'

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
    for (const categ of categories) {
      let category
      category = categ.category
      for (const sub of categ.subCategories) {
        let subCategory
        subCategory = sub.subCategory
        if (subCategory === 'Nappies Wipes') subCategory = 'Nappies & Nappy Pants'
        for (const ext of sub.childItems) {
          let extensionCategory
          extensionCategory = ext.extensionCategory

          // baby category logic
          if (extensionCategory === 'Specialty') extensionCategory = 'Specialty Formula'
          if (extensionCategory === 'Swimming Nappies') extensionCategory = 'Swimmers'


          const updatedCategory = category.replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace one or more spaces with a single hyphen
            .replace(/-+/g, '-');
          const updatedSubCategory = subCategory.replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
          const updatedextensionCategory = extensionCategory.replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

          // bakery category logic
          // if (subCategory === 'In-Store Bakery') extensionCategory = ''
          // if (subCategory === 'Packaged Bread & Bakery') extensionCategory = ''

          let url
          if (extensionCategory) {
            url = `https://www.coles.com.au/browse/${updatedCategory.toLowerCase()}/${updatedSubCategory.toLowerCase()}/${updatedextensionCategory.toLowerCase()}`;
          } else {
            url = `https://www.coles.com.au/browse/${updatedCategory.toLowerCase()}/${updatedSubCategory.toLowerCase()}`;
          }
          // console.log(`Navigating to ${url}...`);
          // bakery category
          if (sub.subCategory === 'In-Store Bakery') {
            if (ext.extensionCategory === 'Bread Rolls') url = `https://www.coles.com.au/browse/${updatedCategory.toLowerCase()}/instore-bakery-breads-and-rolls`
            // 2 url if Donuts & Cookies
            if (ext.extensionCategory === 'Cookies') url = `https://www.coles.com.au/browse/${updatedCategory.toLowerCase()}/instore-bakery-sweet-treats/cookies`
            if (ext.extensionCategory === 'Donuts') url = `https://www.coles.com.au/browse/${updatedCategory.toLowerCase()}/instore-bakery-sweet-treats/donuts`
          }
          if (subCategory === 'Packaged Bread & Bakery') url = `https://www.coles.com.au/browse/${updatedCategory.toLowerCase()}/packaged-breads`

          // category Dairy, Eggs & Fridge 
          if (category === 'Dairy, Eggs & Fridge') {
            if (sub.subCategory === 'Cream, Custard & Desserts') {
              if (ext.extensionCategory === 'Cream') url = `https://www.coles.com.au/browse/dairy-eggs-fridge/cream-custard/cream`
              if (ext.extensionCategory === 'Custard') url = `https://www.coles.com.au/browse/dairy-eggs-fridge/cream-custard/custards`
            }
            if (sub.subCategory === 'Dips & Pate') {
              if (ext.extensionCategory === 'Dips') url = `https://www.coles.com.au/browse/dairy-eggs-fridge/dips-pate/dips`
              if (ext.extensionCategory === 'Pate') url = `https://www.coles.com.au/browse/dairy-eggs-fridge/dips-pate/pate`
              if (ext.extensionCategory === 'Paste') url = `https://www.coles.com.au/browse/dairy-eggs-fridge/dips-pate/paste`
            }
            if (sub.subCategory === 'Eggs, Butter & Margarine') {
              if (ext.extensionCategory === 'Butter & Margarine') url = `https://www.coles.com.au/browse/dairy-eggs-fridge/butter-margarine`
              if (ext.extensionCategory === 'Eggs') url = `https://www.coles.com.au/browse/dairy-eggs-fridge/eggs`
            }
            if (sub.subCategory === 'Milk') {
              if (ext.extensionCategory === 'Long Life Milk') url = `https://www.coles.com.au/browse/dairy-eggs-fridge/long-life-milk/long-life-milk`
              if (ext.extensionCategory === 'Lactose Free Milk') url = `https://www.coles.com.au/browse/dairy-eggs-fridge/long-life-milk/lactose-free-milk`
            }
          }
          // category Deli & Chilled Meats
          if (category === 'Deli & Chilled Meats') {
            if (sub.subCategory === 'Deli Meats') {
              if (ext.extensionCategory === 'Antipasto') url = `https://www.coles.com.au/browse/deli/olives-antipasto/antipasto`
              if (ext.extensionCategory === 'Deli Poultry') url = `https://www.coles.com.au/browse/deli/deli-poultry`
            }
            if (sub.subCategory === 'Deli Specialties') {
              if (ext.extensionCategory === 'Gourmet Cheese') url = `https://www.coles.com.au/browse/deli/deli-gourmet-cheese`
              if (ext.extensionCategory === 'Platters') url = `https://www.coles.com.au/browse/deli/pre-made-platters`
            }
            if (sub.subCategory === 'Ready to Eat Meals') {
              if (ext.extensionCategory === 'Chilled Quiches & Pies') url = `https://www.coles.com.au/browse/deli/deli-chilled-meals`
            }
          }
          // category Drinks
          if (category === 'Drinks') {
            if (sub.subCategory === 'Chilled Drinks') {
              if (ext.extensionCategory === 'Soft Drinks') url = `https://www.coles.com.au/browse/drinks/cold-drinks/cold-soft-drinks`
              if (ext.extensionCategory === 'Energy Drinks') url = `https://www.coles.com.au/browse/drinks/cold-drinks/other-cold-drinks`
              if (ext.extensionCategory === 'Chilled Water') url = `https://www.coles.com.au/browse/drinks/cold-drinks/cold-water`
            }
            if (sub.subCategory === 'Coffee') {
              if (ext.extensionCategory === 'Coffee Beans') url = `https://www.coles.com.au/browse/drinks/coffee-drinks/beans-coffee`
              if (ext.extensionCategory === 'Coffee Capsules') url = `https://www.coles.com.au/browse/drinks/coffee-drinks/coffee-capsules`
              if (ext.extensionCategory === 'Ground Coffee') url = `https://www.coles.com.au/browse/drinks/coffee-drinks/coffee-ground`
              if (ext.extensionCategory === 'Instant & Flavoured Coffee') url = `https://www.coles.com.au/browse/drinks/coffee-drinks/coffee-instant`
            }
            if (sub.subCategory === 'Cordials, Juices & Iced Teas') {
              if (ext.extensionCategory === 'Chilled Juices') url = `https://www.coles.com.au/browse/drinks/juice/chilled-juice`
              if (ext.extensionCategory === 'Cordials') url = `https://www.coles.com.au/browse/drinks/cordials`
              if (ext.extensionCategory === 'Iced Teas') url = `https://www.coles.com.au/browse/drinks/iced-tea`
            }
            if (sub.subCategory === 'Flavoured Milk') {
              if (ext.extensionCategory === 'Drinking Chocolate') url = `https://www.coles.com.au/browse/drinks/flavoured-milk/drinking-chocolate`
              if (ext.extensionCategory === 'Drinks & Powders') url = `https://www.coles.com.au/browse/drinks/flavoured-milk/drinks-powders`
              if (ext.extensionCategory === 'Kids Milk') url = `https://www.coles.com.au/browse/drinks/flavoured-milk/kids-milk`
            }
            if (sub.subCategory === 'Long Life Milk') {
              if (ext.extensionCategory === 'Almond Milk') url = `https://www.coles.com.au/browse/drinks/long-life-milk/almond-milk`
              if (ext.extensionCategory === 'Lactose Free Milk') url = `https://www.coles.com.au/browse/drinks/long-life-milk/lactose-free-milk`
              if (ext.extensionCategory === 'Oat & Rice Milk') url = `https://www.coles.com.au/browse/drinks/long-life-milk/oat-rice-milks`
              if (ext.extensionCategory === 'Powdered Milk') url = `https://www.coles.com.au/browse/drinks/long-life-milk/powdered-milk`
              if (ext.extensionCategory === 'Soy Milk') url = `https://www.coles.com.au/browse/drinks/long-life-milk/soy-milk-long-life`
            }
            if (sub.subCategory === 'Soft Drinks') {
              if (ext.extensionCategory === 'Mixers') url = `https://www.coles.com.au/browse/drinks/soft-drinks/mixers`
              if (ext.extensionCategory === 'Soft Drink Bottles') url = `https://www.coles.com.au/browse/drinks/soft-drinks/soft-drink-bottles`
              if (ext.extensionCategory === 'Soft Drink Cans') url = `https://www.coles.com.au/browse/drinks/soft-drinks/soft-drink-cans`
            }
            if (sub.subCategory === 'Sports & Energy Drinks') {
              if (ext.extensionCategory === 'Energy Drinks') url = `https://www.coles.com.au/browse/drinks/energy-drinks`
              if (ext.extensionCategory === 'Sports Drinks') url = `https://www.coles.com.au/browse/drinks/sports-drinks`
            }
            if (sub.subCategory === 'Tea') {
              if (ext.extensionCategory === 'Black Tea') url = `https://www.coles.com.au/browse/drinks/tea-drinks/tea-black`
              if (ext.extensionCategory === 'Green Tea') url = `https://www.coles.com.au/browse/drinks/tea-drinks/tea-green`
              if (ext.extensionCategory === 'Herbal & Specialty Tea') url = `https://www.coles.com.au/browse/drinks/tea-drinks/tea-herbal`
            }
            if (sub.subCategory === 'Water') {
              if (ext.extensionCategory === 'Flavoured & Coconut Water') url = `https://www.coles.com.au/browse/drinks/water/flavoured-water`
              if (ext.extensionCategory === 'Sparkling Water') url = `https://www.coles.com.au/browse/drinks/water/sparkling-water`
              if (ext.extensionCategory === 'Still Water') url = `https://www.coles.com.au/browse/drinks/water/still-water`
            }
          }
          // category Drinks
          if (category === 'Freezer') {
            if (sub.subCategory === 'Frozen Desserts') {
              if (ext.extensionCategory === 'Assorted Desserts') url = `https://www.coles.com.au/browse/frozen/frozen-desserts/assorted-desserts`
              if (ext.extensionCategory === 'Cakes & Cheesecakes') url = `https://www.coles.com.au/browse/frozen/frozen-desserts/cakes-cheesecakes`
              if (ext.extensionCategory === 'Dessert Pies & Pastries') url = `https://www.coles.com.au/browse/frozen/frozen-desserts/dessert-pies`
            }
            if (sub.subCategory === 'Frozen Fruit') {
              if (ext.extensionCategory === 'Berries') url = `https://www.coles.com.au/browse/frozen/frozen-fruit/berries`
              if (ext.extensionCategory === 'Tropical') url = `https://www.coles.com.au/browse/frozen/frozen-fruit/tropical`
            }
            if (sub.subCategory === 'Frozen Meat') {
              if (ext.extensionCategory === 'Chicken Pieces & Nuggets') url = `https://www.coles.com.au/browse/frozen/frozen-chicken-beef-pork/chicken-pieces-nuggets`
              if (ext.extensionCategory === 'Whole Birds & Roasts') url = `https://www.coles.com.au/browse/frozen/frozen-chicken-beef-pork/whole-birds-roasts`
            }
            if (sub.subCategory === 'Frozen Party Food') {
              if (ext.extensionCategory === 'Pastry Sheets') url = `https://www.coles.com.au/browse/frozen/frozen-pastry-party-food/pastry-sheets`
              if (ext.extensionCategory === 'Pastries') url = `https://www.coles.com.au/browse/frozen/frozen-pastry-party-food/pastries`
              if (ext.extensionCategory === 'Pies & Quiches') url = `https://www.coles.com.au/browse/frozen/frozen-pastry-party-food/pies-quiches`
            }
            if (sub.subCategory === 'Frozen Pizzas') {
              if (ext.extensionCategory === 'Pizzas') url = `https://www.coles.com.au/browse/frozen/frozen-pizza-bases/pizzas`
            }
            if (sub.subCategory === 'Frozen Seafood') {
              if (ext.extensionCategory === 'Fish Fillets') url = `https://www.coles.com.au/browse/frozen/frozen-fish-seafood/fish-fillets`
              if (ext.extensionCategory === 'Fish Fingers & Cakes') url = `https://www.coles.com.au/browse/frozen/frozen-fish-seafood/fish-fingers-cakes`
              if (ext.extensionCategory === 'Frozen Seafood') url = `https://www.coles.com.au/browse/frozen/frozen-fish-seafood/seafood-frozen`
            }
            if (sub.subCategory === 'Frozen Vegetables') {
              if (ext.extensionCategory === 'Beans') url = `https://www.coles.com.au/browse/frozen/frozen-vegetables/beans`
              if (ext.extensionCategory === 'Peas') url = `https://www.coles.com.au/browse/frozen/frozen-vegetables/peas`
              if (ext.extensionCategory === 'Corn') url = `https://www.coles.com.au/browse/frozen/frozen-vegetables/corn`
              if (ext.extensionCategory === 'Mixed Vegetables') url = `https://www.coles.com.au/browse/frozen/frozen-vegetables/mixed-vegetables`
              if (ext.extensionCategory === 'Other Vegetables') url = `https://www.coles.com.au/browse/frozen/frozen-vegetables/other-vegetables`
              if (ext.extensionCategory === 'Steam Packs') url = `https://www.coles.com.au/browse/frozen/frozen-vegetables/steaming`
            }
            if (sub.subCategory === 'Ice Cream') {
              if (ext.extensionCategory === 'Frozen Yoghurt') url = `https://www.coles.com.au/browse/frozen/ice-cream/frozen-yoghurt`
              if (ext.extensionCategory === 'Gelato & Sorbet') url = `https://www.coles.com.au/browse/frozen/ice-cream/sorbet-gelato`
              if (ext.extensionCategory === 'Ice Cream Sticks & Cones') url = `https://www.coles.com.au/browse/frozen/ice-cream/ice-cream-sticks`
              if (ext.extensionCategory === 'Ice Cream Tubs') url = `https://www.coles.com.au/browse/frozen/ice-cream/ice-cream-tubs`
              if (ext.extensionCategory === 'Premium Ice Cream') url = `https://www.coles.com.au/browse/frozen/ice-cream/premium-ice-cream`
            }
          }
          if (category === 'Fruit & Veg') {
            if (sub.subCategory === 'Fruit') {
              if (ext.extensionCategory === 'Apples') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/apples`
              if (ext.extensionCategory === 'Pears') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/pears`
              if (ext.extensionCategory === 'Bananas') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/bananas`
              if (ext.extensionCategory === 'Berries & Cherries') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/berries-cherries`
              if (ext.extensionCategory === 'Grapes') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/grapes`
              if (ext.extensionCategory === 'Melons') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/melons`
              if (ext.extensionCategory === 'Mangoes') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/mangoes`
              if (ext.extensionCategory === 'Pineapples') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/pineapples`
              if (ext.extensionCategory === 'Kiwi Fruit') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/kiwi-fruit`
              if (ext.extensionCategory === 'Tropical & Exotic Fruit') url = `https://www.coles.com.au/browse/fruit-vegetables/fruit/tropical-exotic-fruit`
            }
            if (sub.subCategory === 'Organic') {
              if (ext.extensionCategory === 'Organic Fruit') url = `https://www.coles.com.au/browse/fruit-vegetables/organic-fruits-vegetables/organic-fruits`
              if (ext.extensionCategory === 'Organic Vegetables') url = `https://www.coles.com.au/browse/fruit-vegetables/organic-fruits-vegetables/organic-vegetables`
            }
            if (sub.subCategory === 'Salad') {
              if (ext.extensionCategory === 'Herbs') url = `https://www.coles.com.au/browse/fruit-vegetables/salad-herbs/herbs`
              if (ext.extensionCategory === 'Sprouts') url = `https://www.coles.com.au/browse/fruit-vegetables/salad-herbs/sprouts`
            }
            if (sub.subCategory === 'Vegetables') {
              if (ext.extensionCategory === 'Broccoli, Cauliflower & Cabbage') url = `https://www.coles.com.au/browse/fruit-vegetables/vegetables/broccoli-cauliflower`
              if (ext.extensionCategory === 'Capsicum & Mushrooms') url = `https://www.coles.com.au/browse/fruit-vegetables/vegetables/mushrooms`
              if (ext.extensionCategory === 'Onions & Leeks') url = `https://www.coles.com.au/browse/fruit-vegetables/vegetables/onion-leeks`
              if (ext.extensionCategory === 'Cucumber') url = `https://www.coles.com.au/browse/fruit-vegetables/vegetables/cucumber`
              if (ext.extensionCategory === 'Potatoes') url = `https://www.coles.com.au/browse/fruit-vegetables/vegetables/potatoes`
              if (ext.extensionCategory === 'Pumpkins') url = `https://www.coles.com.au/browse/fruit-vegetables/vegetables/pumpkin`
              if (ext.extensionCategory === 'Tomatoes') url = `https://www.coles.com.au/browse/fruit-vegetables/vegetables/tomatoes`
              if (ext.extensionCategory === 'Eggplant') url = `https://www.coles.com.au/browse/fruit-vegetables/vegetables/eggplant`
              if (ext.extensionCategory === 'Zucchini & Squash') url = `https://www.coles.com.au/browse/fruit-vegetables/vegetables/zucchini-squash`
            }
          }
          for (const loc of locations) {
            const browser = await puppeteer.launch({
              headless: false,
              // args: [
              //   '--ignore-certificate-errors',
              //   '--disable-setuid-sandbox',
              //   '--proxy-server=http://proxy.toolip.io:31114'  // Replace with your proxy server URL
              // ]
            });
            let page
            const context = await browser.createBrowserContext();

            page = await context.newPage();
            // await page.authenticate({
            //   username: 'tl-274bbabe017e849be3b3754410498c6cf8fef4af98e74785087c842a92ec9c5d-country-us-session-6dc20',  // Replace with your proxy username
            //   password: '92vrkqlu1nng'  // Replace with your proxy password
            // });
            // const client = await page.target().createCDPSession();
            // await client.send('Network.clearBrowserCookies');
            // await client.send('Network.clearBrowserCache');
            await safeNavigate(page, url);

            console.log('Page loaded successfully.');
            await delay(6000);
            // await delay(6000);
            // await delay(6000);
            await page.waitForSelector('body', { timeout: 90000 });
            await delay(3000);
            const a = await handleSteps(page, loc, url);
            await safeNavigate(page, url);
            await delay(8000);
            let hasProducts = true;
            let i = 1;
            while (hasProducts) {
              if (i !== 1) {
                const url2 = `${url}?page=${i}`;
                await safeNavigate(page, url2);
                await delay(9000);
              }
              try {
                await page.waitForSelector('section[data-testid="product-tile"]', { timeout: 10000 });
              } catch (error) {
                hasProducts = false;
                await browser.close();
                // await delay(10000);
                break;
              }
              // console.log('Products found, extracting data...');

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
                    let sub
                    sub = subCategory

                    let ext
                    ext = extensionCategory

                    // baby category
                    if (subCategory === 'Nappies & Nappy Pants') sub = 'Nappies Wipes'
                    if (extensionCategory === 'Specialty Formula') ext = 'Specialty'
                    if (extensionCategory === 'Swimmers') ext = 'Swimming Nappies'

                    // bakery category
                    if (subCategory === 'In-Store Bakery') {
                      sub = `In-Store Bakery`
                      if (ext === 'Donuts') ext = "Donuts & Cookies"
                      if (ext === 'Cookies') ext = "Donuts & Cookies"
                    }
                    if (subCategory === 'Packaged Bread & Bakery') {
                      sub = `Packaged Bread & Bakery`
                    }

                    // category Dairy, Eggs & Fridge
                    if (category === 'Dairy, Eggs & Fridge') {
                      if (subCategory === 'Dips & Pate') {
                        if (extensionCategory === 'Pate') ext = 'Pate, Paste & Caviar'
                        if (extensionCategory === 'Paste') ext = 'Pate, Paste & Caviar'
                      }
                    }
                    // category Drinks
                    if (category === 'Drinks') {
                      if (subCategory === 'Chilled Drinks') {
                        if (extensionCategory === 'Soft Drinks' || extensionCategory === 'Energy Drinks') ext = 'Chilled Soft Drinks & Energy Drinks'
                      }
                    }
                    // category Freezer
                    if (category === 'Freezer') {
                      if (subCategory === 'Frozen Fruit') {
                        if (extensionCategory === 'Berries' || extensionCategory === 'Tropical') ext = 'Berries & Tropical'
                      }
                      if (subCategory === 'Frozen Party Food') {
                        if (extensionCategory === 'Pastries' || extensionCategory === 'Pies & Quiches') ext = 'Pies, Pastries & Quiches'
                      }
                      if (subCategory === 'Frozen Vegetables') {
                        if (extensionCategory === 'Beans' || extensionCategory === 'Peas') ext = 'Beans & Peas'
                      }
                    }
                    // category Fruit & Veg
                    if (category === 'Fruit & Veg') {
                      if (subCategory === 'Fruit') {
                        if (extensionCategory === 'Apples' || extensionCategory === 'Pears') ext = 'Apples & Pears'
                        if (extensionCategory === 'Melons' || extensionCategory === 'Mangoes') ext = 'Melons & Mangoes'
                        if (extensionCategory === 'Pineapples' || extensionCategory === 'Kiwi Fruit') ext = 'Pineapples & Kiwi Fruit'
                      }
                      if (subCategory === 'Vegetables') {
                        if (extensionCategory === 'Potatoes' || extensionCategory === 'Pumpkins') ext = 'Potatoes & Pumpkins'
                        if (extensionCategory === 'Eggplant' || extensionCategory === 'Zucchini & Squash') ext = 'Zucchini, Eggplant & Squash'
                      }
                    }

                    return {
                      source_url: href !== 'N/A' ? href : 'N/A',
                      category: category,
                      subCategory: sub,
                      extensionCategory: ext,
                      name: product.querySelector('.product__title')?.textContent.trim() || 'N/A',
                      image_url: product.querySelector('img[data-testid="product-image"]')?.src || 'N/A',
                      barcode: barcode,
                      shop: 'coles',
                      weight: weight,
                      prices: {
                        ...(loc.location === 'Sydney, NSW 2000' && { nsw: priceInCents }),
                        ...(loc.location === 'Sydney, NSW 2000' && { nsw_price_per_unit: pricePerUnit }),
                        ...(loc.location === 'Sydney, NSW 2000' && { nsw_unit: unit }),
                        ...(loc.location === 'Chadstone Shopping Centre, 1341 Dandenong Road, MALVERN EAST VIC 3145' && { vic: priceInCents }),
                        ...(loc.location === 'Kedron, QLD 4031' && { qld: priceInCents }),
                        ...(loc.location === 'Perth, WA 6000' && { wa: priceInCents }),
                        ...(loc.location === 'Kilburn, SA 5084' && { sa: priceInCents }),
                        ...(loc.location === 'Hobart, TAS 7000' && { tas: priceInCents }),
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

              // console.log('length find...', productData.length);
              // await delay(9000);
            }
            console.log('done', loc.location);
            await delay(4000);
          }

          console.log('done Child Items:', extensionCategory)
        }
        console.log('done Sub Category:', subCategory)
      }
      console.log('done Category:', category)
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
