import locations from './constant/location.js'
const meme = () => {
    for (const loc of locations) {
        meme2(loc)
    }
}
const meme2 = () => {
    const subCategory = "Dairy, Eggs & Fridge";
    const updatedSubCategory = subCategory
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace one or more spaces with a single hyphen
        .replace(/-+/g, '-'); // Remove consecutive hyphens
    console.log('updatedCategory', updatedSubCategory)
}
(async () => {
    await meme2();
})();