function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const safeNavigate = async (page, url, retries = 500) => {
  for (let i = 0; i < retries; i++) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
      return;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed: ${error}`);
      if (i === retries - 1) throw error;
      await delay(5000);
    }
  }
};

export default safeNavigate;
