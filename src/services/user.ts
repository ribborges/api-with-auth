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
        return user; // Returns the user document if found, or null if not
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw new Error('Erro ao buscar usuário');
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
        return result; // Returns the user document
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    } finally {
        await closeDB();
    }
}

export { getUserByEmail, createUser };