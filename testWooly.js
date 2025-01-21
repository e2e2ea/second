import dotenv from "dotenv";

dotenv.config();
import categories from "./woolworths/constant/categories.js";
import fs from "fs";
const normalizeDecimalPrice = (price, price_per_unit) => {
  const parsedPrice = parseFloat(price);

  if (!Number.isNaN(parsedPrice) && !Number.isInteger(parsedPrice)) {
    // If price is a decimal, normalize it and the price_per_unit
    return {
      price: Math.round(parsedPrice * 100), // Convert price to integer (cents)
      price_per_unit: Math.round(parseFloat(price_per_unit) / 100), // Normalize price_per_unit
    };
  }

  // Return original values if price is not decimal
  return { price, price_per_unit };
};
const getData = async () => {
  for (const categ of categories) {
    let category;
    category = categ.category;
    if (category === "Deli & Chilled Meals") category = "Deli & Chilled Meats";
    if (category === "Health & Wellness") category = "Health & Beauty";
    if (category === "Beauty & Personal Care") category = "Health & Beauty";
    if (category === "Home & Lifestyle") category = "Household";
    if (category === "Cleaning & Maintenance") category = "Household";

    for (const sub of categ.subCategories) {
      const subCategory = sub.subCategory;
      for (const ext of sub.childItems) {
        const extensionCategory = ext.extensionCategory
          ? ext.extensionCategory
          : "";
        let woolworthsData;
        const filePath = `woolworths/data/1-21-2025/${category}/${category} - ${subCategory} - ${extensionCategory}.json`;
        try {
          woolworthsData = JSON.parse(
            fs.readFileSync(
              `woolworths/data/1-21-2025/${category}/${category} - ${subCategory} - ${extensionCategory}.json`,
              "utf8"
            )
          );
        } catch (error) {
          console.log(
            `Skipping ${category} - ${subCategory} - ${extensionCategory}: File(s) missing.`
          );
          continue;
        }

        for (const data of woolworthsData) {
          for (const price of data.prices) {
            if (price && price.state) {
              // Normalize only decimal prices
              const normalized = normalizeDecimalPrice(
                price.price,
                price.price_per_unit
              );

              // Update only when price is decimal
              price.price = normalized.price;
              price.price_per_unit = normalized.price_per_unit;
            }
          }
        }
        try {
          fs.writeFileSync(
            filePath,
            JSON.stringify(woolworthsData, null, 2), // Pretty-print the JSON
            "utf8"
          );
        } catch (error) {
          console.error("Error writing data to file:", error);
        }
      }
    }
  }
};

(async () => {
  await getData();
})();
