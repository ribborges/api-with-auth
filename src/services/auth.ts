import { WithId } from "mongodb";

import { client, closeDB, connectDB, dbName } from 'database/db';
import { UserSchema } from 'types/user';

const collectionName = 'user';

const getUserByUsername = async (username: string): Promise<WithId<Document> | null> => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const user = await collection.findOne({ username }) as WithId<Document> | null;

        if (!user) {
            console.log('User not found');
            return null;
        }

        console.log('User:', user);
        return user; // Returns the user document if found, or null if not
    } catch (error) {
        console.error('Error when searching for user:', error);
        throw new Error('Error when searching for user');
    } finally {
        await closeDB();
    }
};

const getUserByEmail = async (email: string): Promise<WithId<Document> | null> => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const user = await collection.findOne({ email }) as WithId<Document> | null;

        if (!user) {
            console.log('User not found');
            return null;
        }

        console.log('User:', user);
        return user; // Returns the user document if found, or null if not
    } catch (error) {
        console.error('Error when searching for user:', error);
        throw new Error('Error when searching for user');
    } finally {
        await closeDB();
    }
};

const getUserBySessionToken = async (sessionToken: string): Promise<WithId<Document> | null> => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const user = await collection.findOne({ 'authentication.sessionToken': sessionToken }) as WithId<Document> | null;

        if (!user) {
            console.log('User not found');
            return null;
        }

        console.log('User:', user);
        return user; // Returns the user document if found, or null if not
    } catch (error) {
        console.error('Error when searching for user:', error);
        throw new Error('Error when searching for user');
    } finally {
        await closeDB();
    }
};

const updateSessionToken = async (username: string, sessionToken: string) => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.updateOne({ username }, { $set: { 'authentication.sessionToken': sessionToken } });

        if (!result.acknowledged) {
            console.log('Error updating session token');
            throw new Error('Error updating session token');
        }

        console.log('Session token updated:', result);
        return result; // Returns the update result
    } catch (error) {
        console.error('Error updating session token:', error);
        throw new Error('Error updating session token');
    } finally {
        await closeDB();
    }
};

const createUser = async (user: UserSchema) => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.insertOne(user);

        if (!result.acknowledged) {
            console.log('Error creating user');
            throw new Error('Error creating user');
        }

        console.log('User created:', result);
        return result; // Returns the user document
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    } finally {
        await closeDB();
    }
};

export { getUserByUsername, getUserByEmail, getUserBySessionToken, updateSessionToken, createUser };