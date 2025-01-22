# Simple Scraper Project

This project is a simple web scraper built using Node.js and Puppeteer. It extracts data from a website, processes it, and saves the results into a JSON file. Perfect for beginners or anyone looking to automate web data extraction.

## Features

- Automates browsing using Puppeteer.
- Extracts and processes data from web pages.
- Saves scraped data to a JSON file.

---

## Requirements

1. **Node.js**: Ensure Node.js is installed on your system. [Download Node.js](https://nodejs.org/)

---

## Getting Started

Follow these steps to set up and run the scraper:

### 1. Install Node.js

- Download and install the latest version of Node.js from the [official website](https://nodejs.org/).

### 2. Clone or Download this Project

- Download or clone this repository to your local machine.

### 3. Install Dependencies

- Open a terminal in the project directory and run the following command:
  ```bash
  npm install
  ```

### 4. Environment Variables

- Create a .env file and locate it in the root of the project:
  ```env
  JARROD_KEY="API_KEY" //replace with the actual key
  JARROD_API="API_TO_BACKEND_SERVER" // replace with the actual API

  #COLES DB
  MONGO_COLES_URI="mongodb://127.0.0.1/coles_1-1-2025" // replace with the actual date

  #WOOLYDB
  MONGO_WOOLY_URI="mongodb://127.0.0.1/wooly_1-22-2025" // replace with the actual date
  ```

### 4. Start Scraping Woolworths website

- Before running the scraper for Woolworths, ensure to run only 9 objects inside of array by commenting out other lines of code in the `CATEGORIES` array. Which located inside of `woolworts/index.js`.

#### Example `CATEGORIES` Configuration:

```javascript
const CATEGORIES = [
  // Home & Lifestyle
  // { id: '1_792C364', name: 'Party Supplies', url: '/shop/browse/home-lifestyle/party-supplies', location: '/shop/browse/home-lifestyle/party-supplies' },
  // { id: '1_3D142C0', name: 'Clothing Accessories', url: '/shop/browse/home-lifestyle/clothing-accessories', location: '/shop/browse/home-lifestyle/clothing-accessories' },

  // Health & Wellness
  // { id: '1_67B032F', name: 'Vitamins', url: '/shop/browse/health-wellness/vitamins', location: '/shop/browse/health-wellness/vitamins' },
  // { id: '1_329A89C', name: 'First Aid & Medicinal', url: '/shop/browse/health-wellness/first-aid-medicinal', location: '/shop/browse/health-wellness/first-aid-medicinal' },

  // Beauty & Personal Care
  // { id: '1_877B999', name: 'Cosmetics', url: '/shop/browse/beauty-personal-care/cosmetics', location: '/shop/browse/beauty-personal-care/cosmetics' },
  // { id: '1_266FCD7', name: 'Skin Care', url: '/shop/browse/beauty-personal-care/skin-care', location: '/shop/browse/beauty-personal-care/skin-care' },
  // { id: '1_098A313', name: 'Hair Care', url: '/shop/browse/beauty-personal-care/hair-care', location: '/shop/browse/beauty-personal-care/hair-care' },

  // Pantry
  // { id: '1_8458E3A', name: 'Baking', url: '/shop/browse/pantry/baking', location: '/shop/browse/pantry/baking' },
  // { id: '1_C7A623D', name: 'Breakfast & Spreads', url: '/shop/browse/pantry/breakfast-spreads', location: '/shop/browse/pantry/breakfast-spreads' },
  // { id: '1_23C59D3', name: 'Canned Food & Instant Meals', url: '/shop/browse/pantry/canned-food-instant-meals', location: '/shop/browse/pantry/canned-food-instant-meals' },
  // { id: '1_F43CC25', name: 'Condiments', url: '/shop/browse/pantry/condiments', location: '/shop/browse/pantry/condiments' },
  // { id: '1_69A326C', name: 'Desserts', url: '/shop/browse/pantry/desserts', location: '/shop/browse/pantry/desserts' },
  // { id: '1_F779C5C', name: 'Herbs & Spices', url: '/shop/browse/pantry/herbs-spices', location: '/shop/browse/pantry/herbs-spices' },
  // { id: '1_53601CD', name: 'International Foods', url: '/shop/browse/pantry/international-foods', location: '/shop/browse/pantry/international-foods' },
  // { id: '1_B5F8608', name: 'Pasta, Rice & Grains', url: '/shop/browse/pantry/pasta-rice-grains', location: '/shop/browse/pantry/pasta-rice-grains' },
  // { id: '1_8A702B7', name: 'Tea & Coffee', url: '/shop/browse/pantry/tea-coffee', location: '/shop/browse/pantry/tea-coffee' },
  // { id: '1_0B44952', name: 'Long Life Milk', url: '/shop/browse/pantry/long-life-milk', location: '/shop/browse/pantry/long-life-milk' },

  // Cleaning and Maintenance
  // { id: "1_6174AF3", name: "Cleaning Goods", url: "/shop/browse/cleaning-maintenance/cleaning-goods", location: "/shop/browse/cleaning-maintenance/cleaning-goods" },
  // { id: "1_F364D22", name: "Garden & Outdoors", url: "/shop/browse/cleaning-maintenance/garden-outdoors", location: "/shop/browse/cleaning-maintenance/garden-outdoors" },
  // { id: '1_A2E3843', name: 'Kitchen', url: '/shop/browse/cleaning-maintenance/kitchen', location: '/shop/browse/cleaning-maintenance/kitchen' },
  // { id: '1_2F587AA', name: 'Laundry', url: '/shop/browse/cleaning-maintenance/laundry', location: '/shop/browse/cleaning-maintenance/laundry' },
  // { id: '1_AF39A7A', name: 'Pest Control', url: '/shop/browse/cleaning-maintenance/pest-control', location: '/shop/browse/cleaning-maintenance/pest-control' },

  { id: "1_8AF7215", name: "Hardware", url: "/shop/browse/cleaning-maintenance/hardware", location: "/shop/browse/cleaning-maintenance/hardware" },
  { id: "1_61D6FEB", name: "Pet", url: "/shop/browse/pet", location: "/shop/browse/pet" }, // Pet exceeds 10,000+ items; should be separated by subcategory
  { id: "1_ACA2FC2", name: "Freezer", url: "/shop/browse/freezer", location: "/shop/browse/freezer" },
  { id: "1-E5BEE36E", name: "Fruit & Veg", url: "/shop/browse/fruit-veg", location: "/shop/browse/fruit-veg" },
  { id: "1_D5A2236", name: "Poultry, Meat & Seafood", url: "/shop/browse/poultry-meat-seafood", location: "/shop/browse/poultry-meat-seafood" },
  { id: "1_DEB537E", name: "Bakery", url: "/shop/browse/bakery", location: "/shop/browse/bakery" },
  { id: "1_5AF3A0A", name: "Drinks", url: "/shop/browse/drinks", location: "/shop/browse/drinks" },
  { id: "1_3151F6F", name: "Deli & Chilled Meals", url: "/shop/browse/deli-chilled-meals", location: "/shop/browse/deli-chilled-meals" },
  { id: "1_6E4F4E4", name: "Dairy, Eggs & Fridge", url: "/shop/browse/dairy-eggs-fridge", location: "/shop/browse/dairy-eggs-fridge" },
];
```

- Run the following command to start scraping:

  ```bash
  node woolworths/index
  ```

- Once completed, retrieve all the data by running:
  ```bash
  node woolworths/getWoolyProducts.js
  ```

---

### 4. Start Scraping Coles website

- Before running the scraper for Coles, ensure to run only 23 Child Items by commenting out other lines of code in the `CATEGORIES` array. Which located inside of `coles/constant/categories.js`.

#### Example `CATEGORIES` Configuration:

```javascript
const CATEGORIES = [
 {
    category: 'Pantry',
    subCategories: [
      {
          subCategory: "Baking",
          childItems: [
              { extensionCategory: "Cooking Chocolate & Cocoa" },
              { extensionCategory: "Flavouring, Essence & Food Colouring" },
              { extensionCategory: "Flour" },
              { extensionCategory: "Icing & Cake Decorating" },
              { extensionCategory: "Nuts, Seeds & Coconut" },
              { extensionCategory: "Sugar & Sweeteners" },
              { extensionCategory: "Yeast & Baking Ingredients" },
          ]
      },
      {
          subCategory: "Breakfast & Spreads",
          childItems: [
              { extensionCategory: "Breakfast Cereal" },
              { extensionCategory: "Honey" },
              { extensionCategory: "Jam" },
              { extensionCategory: "Savoury Spread" },
              { extensionCategory: "Muesli" },
              { extensionCategory: "Oats" },
          ]
      },
      {
          subCategory: "Canned Food & Instant Meals",
          childItems: [
              { extensionCategory: "Baked Beans & Spaghetti" },
              { extensionCategory: "Canned Fruit" },
              { extensionCategory: "Canned Meat" },
              { extensionCategory: "Canned Soup & Soup Ingredients" },
              { extensionCategory: "Canned Vegetables" },
              { extensionCategory: "Instant Meals & Sides" },
          ]
      },
      {
          subCategory: "Condiments",
          childItems: [
              { extensionCategory: "Mustard" },
              { extensionCategory: "Sweet Chilli & Hot Sauce" },
              { extensionCategory: "Tomato & BBQ Sauce" },
          ]
      },
      {
          subCategory: "Desserts",
          childItems: [
              { extensionCategory: "Custard, Cream & Yoghurt" },
              { extensionCategory: "Ice Cream Cones, Syrups & Toppings" },
              { extensionCategory: "Jelly" },
              { extensionCategory: "Puddings" },
              // { extensionCategory: "Ready to Freeze Ice Blocks" },
          ]
      },
      // {
      //     subCategory: "Health Foods",
      //     childItems: [
      //         { extensionCategory: "Health Breakfast Food & Spread" },
      //         { extensionCategory: "Health Cooking & Pasta" },
      //         { extensionCategory: "Health Snacks & Drinks" },
      //     ]
      // },
      // {
      //     subCategory: "Herbs & Spices",
      //     childItems: [
      //         { extensionCategory: "Dried Herbs & Spices" },
      //         { extensionCategory: "Salt & Pepper" },
      //     ]
      // },
      // {
      //     subCategory: "International Foods",
      //     childItems: [
      //         { extensionCategory: "Asian" },
      //         { extensionCategory: "European" },
      //         { extensionCategory: "Indian" },
      //         { extensionCategory: "Mexican" },
      //         { extensionCategory: "Middle Eastern" },
      //         { extensionCategory: "UK Foods" },
      //     ]
      // },
      // {
      //     subCategory: "Pasta, Rice & Grains",
      //     childItems: [
      //         { extensionCategory: "Beans & Legumes" },
      //         { extensionCategory: "Rice" },
      //     ]
      // },
      // {
      //     subCategory: "Sauce, Oil & Vinegar",
      //     childItems: [
      //         { extensionCategory: "Marinades & Seasoning" },
      //         { extensionCategory: "Pizza & Pasta Sauce" },
      //         { extensionCategory: "Soy & Asian Sauces" },
      //         { extensionCategory: "Stock & Gravy" },
      //     ]
      // },
      //   {
      //       subCategory: "Snacks & Confectionery",
      //       childItems: [
      //           { extensionCategory: "Biscuits & Cookies" },
      //           { extensionCategory: "Corn Chips & Salsa" },
      //           { extensionCategory: "Muesli Bars & Snack" },
      //       ]
      //   },
      //   {
      //       subCategory: "Tea & Coffee",
      //       childItems: [
      //           { extensionCategory: "Black Tea" },
      //           { extensionCategory: "Green Tea" },
      //           { extensionCategory: "Herbal & Specialty Tea" },
      //       ]
      //   },
    ],
  }
]

```

- Run the following command to start scraping:
  ```bash
  node coles/index
  ```

- Once completed in coles, retrieve all the barcode for each product scraped in coles by running:
  ```bash
  node coles/ColesfetchBarcode.js
  ```

- Once completed in coles, retrieve all the data in coles by running:
  ```bash
  node coles/getProducts.js
  ```

---

## Notes

- Ensure the target website allows scraping and complies with its terms of service.
- Modify the scraper logic as needed to suit your requirements.

---

## License

This project is open-source and available for personal or educational use.
