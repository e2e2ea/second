import RateLimiter from './RateLimit/index.js';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
const COLES_URL = 'https://www.coles.com.au/browse';
const SPEED_LIMIT = 20;
const rateLimit = new RateLimiter(SPEED_LIMIT, 5);
puppeteer.use(StealthPlugin());


const scrapeAllCategories = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        // args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null,
        timeout: 180000,
    });

    try {
        const page = await browser.newPage();
        await page.goto(COLES_URL, { timeout: 180000 });

        const categoryCardElements = await page.$$('[data-testid="category-card"]');
        const categoriesUnfiltered = await Promise.all(
            categoryCardElements.map(async (el) => {
                const href = await el?.getProperty('href');
                const url = await href?.jsonValue();
                const category = await el?.getProperty('textContent').then((txt) => txt.jsonValue());
                return { name: category, url };
            })
        );

        const categories = categoriesUnfiltered.filter((cat) => cat.url !== null && cat.name !== 'Specials');
        console.log('categories:', categories);

        for (const category of categories) {
            try {
                const products = await scrapeCategory(browser, category.url);
                console.log(`Products for ${category.name}:`, products);
            } catch (error) {
                console.error(`Error scraping category ${category.name}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error in scrapeAllCategories:', error.message);
    } finally {
        // await browser.close();
    }
};

const scrapeCategory = async (browser, category_url) => {
    console.log('Scraping category:', category_url);

    const page = await browser.newPage();
    try {
        await page.goto(category_url, { timeout: 200000 });

        const subCategoryElements = await page.$$('[data-testid="nav-link"]');
        const subCategories = await Promise.all(
            subCategoryElements.map(async (el) => {
                const href = await el?.getProperty('href');
                const url = await href?.jsonValue();
                const name = await el?.getProperty('textContent').then((txt) => txt.jsonValue());
                return { name, url };
            })
        );

        console.log('Subcategories:', subCategories);
        return subCategories;
    } catch (error) {
        console.error('Error in scrapeCategory:', error.message);
        throw error; // Rethrow to handle in the parent function
    } finally {
        await page.close();
    }
};

(async () => {
    await scrapeAllCategories();
})();
