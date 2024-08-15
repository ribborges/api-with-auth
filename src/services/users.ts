import { ObjectId } from 'mongodb';
import { client, closeDB, connectDB, dbName } from "database/db";

const collectionName = 'user';

const getUsers = async () => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const users = await collection.find({}, { projection: { authentication: 0 } }).toArray();

        console.log('Users:', users);
        return users; // Returns an array of user documents
    } catch (error) {
        console.error('Error getting all users:', error);
        throw new Error('Error getting all users');
    } finally {
        await closeDB();
    }
};

const deleteUserById = async (id: string) => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        console.log('Deleted:', result);
        return result; // Returns a DeleteResult object
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
    } finally {
        await closeDB();
    }
};

const getUserById = async (id: string) => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const user = await collection.findOne({ _id: new ObjectId(id) });

        console.log('User:', user);
        return user; // Returns the user document if found, or null if not        
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw new Error('Error getting user by ID');
    } finally {
        await closeDB();
    }
};

const updateUserById = async (id: string, username: string) => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { username } });

        console.log('Updated:', result);
        return result; // Returns an UpdateResult object
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Error updating user');
    }
};

export { getUsers, deleteUserById, getUserById, updateUserById };