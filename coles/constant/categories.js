const categories = [
//   {
//       category: "Baby",
//       subCategories: [
//           {
//               subCategory: "Baby Accessories",
//               childItems: [
//                   { extensionCategory: "Baby Bibs" },
//                   { extensionCategory: "Baby Health & Safety" },
//                   { extensionCategory: "Baby Teething & Soothers" },
//                   { extensionCategory: "Bath & Skincare" },
//                   { extensionCategory: "Bottles and Baby Feeding" },
//               ]
//           },
//           {
//               subCategory: "Baby Food",
//               childItems: [
//                   { extensionCategory: "Baby & Toddler Snacks" },
//               ]
//           },
//           {
//               subCategory: "Baby Formula",
//               childItems: [
//                   { extensionCategory: "Specialty" },
//               ]
//           },
//           {
//               subCategory: "Nappies Wipes",
//               childItems: [
//                   { extensionCategory: "Nappy Pants" },
//                   { extensionCategory: "Swimming Nappies" },
//               ]
//           },
//       ]
//   },
//   {
//       category: "Bakery",
//       subCategories: [
//         {
//             subCategory: "In-Store Bakery",
//             childItems: [
//                 { extensionCategory: "Bread Rolls" },
//                 { extensionCategory: "Donuts" },
//                 { extensionCategory: "Cookies" },
//             ]
//         },
//           {
//               subCategory: "Packaged Bread & Bakery",
//               childItems: [
//                   { extensionCategory: "Gluten Free Bakery" },
//                   { extensionCategory: "Packaged Bread" },
//                   { extensionCategory: "Pizza Bases" },
//               ]
//           },
//       ]
//   },
//   {
//       category: "Dairy, Eggs & Fridge",
//       subCategories: [
//         //   {
//         //       subCategory: "Cheese",
//         //       childItems: [
//         //           { extensionCategory: "Block Cheese" },
//         //           { extensionCategory: "Block Cheese" },
//         //           { extensionCategory: `Fetta & Goat's Cheese` },
//         //           { extensionCategory: "Snacking Cheese" },
//         //           { extensionCategory: "Sliced Cheese" },
//         //           { extensionCategory: "Soft Cheese" },
//         //       ]
//         //   },
//         //   {
//         //       subCategory: "Cream, Custard & Desserts",
//         //       childItems: [
//         //           { extensionCategory: "Cream" },
//         //           { extensionCategory: "Custard" },
//         //       ]
//         //   },
//         //   {
//         //       subCategory: "Dips & Pate",
//         //       childItems: [
//         //           { extensionCategory: "Dips" },
//         //           { extensionCategory: "Pate" },
//         //           { extensionCategory: "Paste" },
//         //       ]
//         //   },
//         //   {
//         //       subCategory: "Eggs, Butter & Margarine",
//         //       childItems: [
//         //           { extensionCategory: "Butter & Margarine" },
//         //           { extensionCategory: "Eggs" },
//         //       ]
//         //   },
//         //   {
//         //       subCategory: "Fresh Pasta & Sauces",
//         //       childItems: [
//         //           { extensionCategory: "Fresh Pasta & Noodles" },
//         //           { extensionCategory: "Pasta Sauces" },
//         //       ]
//         //   },
//           {
//               subCategory: "Milk",
//               childItems: [
//                   { extensionCategory: "Flavoured Milk" },
//                   { extensionCategory: "Full Cream Milk" },
//                   { extensionCategory: "Lactose Free Milk" },
//                   { extensionCategory: "Long Life Milk" },
//                   { extensionCategory: "Skim & Reduced Fat Milk" },
//               ]
//           },
//           {
//               subCategory: "Ready to Eat Meals",
//               childItems: [
//                   { extensionCategory: "Chilled Pizza & Bread" },
//                   { extensionCategory: "Chilled Ready Meals" },
//                   { extensionCategory: "Chilled Soup" },
//                   { extensionCategory: "Indian Meals" },
//                   { extensionCategory: "Italian Meals" },
//               ]
//           },
//           {
//               subCategory: "Vegetarian & Vegan",
//               childItems: [
//                   { extensionCategory: "Vegetarian & Meat Free" },
//               ]
//           },
//       ]
//   },
//   {
//       category: "Deli & Chilled Meats",
//       subCategories: [
//           {
//               subCategory: "Deli Meats",
//               childItems: [
//                   { extensionCategory: "Deli Poultry" },
//                   { extensionCategory: "Sliced & Shaved Deli Meat" },
//               ]
//           },
//           {
//               subCategory: "Deli Specialties",
//               childItems: [
//                   { extensionCategory: "Antipasto" },
//                   { extensionCategory: "Gourmet Cheese" },
//                   { extensionCategory: "Platters" },
//               ]
//           },
//           {
//               subCategory: "Ready to Eat Meals",
//               childItems: [
//                   { extensionCategory: "Chilled Quiches & Pies" },
//               ]
//           },
//       ]
//   },
//   {
//       category: "Drinks",
//       subCategories: [
//         //   {
//         //       subCategory: "Chilled Drinks",
//         //       childItems: [
//         //           { extensionCategory: "Soft Drinks" },
//         //           { extensionCategory: "Energy Drinks" },
//         //           { extensionCategory: "Chilled Water" },
//         //       ]
//         //   },
//         //   {
//         //       subCategory: "Coffee",
//         //       childItems: [
//         //           { extensionCategory: "Coffee Beans" },
//         //           { extensionCategory: "Coffee Capsules" },
//         //           { extensionCategory: "Ground Coffee" },
//         //           { extensionCategory: "Instant & Flavoured Coffee" },
//         //       ]
//         //   },
//         //   {
//         //       subCategory: "Cordials, Juices & Iced Teas",
//         //       childItems: [
//         //           { extensionCategory: "Chilled Juices" },
//         //           { extensionCategory: "Cordials" },
//         //           { extensionCategory: "Iced Teas" },
//         //       ]
//         //   },
//         //   {
//         //       subCategory: "Flavoured Milk",
//         //       childItems: [
//         //           { extensionCategory: "Drinking Chocolate" },
//         //           { extensionCategory: "Drinks & Powders" },
//         //           { extensionCategory: "Kids Milk" },
//         //       ]
//         //   },
//           {
//               subCategory: "Long Life Milk",
//               childItems: [
//                   { extensionCategory: "Almond Milk" },
//                   { extensionCategory: "Lactose Free Milk" },
//                   { extensionCategory: "Oat & Rice Milk" },
//                   { extensionCategory: "Powdered Milk" },
//                   { extensionCategory: "Soy Milk" },
//               ]
//           },
//           {
//               subCategory: "Soft Drinks",
//               childItems: [
//                   { extensionCategory: "Mixers" },
//                   { extensionCategory: "Soft Drink Bottles" },
//                   { extensionCategory: "Soft Drink Cans" },
//               ]
//           },
//           {
//               subCategory: "Sports & Energy Drinks",
//               childItems: [
//                   { extensionCategory: "Energy Drinks" },
//                   { extensionCategory: "Sports Drinks" },
//               ]
//           },
//           {
//               subCategory: "Tea",
//               childItems: [
//                   { extensionCategory: "Black Tea" },
//                   { extensionCategory: "Green Tea" },
//                   { extensionCategory: "Herbal & Specialty Tea" },
//               ]
//           },
//           {
//               subCategory: "Water",
//               childItems: [
//                   { extensionCategory: "Flavoured & Coconut Water" },
//                   { extensionCategory: "Sparkling Water" },
//                   { extensionCategory: "Still Water" },
//               ]
//           },
//       ]
//   },
//   {
//     category: 'Freezer',
//     subCategories: [
//         // {
//         //     subCategory: 'Chips & Wedges',
//         //     childItems: [
//         //     { extensionCategory: 'Chips' },
//         //     { extensionCategory: 'Hashbrowns' },
//         //     { extensionCategory: 'Wedges' },
//         //     ],
//         // },
//         // {
//         //     subCategory: 'Frozen Desserts',
//         //     childItems: [
//         //     { extensionCategory: 'Assorted Desserts' },
//         //     { extensionCategory: 'Cakes & Cheesecakes' },
//         //     { extensionCategory: 'Dessert Pies & Pastries' },
//         //     ],
//         // },
//         // {
//         //     subCategory: 'Frozen Fruit',
//         //     childItems: [
//         //     { extensionCategory: 'Berries' },
//         //     { extensionCategory: 'Tropical' },
//         //     ],
//         // },
//         // {
//         //     subCategory: "Frozen Meat",
//         //     childItems: [
//         //         { extensionCategory: "Chicken Pieces & Nuggets" },
//         //         { extensionCategory: "Whole Birds & Roasts" },
//         //     ]
//         // },
//         // {
//         //     subCategory: "Frozen Party Food",
//         //     childItems: [
//         //         { extensionCategory: "Pastry Sheets" },
//         //         { extensionCategory: "Pastries" },
//         //         { extensionCategory: "Pies & Quiches" },
//         //     ]
//         // },
//         // {
//         //     subCategory: "Frozen Pizzas",
//         //     childItems: [
//         //         { extensionCategory: "Pizzas" },
//         //     ]
//         // },
//         {
//             subCategory: "Frozen Seafood",
//             childItems: [
//                 { extensionCategory: "Fish Fillets" },
//                 { extensionCategory: "Fish Fingers & Cakes" },
//                 { extensionCategory: "Frozen Seafood" },
//             ]
//         },
//         {
//             subCategory: "Frozen Vegetables",
//             childItems: [
//                 { extensionCategory: "Beans" },
//                 { extensionCategory: "Peas" },
//                 { extensionCategory: "Corn" },
//                 { extensionCategory: "Mixed Vegetables" },
//                 { extensionCategory: "Other Vegetables" },
//                 { extensionCategory: "Steam Packs" },
//             ]
//         },
//         {
//             subCategory: "Ice Cream",
//             childItems: [
//                 { extensionCategory: "Frozen Yoghurt" },
//                 { extensionCategory: "Gelato & Sorbet" },
//                 { extensionCategory: "Ice Cream Sticks & Cones" },
//                 { extensionCategory: "Ice Cream Tubs" },
//                 { extensionCategory: "Premium Ice Cream" },
//             ]
//         },
//     ],
//   },
//   {
//     category: 'Fruit & Veg',
//     subCategories: [
//         // {
//         //     subCategory: "Fruit",
//         //     childItems: [
//         //         { extensionCategory: "Apples" },
//         //         { extensionCategory: "Pears" },
//         //         { extensionCategory: "Bananas" },
//         //         { extensionCategory: "Berries & Cherries" },
//         //         { extensionCategory: "Grapes" },
//         //         { extensionCategory: "Melons" },
//         //         { extensionCategory: "Mangoes" },
//         //         { extensionCategory: "Pineapples" },
//         //         { extensionCategory: "Kiwi Fruit" },
//         //         { extensionCategory: "Tropical & Exotic Fruit" },
//         //     ]
//         // },
//         // {
//         //     subCategory: "Organic",
//         //     childItems: [
//         //         { extensionCategory: "Organic Fruit" },
//         //         { extensionCategory: "Organic Vegetables" },
//         //     ]
//         // },
//         // {
//         //     subCategory: "Salad",
//         //     childItems: [
//         //         { extensionCategory: "Herbs" },
//         //         { extensionCategory: "Sprouts" },
//         //     ]
//         // },
//       {
//         subCategory: 'Vegetables',
//         childItems: [
//             // { extensionCategory: "Broccoli, Cauliflower & Cabbage" },
//             // { extensionCategory: "Capsicum & Mushrooms" },
//           { extensionCategory: "Onions & Leeks" },
//           { extensionCategory: 'Cucumber' },
//           { extensionCategory: 'Potatoes' },
//           { extensionCategory: 'Pumpkins' },
//           { extensionCategory: 'Tomatoes' },
//           { extensionCategory: 'Eggplant' },
//           { extensionCategory: 'Zucchini & Squash' },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Health & Beauty',
//     subCategories: [
//         // {
//         //     subCategory: "Cosmetics",
//         //     childItems: [
//         //         { extensionCategory: "Lips" },
//         //         { extensionCategory: "Nails" },
//         //     ]
//         // },
//         // {
//         //     subCategory: "Dental Care",
//         //     childItems: [
//         //         { extensionCategory: "Denture Care" },
//         //         { extensionCategory: "Floss & Mouthwash" },
//         //         { extensionCategory: "Toothbrushes" },
//         //         { extensionCategory: "Toothpaste" },
//         //     ]
//         // },
//         // {
//         //   subCategory: 'First Aid & Medicinal',
//         //   childItems: [
//         //     { extensionCategory: 'Antiseptic' },
//         //     { extensionCategory: 'Bandaids & Bandages' },
//         //     { extensionCategory: 'Cold, Flu & Allergies' },
//         //     { extensionCategory: 'Cotton Wool & Cotton Buds' },
//         //     { extensionCategory: 'Medicinal Oils & Ointments' },
//         //     { extensionCategory: 'Quit Smoking' },
//         //   ],
//         // },
//         // {
//         //   subCategory: 'Hair Care',
//         //   childItems: [
//         //     { extensionCategory: 'Colouring' },
//         //     { extensionCategory: 'Hair Accessories & Brushes' },
//         //     { extensionCategory: 'Mens Hair Care' },
//         //     { extensionCategory: 'Shampoo & Conditioner' },
//         //     { extensionCategory: 'Styling Products' },
//         //   ],
//         // },
//         // {
//         //     subCategory: 'Personal Care & Hygiene',
//         //     childItems: [
//         //       { extensionCategory: 'Contraception & Sexual Health' },
//         //       { extensionCategory: 'Female Deodorants & Body Sprays' },
//         //       { extensionCategory: 'Male Deodorants & Body Sprays' },
//         //         { extensionCategory: "Pregnancy Tests" },
//         //     ],
//         // },
//         {
//             subCategory: "Shaving & Hair Removal",
//             childItems: [
//                 // { extensionCategory: "After Shave Care" },
//                 { extensionCategory: "Shave Gel & Foam" },
//             ]
//         },
//         {
//             subCategory: "Skin Care",
//             childItems: [
//                 { extensionCategory: "Body Moisturiser" },
//                 { extensionCategory: "Face Moisturiser" },
//                 { extensionCategory: "183 Hand Moisturiser" },
//                 { extensionCategory: "Lip Care" },
//                 { extensionCategory: "Self-Tanning" },
//             ]
//         },
//         {
//             subCategory: "Vitamins",
//             childItems: [
//                 { extensionCategory: "Brain & Heart Health" },
//                 { extensionCategory: "Detox & Digestion" },
//                 { extensionCategory: "Hair, Skin & Nails" },
//                 { extensionCategory: "Others" },
//             ]
//         },
//     ],
//   },
//   {
//     category: 'Household',
//     subCategories: [
//     //   {
//     //     subCategory: 'Cleaning Goods',
//     //     childItems: [
//     //       { extensionCategory: "Bathroom Cleaners" },
//     //       { extensionCategory: "Disinfectant & Bleach" },
//     //       { extensionCategory: "Drain Cleaners & Solvents" },
//     //       { extensionCategory: 'Fabric, Metal & Furniture Care' },
//     //       { extensionCategory: 'Floor/Carpet Cleaners' },
//     //       { extensionCategory: 'Gloves' },
//     //       { extensionCategory: 'Kitchen Cleaners' },
//     //       { extensionCategory: 'Mops, Buckets & Brooms' },
//     //       { extensionCategory: 'Multipurpose Cleaners' },
//     //       { extensionCategory: 'Sponges, Cloths & Wipes' },
//     //       { extensionCategory: 'Window & Glass Cleaners' },
//     //     ],
//     //   },
//     //   {
//     //     subCategory: 'Homewares',
//     //     childItems: [{ extensionCategory: 'Water Filtration' }],
//     //   },
//     //   {
//     //     subCategory: 'Kitchen',
//     //     childItems: [{ extensionCategory: 'Sandwich & Freezer Bags' }],
//     //   },
//     //   {
//     //       subCategory: "Laundry",
//     //       childItems: [
//     //           { extensionCategory: "Fabric Softener" },
//     //           { extensionCategory: "Ironing" },
//     //           { extensionCategory: "Accessories" },
//     //           { extensionCategory: "Laundry Liquid" },
//     //           { extensionCategory: "Laundry Powder" },
//     //           { extensionCategory: "Pegs, Baskets & Hangers" },
//     //       ]
//     //   },
//       {
//           subCategory: "Parties & Entertaining",
//           childItems: [
//             //   { extensionCategory: "Candles" },
//               { extensionCategory: "Decorations" },
//           ]
//       },
//       {
//           subCategory: "Pest Control",
//           childItems: [
//               { extensionCategory: "Crawling Insects" },
//               { extensionCategory: "Flying Insects" },
//               { extensionCategory: "Garden Pests" },
//               { extensionCategory: "Mosquitoes" },
//               { extensionCategory: "Rodents" },
//           ]
//       },
//     ],
//   },
    {
        category: 'Pantry',
        subCategories: [
        // {
        //     subCategory: "Baking",
        //     childItems: [
        //         { extensionCategory: "Bread Mix" },
        //         { extensionCategory: "Cooking Chocolate & Cocoa" },
        //         { extensionCategory: "Flavouring, Essence & Food Colouring" },
        //         { extensionCategory: "Flour" },
        //         { extensionCategory: "Icing & Cake Decorating" },
        //         { extensionCategory: "Nuts, Seeds & Coconut" },
        //         { extensionCategory: "Sugar & Sweeteners" },
        //         { extensionCategory: "Dried Fruit" },
        //         { extensionCategory: "Pancake Mix" },
        //         { extensionCategory: "Yeast & Baking Ingredients" },
        //     ]
        // },
        // {
        //     subCategory: "Breakfast & Spreads",
        //     childItems: [
        //         { extensionCategory: "Breakfast Cereal" },
        //         { extensionCategory: "Honey" },
        //         { extensionCategory: "Jam" },
        //         { extensionCategory: "Savoury Spread" },
        //         { extensionCategory: "Muesli" },
        //         { extensionCategory: "Oats" },
        //     ]
        // },
        // {
        //     subCategory: "Canned Food & Instant Meals",
        //     childItems: [
        //         // { extensionCategory: "Baked Beans & Spaghetti" },
        //         // { extensionCategory: "Canned Beans & Legumes" },
        //         // { extensionCategory: "Canned Fruit" },
        //         // { extensionCategory: "Canned Meat" },
        //         // { extensionCategory: "Canned Salmon & Seafood" },
        //         // { extensionCategory: "Canned Soup & Soup Ingredients" },
        //         // { extensionCategory: "Canned Vegetables" },
        //         // { extensionCategory: "Instant Meals & Sides" },
        //         { extensionCategory: "Instant Noodles" },
        //     ]
        // },
        // {
        //     subCategory: "Condiments",
        //     childItems: [
        //         { extensionCategory: "Mayonnaise" },
        //         { extensionCategory: "Mustard" },
        //         { extensionCategory: "Pickled Vegetables" },
        //         { extensionCategory: "Salad Dressings" },
        //         { extensionCategory: "Sweet Chilli & Hot Sauce" },
        //         { extensionCategory: "Tomato & BBQ Sauce" },
        //     ]
        // },
        // {
        //     subCategory: "Desserts",
        //     childItems: [
        //         { extensionCategory: "Custard, Cream & Yoghurt" },
        //         { extensionCategory: "Ice Cream Cones, Syrups & Toppings" },
        //         { extensionCategory: "Jelly" },
        //         { extensionCategory: "Puddings" },
        //         { extensionCategory: "Ready to Freeze Ice Blocks" },
        //     ]
        // },
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
        //         { extensionCategory: "South African" },
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
        {
            subCategory: "Sauce, Oil & Vinegar",
            childItems: [
                // { extensionCategory: "Marinades & Seasoning" },
                // { extensionCategory: "Pizza & Pasta Sauce" },
                // { extensionCategory: "Soy & Asian Sauces" },
                // { extensionCategory: "Stock & Gravy" },
                { extensionCategory: "Sweet Chilli & Hot Sauce" },
            ]
        },
          {
              subCategory: "Snacks & Confectionery",
              childItems: [
                  { extensionCategory: "Biscuits & Cookies" },
                  { extensionCategory: "Chocolate Bars" },
                  { extensionCategory: "Chocolate Blocks" },
                  { extensionCategory: "Chocolate Box" },
                  { extensionCategory: "Corn Chips & Salsa" },
                  { extensionCategory: "Lollies" },
                  { extensionCategory: "Muesli Bars & Snack" },
              ]
          },
          {
              subCategory: "Tea & Coffee",
              childItems: [
                  { extensionCategory: "Black Tea" },
                  { extensionCategory: "Coffee Beans" },
                  { extensionCategory: "Coffee Capsules" },
                  { extensionCategory: "Green Tea" },
                  { extensionCategory: "Ground Coffee" },
                  { extensionCategory: "Herbal & Specialty Tea" },
              ]
          },
        ],
    },
    {
        category: "Pet",
        subCategories: [
            {
                subCategory: "Birds, Fish & Small Pets",
                childItems: [
                    { extensionCategory: "Bird Treats" },
                    { extensionCategory: "Small Pets Food" },
                ]
            },
            {
                subCategory: "Cat & Kitten",
                childItems: [
                    { extensionCategory: "Dry Cat Food" },
                    { extensionCategory: "Kitten Food" },
                ]
            },
            {
                subCategory: "Dog & Puppy",
                childItems: [
                    { extensionCategory: "Puppy Food" },
                ]
            },
        ]
    },
    {
        category: "Poultry, Meat & Seafood",
        subCategories: [
            {
                subCategory: "BBQ Meat & Seafood",
                childItems: [
                    { extensionCategory: "Burgers" },
                    { extensionCategory: "Sausages" },
                    { extensionCategory: "Kebabs" },
                ]
            },
            {
                subCategory: "Seafood",
                childItems: [
                    { extensionCategory: "Crab & Lobster" },
                    { extensionCategory: "Prepacked Seafood" },
                ]
            },
        ]
    },
];

export default categories;
