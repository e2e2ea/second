const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require('fs')

puppeteer.use(StealthPlugin());
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
module.exports.index = async (req, res) => {
    console.log('req', req.body)
    const firstWord = req.body.location.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '');;
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        const url = 'https://www.coles.com.au/browse/health-beauty';
        console.log(`Navigating to ${url}...`);

        await safeNavigate(page, url);

        console.log('Page loaded successfully.');
        await page.waitForSelector('body', { timeout: 60000 }); // Ensure the page is at least loaded
        await delay(20000);

        // Step 1: Open the drawer to set location
        const drawerButtonSelector = '#delivery-selector-button';  // Drawer button selector
        await waitForElement(page, drawerButtonSelector, { visible: true, timeout: 50000 });  // Increased timeout to handle loading
        await page.click(drawerButtonSelector);
        console.log('Drawer opened.');
        await delay(3000);

        // Step 2: Click the "Click & Collect" button
        const clickCollectButtonSelector = 'button[data-testid="tab-collection"]';
        await waitForElement(page, clickCollectButtonSelector, { visible: true, timeout: 60000 });  // Increased timeout
        await page.click(clickCollectButtonSelector);
        console.log('Clicked on the "Click & Collect" button.');
        await delay(3000);
        // Step 3: Search for the location without relying on your computer's location
        const searchInputSelector = '#suburb-postcode-autocomplete';
        const location = firstWord;

        // Wait for the search input and type the location
        await waitForElement(page, searchInputSelector, { visible: true, timeout: 70000 });
        await page.focus(searchInputSelector); // Ensure focus is on the input field
        await page.type(searchInputSelector, location, { delay: 100 }); // Add a small delay between keystrokes to mimic human typing
        console.log(`Typed location: ${location}`);
        // await waitForElement(page, 'div[role="presentation"].MuiAutocomplete-popper', { visible: true, timeout: 60000 });
        await delay(3000);
        await waitForElement(page, 'div.MuiAutocomplete-popper', { visible: true, timeout: 60000 });

        const optionName = req.body.location;

        const specificOptionSelector = `li[role="option"]`;
        // Find and click the option with matching text
        try {
            const options = await page.$$(specificOptionSelector); // Get all options
            for (let option of options) {
                const text = await option.evaluate((el) => el.textContent.trim());
                if (text === optionName) {
                    await option.click(); // Click the matching option
                    console.log(`Clicked on "${optionName}" suggestion.`);
                    break;
                }
            }
        } catch (error) {
            console.error(`Failed to click on "${optionName}" option:`, error);
        }
        await delay(5000);
        // Step 5: Click on the radio button corresponding to the store
        // Define the desired sub-location name
        const subLocation = req.body.sublocation;

        // Wait for the container holding the radio options to appear
        await waitForElement(page, 'div[role="radiogroup"]', { visible: true, timeout: 60000 });

        try {
            // Log all available radio options
            const options = await page.$$('div.coles-targeting-CardRadioContainer');
            console.log('Available Options:');
            for (let option of options) {
                const text = await option.evaluate(el => el.textContent.trim());
                console.log(text);
            }

            // Find and click the matching sub-location
            let clicked = false;
            for (let option of options) {
                const text = await option.evaluate(el => el.textContent.trim());
                if (text.includes(subLocation)) { // Match the text
                    await option.click(); // Click the matching option
                    console.log(`Clicked on sub-location: "${subLocation}"`);
                    clicked = true;
                    break;
                }
            }

            if (!clicked) {
                throw new Error(`Sub-location "${subLocation}" not found.`);
            }
        } catch (error) {
            console.error(`Failed to click on sub-location: "${subLocation}"`, error);
        }
        await delay(5000);

        // Step 6: set the location
        // Wait for the "Set location" button to appear
        await waitForElement(page, 'button[data-testid="cta-secondary"]', { visible: true, timeout: 60000 });

        try {
            // Click the "Set location" button
            await page.click('button[data-testid="cta-secondary"]');
            console.log('Clicked the "Set location" button.');
        } catch (error) {
            console.error('Failed to click the "Set location" button:', error);
        }

        await delay(20000);
        // Step 7: Scrape product data after location is set
        await page.waitForSelector('section[data-testid="product-tile"]', { timeout: 100000 });
        const productData = await page.evaluate(() => {
            const baseURL = "https://www.coles.com.au"
            const products = document.querySelectorAll('section[data-testid="product-tile"]');
            return Array.from(products).map(product => {
                const href = product.querySelector('.product__image_area a')?.href || 'N/A'; // Extract href

                let weight = 'N/A';
                let barcode = 'N/A';
                if (href !== 'N/A') {
                    const parts = href.split('-'); // Split the URL by "-"
                    weight = parts.length > 1 ? parts[parts.length - 2] : 'N/A'; // Second-to-last part for weight
                    barcode = parts.length > 0 ? parts[parts.length - 1] : 'N/A'; // Last part for barcode
                }

                return {
                    source_url: href !== 'N/A' ? baseURL + href : 'N/A', // Prepend base URL for full link
                    name: product.querySelector('.product__title')?.textContent.trim() || 'N/A',
                    image_url: product.querySelector('img[data-testid="product-image"]')?.src || 'N/A',
                    barcode: barcode,
                    shop: "coles",
                    weight: weight,
                    price: product.querySelector('.price__value')?.textContent.trim() || 'N/A',
                    // rating: product.querySelector('.bv_text')?.textContent.trim() || 'N/A',
                    // numReviews: product.querySelector('.bv_numReviews_component_container .bv_text')?.textContent.trim() || 'N/A',
                };
            });
        });

        // Save data to a JSON file
        const filePath = './product_data.json';
        fs.writeFileSync(filePath, JSON.stringify(productData, null, 4));
        console.log(`Data saved to ${filePath}`);
    } catch (error) {
        console.error('Error:', error);
        await page.screenshot({ path: 'error_screenshot.png' }); // Debugging
    } finally {
        await browser.close();
        
        return response.redirect('/scrape');
    }
    
};
// Retry navigation function
async function safeNavigate(page, url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            return; // Exit if successful
        } catch (error) {
            console.error(`Attempt ${i + 1} failed: ${error}`);
            if (i === retries - 1) throw error; // Rethrow after max retries
        }
    }
}

// Custom function to wait for elements with retries and timeout
async function waitForElement(page, selector, options = {}) {
    const { visible = false, timeout = 10000 } = options;

    try {
        await page.waitForSelector(selector, { visible, timeout });
    } catch (error) {
        console.error(`Error waiting for selector ${selector}:`, error);
        throw error;
    }
}
