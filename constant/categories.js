const categories = [
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
    {
        category: "Bakery",
        subCategories: [
            /**
             * @commented because its done
             */
            {
                subCategory: "In-Store Bakery",
                childItems: [
                    { extensionCategory: "Bread Rolls" },
                    // Note: the extensionCategory must be "Donuts & Cookies"
                    { extensionCategory: "Donuts & Cookies" },
                    // { extensionCategory: "Donuts" },
                    // { extensionCategory: "Cookies" },
                ]
            },
            {
                subCategory: "Packaged Bread & Bakery",
                childItems: [
                    { extensionCategory: "Packaged Bread" },
                ]
            },
        ]
    },
    /**
     * @commented Done
     */
    {
        category: "Dairy, Eggs & Fridge",
        subCategories: [
            /**
             * @commented because its done
             */
            {
                subCategory: "Cheese",
                childItems: [
                    { extensionCategory: "Block Cheese" },
                    { extensionCategory: "Grated Cheese" },
                    { extensionCategory: "Sliced Cheese" },
                ]
            },
            /**
             * @commented because its done
             */
            {
                subCategory: "Cream, Custard & Desserts",
                childItems: [
                    { extensionCategory: "Cream" },
                    { extensionCategory: "Custard" },
                ]
            },
            /**
             * @commented because its done
             */
            {
                subCategory: "Dips & Pate",
                childItems: [
                    { extensionCategory: "Dips" },
                    // The extensionCategory should be "Pate, Paste & Caviar"
                    { extensionCategory: "Pate, Paste & Caviar" },
                    // { extensionCategory: "Pate" },
                    // { extensionCategory: "Paste" },
                ]
            },
            /**
             * @commented because its done
             */
            {
                subCategory: "Eggs, Butter & Margarine",
                childItems: [
                    { extensionCategory: "Butter & Margarine" },
                    { extensionCategory: "Eggs" },
                ]
            },
            /**
             * @commented because its done
             */
            {
                subCategory: "Fresh Pasta & Sauces",
                childItems: [
                    { extensionCategory: "Fresh Pasta & Noodles" },
                    { extensionCategory: "Pasta Sauces" },
                ]
            },
            // /**
            //  * @commented because its done
            //  */
            {
                subCategory: "Milk",
                childItems: [
                    { extensionCategory: "Long Life Milk" },
                    { extensionCategory: "Lactose Free Milk" },
                ]
            },
        ]
    },
    {
        category: "Deli & Chilled Meats",
        subCategories: [
            /**
             * @commented because its done
             */
            {
                subCategory: "Deli Meats",
                childItems: [
                    { extensionCategory: "Antipasto" },
                    { extensionCategory: "Deli Poultry" },
                ]
            },
            /**
             * @commented because its done
             */
            {
                subCategory: "Deli Specialties",
                childItems: [
                    { extensionCategory: "Gourmet Cheese" },
                    { extensionCategory: "Platters" },
                ]
            },
            /**
             * @commented because its done
             */
            {
                subCategory: "Ready to Eat Meals",
                childItems: [
                    { extensionCategory: "Chilled Quiches & Pies" },
                ]
            },
        ]
    },
    {
        category: "Drinks",
        subCategories: [
            /**
             * @commented because its done
             */
            {
                subCategory: "Coffee",
                childItems: [
                    { extensionCategory: "Coffee Beans" },
                    { extensionCategory: "Coffee Capsules" },
                    { extensionCategory: "Ground Coffee" },
                    { extensionCategory: "Instant & Flavoured Coffee" },
                ]
            },
        ]
    },
];

export default categories;