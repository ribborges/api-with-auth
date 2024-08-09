import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri!, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Connect to the MongoDB database
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Setup the database
async function setupDB() {
    try {
        // Connect to the MongoDB database (and create if it doesn't exist)
        const database = client.db('api-db');

        // Create a collection if it doesn't exist
        await database.createCollection('user');
        console.log('User collection created');

        console.log('Database setup completed');
    } catch (error) {
        console.error('Error setting up database: ', error);
    }
}

export { uri, client, connectDB, setupDB };