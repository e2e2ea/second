const categories = [
    // {
    //     category: "Freezer",
    //     subCategories: [
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
    //     ]
    // },
    {
        category: "Fruit & Veg",
        subCategories: [
            /**
             * @commented because its done
             */
            // {
            //     subCategory: "Fruit",
            //     childItems: [
            //         { extensionCategory: "Apples & Pears" },
            //         { extensionCategory: "Bananas" },
            //         { extensionCategory: "Berries & Cherries" },
            //         { extensionCategory: "Grapes" },
            //         { extensionCategory: "Melons & Mangoes" },
            //         { extensionCategory: "Pineapples & Kiwi Fruit" },
            //         { extensionCategory: "Tropical & Exotic Fruit" },
            //     ]
            // },
            // {
            //     subCategory: "Organic",
            //     childItems: [
            //         { extensionCategory: "Organic Fruit" },
            //         { extensionCategory: "Organic Vegetables" },
            //     ]
            // },
            // {
            //     subCategory: "Salad",
            //     childItems: [
            //         { extensionCategory: "Herbs" },
            //         { extensionCategory: "Sprouts" },
            //     ]
            // },
            {
                subCategory: "Vegetables",
                childItems: [
                    // { extensionCategory: "Broccoli, Cauliflower & Cabbage" }, // done
                    { extensionCategory: "Capsicum & Mushrooms" }, // done
                    { extensionCategory: "Onions & Leeks" },// done
                    // { extensionCategory: "Cucumber" },
                    { extensionCategory: "Potatoes & Pumpkins" },
                    // { extensionCategory: "Tomatoes" },
                    { extensionCategory: "Zucchini, Eggplant & Squash" }, // done
                ]
            },
        ]
    },
    // {
    //     category: "Health & Beauty",
    //     subCategories: [
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Cosmetics",
    //             childItems: [
    //                 { extensionCategory: "Lips" }, // done
    //                 { extensionCategory: "Nails" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Dental Care",
    //             childItems: [
    //                 { extensionCategory: "Denture Care" }, // done
    //                 { extensionCategory: "Toothbrushes" }, // done
    //                 { extensionCategory: "Toothpaste" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "First Aid & Medicinal",
    //             childItems: [
    //                 { extensionCategory: "Antiseptic" },
    //                 { extensionCategory: "Cold, Flu & Allergies" }, // done
    //                 { extensionCategory: "Cotton Wool & Cotton Buds" }, // done
    //                 { extensionCategory: "Medicinal Oils & Ointments" }, // done
    //                 { extensionCategory: "Quit Smoking" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Hair Care",
    //             childItems: [
    //                 { extensionCategory: "Colouring" }, // done
    //                 { extensionCategory: "Hair Accessories & Brushes" }, // done
    //                 { extensionCategory: "Mens Hair Care" }, // done
    //                 { extensionCategory: "Shampoo & Conditioner" }, // done
    //                 { extensionCategory: "Styling Products" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Personal Care & Hygiene",
    //             childItems: [
    //                 { extensionCategory: "Contraception & Sexual Health" }, // done
    //                 { extensionCategory: "Female Deodorants & Body Sprays" }, // done
    //                 { extensionCategory: "Male Deodorants & Body Sprays" }, // done
    //                 { extensionCategory: "Pregnancy Tests" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Shaving & Hair Removal",
    //             childItems: [
    //                 { extensionCategory: "After Shave Care" }, // done
    //                 { extensionCategory: "Shave Gel & Foam" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Skin Care",
    //             childItems: [
    //                 { extensionCategory: "Body Moisturiser" }, // done
    //                 { extensionCategory: "Face Moisturiser" }, // done
    //                 { extensionCategory: "183 Hand Moisturiser" }, // done
    //                 { extensionCategory: "Lip Care" }, // done
    //                 { extensionCategory: "Self-Tanning" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Vitamins",
    //             childItems: [
    //                 { extensionCategory: "Brain & Heart Health" }, // done
    //                 { extensionCategory: "Detox & Digestion" }, // done
    //                 { extensionCategory: "Hair, Skin & Nails" }, // done
    //                 { extensionCategory: "Others" }, // done
    //             ]
    //         },
    //     ]
    // },
    // {
    //     category: "Household",
    //     subCategories: [
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Cleaning Goods",
    //             childItems: [
    //                 { extensionCategory: "Bathroom Cleaners" }, // done
    //                 { extensionCategory: "Disinfectant & Bleach" }, // done
    //                 { extensionCategory: "Drain Cleaners & Solvents" }, // done
    //                 { extensionCategory: "Fabric, Metal & Furniture Care" }, // done
    //                 { extensionCategory: "Floor/Carpet Cleaners" }, // done
    //                 { extensionCategory: "Gloves" },  // done
    //                 { extensionCategory: "Kitchen Cleaners" }, // done
    //                 { extensionCategory: "Mops, Buckets & Brooms" }, // done
    //                 { extensionCategory: "Multipurpose Cleaners" }, // done
    //                 { extensionCategory: "Sponges, Cloths & Wipes" }, // done
    //                 { extensionCategory: "Window & Glass Cleaners" },  // done
    //             ]
    //         },
    //         {
    //             subCategory: "Homewares",
    //             childItems: [
    //                 { extensionCategory: "Water Filtration" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Kitchen",
    //             childItems: [
    //                 { extensionCategory: "Sandwich & Freezer Bags" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Laundry",
    //             childItems: [
    //                 { extensionCategory: "Fabric Softener" }, // done
    //                 // 2 "Ironing & Accessories"
    //                 { extensionCategory: "Ironing" }, // done
    //                 { extensionCategory: "Accessories" }, // done
    //                 { extensionCategory: "Laundry Liquid" }, // done
    //                 { extensionCategory: "Laundry Powder" }, // done
    //                 { extensionCategory: "Pegs, Baskets & Hangers" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Parties & Entertaining",
    //             childItems: [
    //                 { extensionCategory: "Candles" }, // done
    //                 { extensionCategory: "Decorations" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Pest Control",
    //             childItems: [
    //                 { extensionCategory: "Crawling Insects" }, // done
    //                 { extensionCategory: "Flying Insects" }, // done
    //                 { extensionCategory: "Garden Pests" }, // done
    //                 { extensionCategory: "Mosquitoes" }, // done
    //                 { extensionCategory: "Rodents" }, // done
    //             ]
    //         },
    //     ]
    // },
    // {
    //     category: "Pantry",
    //     subCategories: [
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Baking",
    //             childItems: [
    //                 // { extensionCategory: "Cooking Chocolate & Cocoa" }, // done
    //                 // { extensionCategory: "Flavouring, Essence & Food Colouring" }, // done
    //                 // { extensionCategory: "Flour" }, // done
    //                 // { extensionCategory: "Icing & Cake Decorating" }, // done
    //                 { extensionCategory: "Nuts, Seeds & Coconut" }, // done
    //                 { extensionCategory: "Sugar & Sweeteners" }, // done
    //                 { extensionCategory: "Yeast & Baking Ingredients" }, // process1
    //             ]
    //         },
    //         {
    //             subCategory: "Breakfast & Spreads",
    //             childItems: [
    //                 // { extensionCategory: "Breakfast Cereal" }, // done
    //                 // { extensionCategory: "Honey" }, // done
    //                 // { extensionCategory: "Jam" }, // done
    //                 // { extensionCategory: "Savoury Spread" }, // done
    //                 // 2 "Muesli & Oats"
    //                 // { extensionCategory: "Muesli" }, // done
    //                 { extensionCategory: "Oats" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Canned Food & Instant Meals",
    //             childItems: [
    //                 { extensionCategory: "Baked Beans & Spaghetti" }, // done
    //                 { extensionCategory: "Canned Fruit" }, // done
    //                 { extensionCategory: "Canned Meat" }, // done
    //                 { extensionCategory: "Canned Soup & Soup Ingredients" }, // done
    //                 { extensionCategory: "Canned Vegetables" }, // done
    //                 { extensionCategory: "Instant Meals & Sides" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Condiments",
    //             childItems: [
    //                 { extensionCategory: "Mustard" }, // done
    //                 { extensionCategory: "Sweet Chilli & Hot Sauce" }, // done
    //                 { extensionCategory: "Tomato & BBQ Sauce" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Desserts",
    //             childItems: [
    //                 { extensionCategory: "Custard, Cream & Yoghurt" }, // done 
    //                 { extensionCategory: "Ice Cream Cones, Syrups & Toppings" }, // done
    //                 { extensionCategory: "Jelly" }, // done
    //                 { extensionCategory: "Puddings" }, // done
    //                 { extensionCategory: "Ready to Freeze Ice Blocks" }, // done // but this is exist in ice cream category
    //             ]
    //         },
    //         {
    //             subCategory: "Health Foods",
    //             childItems: [
    //                 { extensionCategory: "Health Breakfast Food & Spread" }, // done
    //                 { extensionCategory: "Health Cooking & Pasta" }, // done
    //                 { extensionCategory: "Health Snacks & Drinks" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Herbs & Spices",
    //             childItems: [
    //                 { extensionCategory: "Dried Herbs & Spices" }, // done
    //                 { extensionCategory: "Salt & Pepper" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "International Foods",
    //             childItems: [
    //                 { extensionCategory: "Asian" }, // done
    //                 { extensionCategory: "European" }, // done
    //                 { extensionCategory: "Indian" }, // done
    //                 { extensionCategory: "Mexican" }, // done
    //                 { extensionCategory: "Middle Eastern" }, // done
    //                 { extensionCategory: "UK Foods" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Pasta, Rice & Grains",
    //             childItems: [
    //                 { extensionCategory: "Beans & Legumes" }, // done
    //                 { extensionCategory: "Rice" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Sauce, Oil & Vinegar",
    //             childItems: [
    //                 { extensionCategory: "Marinades & Seasoning" }, // done
    //                 { extensionCategory: "Pizza & Pasta Sauce" }, // done
    //                 { extensionCategory: "Soy & Asian Sauces" }, // done
    //                 { extensionCategory: "Stock & Gravy" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Snacks & Confectionery",
    //             childItems: [
    //                 // { extensionCategory: "Biscuits & Cookies" }, // done
    //                 { extensionCategory: "Corn Chips & Salsa" }, // done
    //                 { extensionCategory: "Muesli Bars & Snack" }, // done
    //             ]
    //         },

    //         /**
    //          * @Note
    //          * 1. This product is already stored in the db.
    //          * 2. Product duplicate with different categories
    //          */
    //         // {
    //         //     subCategory: "Tea & Coffee",
    //         //     childItems: [
    //         //         { extensionCategory: "Black Tea" }, // 
    //         //         { extensionCategory: "Green Tea" }, // 
    //         //         { extensionCategory: "Herbal & Specialty Tea" }, // 
    //         //     ]
    //         // },
    //     ]
    // },
    // {
    //     category: "Pet",
    //     subCategories: [
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Birds, Fish & Small Pets",
    //             childItems: [
    //                 { extensionCategory: "Bird Treats" }, // done
    //                 { extensionCategory: "Small Pets Food" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Cat & Kitten",
    //             childItems: [
    //                 { extensionCategory: "Dry Cat Food" }, // done
    //                 { extensionCategory: "Kitten Food" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Dog & Puppy",
    //             childItems: [
    //                 { extensionCategory: "Puppy Food" }, // done
    //             ]
    //         },
    //     ]
    // },
    // {
    //     category: "Poultry, Meat & Seafood",
    //     subCategories: [

    //         /**
    //          * @commented because its done
    //          */
    //         // {
    //         //     subCategory: "BBQ Meat & Seafood",
    //         //     childItems: [
    //         //         // 2 "Burgers & Sausages"
    //         //         { extensionCategory: "Burgers & Sausages" }, // done
    //         //         { extensionCategory: "Sausages" }, // done
    //         //         { extensionCategory: "Kebabs" }, // done
    //         //     ]
    //         // },
    //         {
    //             subCategory: "Seafood",
    //             childItems: [
    //                 { extensionCategory: "Crab & Lobster" }, // done
    //                 { extensionCategory: "Prepacked Seafood" }, // 
    //             ]
    //         },
    //     ]
    // },
];

export default categories;