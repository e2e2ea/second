function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const safeNavigate = async (page, url, retries = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      // await page.goto(url, { waitUntil: 'networkidle2', timeout: 50000 });
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 50000 });
      // const cookies = await page.cookies();
      // await page.deleteCookie(...cookies);
      return;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed: ${error}`);
      if (i === retries - 1) throw error;
      await delay(2000);
    }
  }
};

export default safeNavigate;
