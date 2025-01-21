import dotenv from "dotenv";

dotenv.config();
import categories from "./constant/copy.js";
import fs from "fs";
import path from "path";
import { search } from "fast-fuzzy";

// const fuzzyMatcher = new fuzzy();

const getData = async () => {
  let totalProducts = 0;

  for (const categ of categories) {
    const category = categ.category;

    for (const sub of categ.subCategories) {
      const subCategory = sub.subCategory;

      for (const ext of sub.childItems) {
        const extensionCategory = ext.extensionCategory ? ext.extensionCategory : "";
        let productsMatched = [];
        let woolworthsData;
        let ColesData;

        try {
          woolworthsData = JSON.parse(fs.readFileSync(`woolworths/data/1-21-2025/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, "utf8"));
          ColesData = JSON.parse(fs.readFileSync(`coles/data/1-21-2025/${category}/${category} - ${subCategory} - ${extensionCategory}.json`, "utf8"));
        } catch (error) {
          continue;
        }
        const filteredColesData = ColesData.filter((p) => !p.barcode);
        const filteredwoolworthsData = woolworthsData.filter((p) => !p.barcode);
        // console.log('filteredColesData', filteredColesData.length, `coles/data/1-21-2025/${category}/${category} - ${subCategory} - ${extensionCategory}.json`)

        // Match Woolworths data against Coles data
        for (const data of filteredwoolworthsData) {
          //   if (data.barcode) continue;

          const a = search(data.name, filteredColesData, { keySelector: (obj) => obj.name, returnMatchData: true });
          if (a) console.log("a", a[0]);
          if (a.length > 0) {
            // Get the best match
            // fuzzyResults.forEach((result) => {
            //   console.log(`Matched: ${data.name} with ${result.item.name} | Score: ${result.score}`);
            // });
            const bestMatch = a[0].item;

            // Format the matched products
            const formattedProduct1 = {
              source_url: bestMatch.source_url || null,
              name: bestMatch.name || null,
              image_url: bestMatch.image_url || null,
              source_id: bestMatch.source_id || null,
              barcode: bestMatch.barcode || null,
              shop: bestMatch.shop || null,
              category_id: bestMatch.category_id,
              weight: bestMatch.weight || null,
              prices: bestMatch.prices,
            };

            const formattedProduct2 = {
              source_url: data.source_url || null,
              name: data.name || null,
              image_url: data.image_url || null,
              source_id: data.source_id || null,
              barcode: data.barcode || null,
              shop: data.shop || null,
              category_id: data.category_id,
              weight: data.weight || null,
              prices: data.prices,
            };

            productsMatched.push(formattedProduct1);
            productsMatched.push(formattedProduct2);
          }
        }

        // Save matched products to file
        try {
          if (productsMatched.length > 0) {
            totalProducts += productsMatched.length;

            const baseFolder = `./similar/1-17-2025`;
            const folderPath = path.join(baseFolder, `${category}`);
            const fileName = `${category} - ${subCategory} - ${extensionCategory}.json`;
            const filePath = path.join(folderPath, fileName);

            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath, { recursive: true });
              console.log(`Created folder: ${folderPath}`);
            }

            fs.writeFileSync(filePath, JSON.stringify(productsMatched, null, 2));
            console.log(`Data saved to ${filePath}`);
          }
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
