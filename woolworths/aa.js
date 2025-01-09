import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RateLimiter from '../RateLimit/index.js';
import fs from 'fs';
import mongoose from 'mongoose';

// Add stealth plugin
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: "C:\\Users\\OBI - Raymond\\AppData\\Local\\Google\\Chrome\\User Data2\\Profile 2",
    args: [
      '--start-maximized' // Start with the browser maximized
    ],
    defaultViewport: null
  });
  let page
  //  page = (await browser.newPage()).removeAllListeners('request');
   page = await browser.newPage();
  // //  const loadedCookies = JSON.parse(fs.readFileSync('./woolworths/cookies.json', 'utf-8'));
  // //   await page.setCookie(...loadedCookies);
  // //  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9');
   await page.setExtraHTTPHeaders({
    Referer: 'https://www.woolworths.com.au',
  });
  await page.goto('https://www.woolworths.com.au', { waitUntil: 'domcontentloaded', timeout: 50000 });
  // await page.setRequestInterception(true);
  // await page.setBypassCSP(true);
  while (true) {

    // Set a user agent to mimic a real browser
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    // await page.setExtraHTTPHeaders({
    //   Referer: 'https://www.woolworths.com.au/',
    // });
    // const cookies = await page.cookies();
    // await page.deleteCookie(...cookies);
    // Navigate to the target website
    const loadedCookies = JSON.parse(fs.readFileSync('./woolworths/cookies.json', 'utf-8'));
    await page.setCookie(...loadedCookies);
    await page.goto('https://www.woolworths.com.au', { waitUntil: 'domcontentloaded', timeout: 50000 });
    await delay(5000);

    await delay(5000);
    page.reload()
    await delay(5000);
    page.reload()
    await delay(5000);
    page.reload()
    // Optionally wait for a specific element to load
    await page.waitForSelector('h1');

    const cookies = await page.cookies();
    console.log('Extracted Cookies:', cookies);

    // Save cookies to a file or database (optional)
    fs.writeFileSync('./woolworths/cookies.json', JSON.stringify(cookies, null, 2));

    // Close the browser after extracting cookies
  }
  await browser.close();
  await delay(5000);
})();
