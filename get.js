import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://discountmate_read_and_write:discountmate@discountmatecluster.u80y7ta.mongodb.net/?retryWrites=true&w=majority&appName=DiscountMateCluster',
        );
        console.log('Database connected');
        return conn;
    } catch (error) {
        console.log('Database connection error:', error.message);
        return null;
    }
};

const logCollections = async () => {
    try {
        // Connect to the database
        const connection = await dbConnect();

        if (!connection) {
            console.log('Failed to connect to the database');
            return;
        }

        // Access the database
        const db = mongoose.connection.db;

        const collection = db.collection('products');

        // Fetch all documents in the collection

        const products = await collection.find({}).toArray();

        if (products.length === 0) {
            console.log('The `products` collection is empty or no documents were found.');
        } else {
            console.log('Products in the `products` collection:');
            products.forEach((product, index) => {
                console.log(`${index + 1}.`, product);
            });
        }
        const collected_data = [{
            name: 'products',
        },{
            name: 'products2',
        }]
        insert_doc = collection.insertMany(collected_data)
        // Close the connection
        await connection.disconnect();
        console.log('Database connection closed.');
    } catch (error) {
        console.log('Error fetching collections:', error.message);
    }
};

// Call the function to log all collections
logCollections();
