import puppeteer from 'puppeteer';
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    request.continue();
  });

  // Capture responses
  page.on('response', async (response) => {
    const url = response.url();

    if (url.includes('coles.com.au')) {
      // Adjust for the correct API pattern
      try {
        const jsonResponse = await response.json();
        console.log(`🔹 API Response from ${url}:`, jsonResponse);
      } catch (error) {
        // console.log(`🔸 Non-JSON response from ${url}`);
      }
    }
  });
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await page.goto('https://www.coles.com.au/browse/deli'); // Update URL to the product page
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await delay(15000);
  await page.waitForTimeout(10000); // Allow time for data to load

  await browser.close();
})();
