import waitForElement from './waitForElement.js';

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const handleSteps = async (page, loc) => {
  let retries
  retries = 1000
  for (let i = 0; i < retries; i++) {
    try {
      const a = await step1(page);
      if (!a) {
        console.log('Retrying step 1...');
        return handleSteps(page, loc); // Retry handleSteps if step1 fails
      }
      await delay(2000)
      if (!loc || loc.location !== 'Chadstone Shopping Centre, 1341 Dandenong Road, MALVERN EAST VIC 3145') {
        const b = await step2(page);
        if (!b) {
          console.log('Retrying step 2...');
          return handleSteps(page, loc); // Retry handleSteps if step2 fails
        }
        await delay(2000)

        const c = await step3(page, loc);
        if (!c) {
          console.log('Retrying step 3...');
          return handleSteps(page, loc); // Retry handleSteps if step3 fails
        }
        await delay(1000);

        const d = await step4(page, loc);
        if (!d) {
          console.log('Retrying step 4...');
          return handleSteps(page, loc); // Retry handleSteps if step4 fails
        }
        await delay(2000)

        const e = await step5(page, loc);
        if (!e) {
          console.log('Retrying step 5...');
          return handleSteps(page, loc); // Retry handleSteps if step5 fails
        }
        await delay(2000)
      }

      if (loc && loc.location === 'Chadstone Shopping Centre, 1341 Dandenong Road, MALVERN EAST VIC 3145') {
        const c = await step3(page, loc);
        if (!c) {
          console.log('Retrying step 3...');
          return handleSteps(page, loc); // Retry handleSteps if step3 fails
        }
        await delay(5000)
        const d = await step4(page, loc);
        if (!d) {
          console.log('Retrying step 4...');
          return handleSteps(page, loc); // Retry handleSteps if step4 fails
        }
        await delay(8000)
      }

      const f = await step6(page);
      if (!f) {
        console.log('Retrying step 6...');
        return handleSteps(page, loc); // Retry handleSteps if step6 fails
      }
      await delay(2000)
      return { success: true, status: 201 };
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(5000);
    }
  }
};

const step1 = async (page) => {
  const drawerButtonSelector = '#delivery-selector-button';
  await waitForElement(page, drawerButtonSelector, { visible: true });
  await page.click(drawerButtonSelector);
  console.log('Drawer opened.');
  return true; // Return true when the step succeeds
};

const step2 = async (page) => {
  const clickCollectButtonSelector = 'button[data-testid="tab-collection"]';
  const a = await waitForElement(page, clickCollectButtonSelector, { visible: true });
  if (!a) return false;
  await page.click(clickCollectButtonSelector);
  // console.log('Clicked on the "Click & Collect" button.');
  return true; // Return true if the step succeeded
};

const step3 = async (page, loc) => {
  let searchInputSelector
  if (loc.location === 'Chadstone Shopping Centre, 1341 Dandenong Road, MALVERN EAST VIC 3145') {
    searchInputSelector = '#street-address-autocomplete';
  } else {
    searchInputSelector = '#suburb-postcode-autocomplete';
  }
  // console.log('in case 1: ', loc)
  const location = loc.location.split(' ')[0].replace(/[^a-zA-Z0-9]/g, ''); // Replace with the actual location

  const a = await waitForElement(page, searchInputSelector, { visible: true });
  if (!a) return false;
  await page.focus(searchInputSelector);
  await page.type(searchInputSelector, location, { delay: 500 });
  // console.log(`Typed location: ${location}`);
  return true; // Return true if the step succeeded
};

const step4 = async (page, loc) => {
  const a = await waitForElement(page, 'div.MuiAutocomplete-popper', { visible: true });
  if (!a) return false;
  const optionName = loc.location;

  const specificOptionSelector = `li[role="option"]`;
  try {
    const options = await page.$$(specificOptionSelector);
    for (let option of options) {
      const text = await option.evaluate((el) => el.textContent.trim());
      if (text === optionName) {
        await option.click();
        // console.log(`Clicked on "${optionName}" suggestion.`);
        return true;
      }
    }
  } catch (error) {
    console.error(`Failed to click on "${optionName}" option:`, error);
  }
};

const step5 = async (page, loc) => {
  const subLocation = loc.subLucation;

  const a = await waitForElement(page, 'div[role="radiogroup"]', { visible: true });
  if (!a) return false;
  try {
    const options = await page.$$('div.coles-targeting-CardRadioContainer');
    // console.log('Available Options:');
    for (let option of options) {
      const text = await option.evaluate((el) => el.textContent.trim());
      // console.log(text);
    }

    let clicked = false;
    for (let option of options) {
      const text = await option.evaluate((el) => el.textContent.trim());
      if (text.includes(subLocation)) {
        await option.click();
        // console.log(`Clicked on sub-location: "${subLocation}"`);
        clicked = true;
        return true;
      }
    }

    if (!clicked) {
      throw new Error(`Sub-location "${subLocation}" not found.`);
    }
  } catch (error) {
    console.error(`Failed to click on sub-location: "${subLocation}"`, error);
  }
};

const step6 = async (page) => {
  const a = await waitForElement(page, 'button[data-testid="cta-secondary"]', { visible: true });
  if (!a) return false;
  await page.click('button[data-testid="cta-secondary"]');
  // console.log('Clicked the "Set location" button.');
  return true
};

export default handleSteps;
