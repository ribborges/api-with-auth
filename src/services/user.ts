import { WithId } from 'mongodb';
import { client, dbName, connectDB, closeDB } from 'database/db';
import { authentication } from 'helpers';

const collectionName = 'user';

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

const createUser = async (username: string, email: string, password: string, salt: string) => {
    try {
        await connectDB();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const user = {
            username,
            email,
            password: authentication(salt, password),
            salt
        };

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
}

export { getUserByEmail, createUser };