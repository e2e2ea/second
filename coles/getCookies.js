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
    let page;
    while (true) {
      await delay(10000);
      page = (await browser.newPage()).removeAllListeners('request');
      // await page.removeAllListeners('request');
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
      // await page.setExtraHTTPHeaders({
      //   Referer: 'https://www.coles.com.au/',
      // });
      // const cookies = await page.cookies();
      // await page.deleteCookie(...cookies);
      // const loadedCookies = JSON.parse(fs.readFileSync('./coles/colesCookies.json', 'utf-8'));
      // await page.setCookie(...loadedCookies);
      await page.goto('https://coles.com.au');
      await delay(10000);
      await page.waitForSelector('h1');
      await page.reload();

      const cookiesCraft = await page.cookies();
      fs.writeFileSync('./coles/colesCookies.json', JSON.stringify(cookiesCraft, null, 2));
      console.log('Extracted Cookies done.');
      // browser.close()
      await page.close();
      await delay(15000);
    }
  }
})();
