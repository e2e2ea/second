import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
puppeteer.use(StealthPlugin());
function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
(async () => {
    while (true) {
        const browser = await puppeteer.launch({ headless: false });

        const page = (await browser.newPage()).removeAllListeners('request');
        // await page.removeAllListeners('request');
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        );
        await page.setExtraHTTPHeaders({
            Referer: "https://www.woolworths.com.au/",
        });
        const loadedCookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
        await page.setCookie(...loadedCookies);
        await page.goto('https://woolworths.com.au');
        await page.waitForSelector('h1');

        const cookies = await page.cookies();
        fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
        console.log('Extracted Cookies done.');
        await delay(60000)
        browser.close()
    }
})();
