import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());
function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const url = 'https://www.coles.com.au/product/magnum-ice-cream-mini-almond-6pack-360ml-9091672';
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
    await delay(9000)
    // Debugging: Log full HTML content
    const pageContent = await page.content();
    console.log('Page Content:', pageContent);

    // Extract JSON-LD data
    const jsonLdData = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        const jsonData = scripts.map(script => JSON.parse(script.textContent));
        return jsonData.find(data => data['@type'] === 'Product') || null;
    });

    // Extract GTIN from JSON-LD or fallbacks
    let gtin = 'Not found';
    if (jsonLdData) {
        gtin = jsonLdData.gtin || jsonLdData.gtin13 || jsonLdData.gtin14 || jsonLdData.gtin8 || 'Not found';
    }

    if (gtin === 'Not found') {
        // Fallback: Search for GTIN in visible or meta content
        gtin = await page.evaluate(() => {
            const potentialBarcode = document.querySelector('[data-barcode]')?.textContent ||
                                     document.querySelector('meta[property="product:gtin"]')?.getAttribute('content') ||
                                     'Not found';
            return potentialBarcode.trim();
        });
    }

    // Log Results
    console.log({
        productTitle: jsonLdData?.name || 'Not found',
        gtin: gtin,
        jsonLdData: jsonLdData || 'No JSON-LD data found'
    });

    await browser.close();
})();
