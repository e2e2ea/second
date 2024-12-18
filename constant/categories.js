const categories = [
    /**
     * @commented Baby Done
     */
    // {
    //     category: "Baby",
    //     subCategories: [
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Baby Accessories",
    //             childItems: [
    //                 { extensionCategory: "Baby Health & Safety" },
    //                 // { extensionCategory: "Bath & Skincare" }, // found but different api https://www.coles.com.au/browse/baby/bath-skincare
    //             ]
    //         },
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Baby Formula",
    //             childItems: [
    //                 { extensionCategory: "Specialty" },
    //             ]
    //         },
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Nappies Wipes",
    //             childItems: [
    //                 { extensionCategory: "Nappy Pants" },
    //                 { extensionCategory: "Swimming Nappies" },
    //             ]
    //         },
    //     ]
    // },
    /**
     * @commented Bakery Done
     */
    // {
    //     category: "Bakery",
    //     subCategories: [
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "In-Store Bakery",
    //             childItems: [
    //                 { extensionCategory: "Bread Rolls" },
    //                 // Note: the extensionCategory must be "Donuts & Cookies"
    //                 { extensionCategory: "Donuts" },
    //                 { extensionCategory: "Cookies" },
    //             ]
    //         },
    //         {
    //             subCategory: "Packaged Bread & Bakery",
    //             childItems: [
    //                 { extensionCategory: "Packaged Bread" },
    //             ]
    //         },
    //     ]
    // },
    /**
     * @commented Bakery Done
     */
    // {
    //     category: "Dairy, Eggs & Fridge",
    //     subCategories: [
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Cheese",
    //             childItems: [
    //                 { extensionCategory: "Block Cheese" },
    //                 { extensionCategory: "Grated Cheese" },
    //                 { extensionCategory: "Sliced Cheese" },
    //             ]
    //         },
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Cream, Custard & Desserts",
    //             childItems: [
    //                 { extensionCategory: "Cream" },
    //                 { extensionCategory: "Custard" },
    //             ]
    //         },
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Dips & Pate",
    //             childItems: [
    //                 { extensionCategory: "Dips" },
    //                 // The extensionCategory should be "Pate, Paste & Caviar"
    //                 // { extensionCategory: "Pate, Paste & Caviar" },
    //                 { extensionCategory: "Pate" },
    //                 { extensionCategory: "Paste" },
    //             ]
    //         },
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Eggs, Butter & Margarine",
    //             childItems: [
    //                 { extensionCategory: "Butter & Margarine" },
    //                 { extensionCategory: "Eggs" },
    //             ]
    //         },
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Fresh Pasta & Sauces",
    //             childItems: [
    //                 { extensionCategory: "Fresh Pasta & Noodles" },
    //                 { extensionCategory: "Pasta Sauces" },
    //             ]
    //         },
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Milk",
    //             childItems: [
    //                 { extensionCategory: "Long Life Milk" },
    //                 { extensionCategory: "Lactose Free Milk" },
    //             ]
    //         },
    //     ]
    // },
    /**
     * @commented Bakery Done
     */
    // {
    //     category: "Deli & Chilled Meats",
    //     subCategories: [
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Deli Meats",
    //             childItems: [
    //                 { extensionCategory: "Antipasto" },
    //                 { extensionCategory: "Deli Poultry" },
    //             ]
    //         },
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Deli Specialties",
    //             childItems: [
    //                 { extensionCategory: "Gourmet Cheese" },
    //                 { extensionCategory: "Platters" },
    //             ]
    //         },
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Ready to Eat Meals",
    //             childItems: [
    //                 { extensionCategory: "Chilled Quiches & Pies" },
    //             ]
    //         },
    //     ]
    // },
    /**
     * @commented Bakery Done
     */
    // {
    //     category: "Drinks",
    //     subCategories: [
    //         {
    //             subCategory: "Chilled Drinks",
    //             childItems: [
    //                 // this 2 will be "Chilled Soft Drinks & Energy Drinks"
    //                 { extensionCategory: "Chilled Soft Drinks & Energy Drinks" },
    //                 // { extensionCategory: "Soft Drinks" },
    //                 // { extensionCategory: "Energy Drinks" },
    //                 { extensionCategory: "Chilled Water" },
    //             ]
    //         },
    //         {
    //             subCategory: "Coffee",
    //             childItems: [
    //                 { extensionCategory: "Coffee Beans" },
    //                 { extensionCategory: "Coffee Capsules" },
    //                 { extensionCategory: "Ground Coffee" }, 
    //                 { extensionCategory: "Instant & Flavoured Coffee" },
    //             ]
    //         },
    //         {
    //             subCategory: "Cordials, Juices & Iced Teas",
    //             childItems: [
    //                 { extensionCategory: "Chilled Juices" },
    //                 { extensionCategory: "Cordials" },
    //                 { extensionCategory: "Iced Teas" },
    //             ]
    //         },
    //         {
    //             subCategory: "Flavoured Milk",
    //             childItems: [
    //                 { extensionCategory: "Drinking Chocolate" },
    //                 { extensionCategory: "Drinks & Powders" },
    //                 { extensionCategory: "Kids Milk" },
    //             ]
    //         },
    //         {
    //             subCategory: "Long Life Milk",
    //             childItems: [
    //                 { extensionCategory: "Almond Milk" },
    //                 { extensionCategory: "Lactose Free Milk" },
    //                 { extensionCategory: "Oat & Rice Milk" },
    //                 { extensionCategory: "Powdered Milk" },
    //                 { extensionCategory: "Soy Milk" },
    //             ]
    //         },
    //         {
    //             subCategory: "Soft Drinks",
    //             childItems: [
    //                 { extensionCategory: "Mixers" },
    //                 { extensionCategory: "Soft Drink Bottles" },
    //                 { extensionCategory: "Soft Drink Cans" },
    //             ]
    //         },
    //         {
    //             subCategory: "Sports & Energy Drinks",
    //             childItems: [
    //                 { extensionCategory: "Energy Drinks" },
    //                 { extensionCategory: "Sports Drinks" },
    //             ]
    //         },
    //         {
    //             subCategory: "Tea",
    //             childItems: [
    //                 { extensionCategory: "Black Tea" },
    //                 { extensionCategory: "Green Tea" },
    //                 { extensionCategory: "Herbal & Specialty Tea" },
    //             ]
    //         },
    //         {
    //             subCategory: "Water",
    //             childItems: [
    //                 { extensionCategory: "Flavoured & Coconut Water" },
    //                 { extensionCategory: "Sparkling Water" },
    //                 { extensionCategory: "Still Water" },
    //             ]
    //         },
    //     ]
    // },
    {
        category: "Freezer",
        subCategories: [
            /**
             * @commented because its done
             */
            // {
            //     subCategory: "Frozen Desserts",
            //     childItems: [
            //         { extensionCategory: "Assorted Desserts" },
            //         { extensionCategory: "Cakes & Cheesecakes" },
            //         { extensionCategory: "Dessert Pies & Pastries" }, // done here // but try check this url because the value is 0
            //     ]
            // },
            // {
            //     subCategory: "Frozen Fruit",
            //     childItems: [
            //         // 2 extension must be Berries & Tropical
            //         { extensionCategory: "Berries" }, // done
            //         { extensionCategory: "Tropical" }, // done
            //     ]
            // },
            {
                subCategory: "Frozen Meat",
                childItems: [
                    // { extensionCategory: "Chicken Pieces & Nuggets" }, // done
                    { extensionCategory: "Whole Birds & Roasts" }, // process
                ]
            },
            // {
            //     subCategory: "Frozen Party Food",
            //     childItems: [
            //         { extensionCategory: "Pastry Sheets" }, // done
            //         // this 2 main extCategory "Pies, Pastries & Quiches"
            //         { extensionCategory: "Pastries" }, // done here
            //         { extensionCategory: "Pies & Quiches" }, // done
            //     ]
            // },
            // {
            //     subCategory: "Frozen Pizzas",
            //     childItems: [
            //         { extensionCategory: "Pizzas" }, // done
            //     ]
            // },
            // {
            //     subCategory: "Frozen Seafood",
            //     childItems: [
            //         { extensionCategory: "Fish Fillets" }, // done
            //         { extensionCategory: "Fish Fingers & Cakes" }, // done
            //         { extensionCategory: "Frozen Seafood" }, // done
            //     ]
            // },
            // {
            //     subCategory: "Frozen Vegetables",
            //     childItems: [
            //         // this 2 is "Beans & Peas"
            //         { extensionCategory: "Beans" },
            //         { extensionCategory: "Peas" },
            //         { extensionCategory: "Corn" },
            //         { extensionCategory: "Mixed Vegetables" },
            //         { extensionCategory: "Other Vegetables" },
            //         { extensionCategory: "Steam Packs" },
            //     ]
            // },
            // {
            //     subCategory: "Ice Cream",
            //     childItems: [
            //         { extensionCategory: "Frozen Yoghurt" },
            //         { extensionCategory: "Gelato & Sorbet" },
            //         { extensionCategory: "Ice Cream Sticks & Cones" },
            //         { extensionCategory: "Ice Cream Tubs" },
            //         { extensionCategory: "Premium Ice Cream" },
            //     ]
            // },
        ]
    },
    // {
    //     category: "Fruit & Veg",
    //     subCategories: [
    //         /**
    //          * @commented because its done
    //          */
    //         {
    //             subCategory: "Fruit",
    //             childItems: [
    //                 // this 2 "Apples & Pears"
    //                 { extensionCategory: "Apples" }, // done
    //                 { extensionCategory: "Pears" }, // done
    //                 { extensionCategory: "Bananas" }, // done
    //                 { extensionCategory: "Berries & Cherries" }, // done
    //                 { extensionCategory: "Grapes" }, // done
    //                 // this 2 "Melons & Mangoes"
    //                 { extensionCategory: "Melons" }, //done
    //                 { extensionCategory: "Mangoes" }, //done
    //                 // this 2 "Pineapples & Kiwi Fruit"
    //                 { extensionCategory: "Pineapples" }, //done
    //                 { extensionCategory: "Kiwi Fruit" }, //done
    //                 { extensionCategory: "Tropical & Exotic Fruit" }, // done
    //             ]
    //         },
    //         {
    //             subCategory: "Organic",
    //             childItems: [
    //                 { extensionCategory: "Organic Fruit" }, //done
    //                 { extensionCategory: "Organic Vegetables" }, //done
    //             ]
    //         },
    //         {
    //             subCategory: "Salad",
    //             childItems: [
    //                 { extensionCategory: "Herbs" }, //done
    //                 { extensionCategory: "Sprouts" }, //done
    //             ]
    //         },
    //         {
    //             subCategory: "Vegetables",
    //             childItems: [
    //                 { extensionCategory: "Broccoli, Cauliflower & Cabbage" }, // done
    //                 { extensionCategory: "Capsicum & Mushrooms" }, // done
    //                 { extensionCategory: "Onions & Leeks" },// done
    //                 { extensionCategory: "Cucumber" },
    //                 // // this 2 "Potatoes & Pumpkins"
    //                 { extensionCategory: "Potatoes" },
    //                 { extensionCategory: "Pumpkins" },

    //                 { extensionCategory: "Tomatoes" },
    //                 // // this 2 "Zucchini, Eggplant & Squash"
    //                 { extensionCategory: "Eggplant" }, // done
    //                 { extensionCategory: "Zucchini & Squash" }, // done
    //             ]
    //         },
    //     ]
    // },
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