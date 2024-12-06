import fs from 'fs';

const filePath = './woolworths/Deli & Chilled Meals-Deli Specialties-Antipasto.json';
const filePath2 = 'productsWoolWorths-deli.json';

try {
    // Step 1: Read the JSON file
    const data = fs.readFileSync(filePath, 'utf-8');
    const data2 = fs.readFileSync(filePath2, 'utf-8');

    // Step 2: Parse JSON data into a JavaScript object
    const products = JSON.parse(data);
    const products2 = JSON.parse(data2);
    // Example: Update the name of the first product (adjust field names as necessary)
    for (const product of products) {
        const matched = products2.find((prod) => prod.retailer_product_id.toString() === product.woolworths_product_id.toString());
        console.log('matched', matched)
        // If a match is found, update the barcode
        if (matched) {
            product.barcode = matched.barcode;
        }
    }

    // Step 4: Write the updated object back to the file
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');

    console.log('JSON file updated successfully!');
} catch (error) {
    console.error('Error updating the JSON file:', error.message);
}

