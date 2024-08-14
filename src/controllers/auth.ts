import {Request, Response} from 'express';
import { getUserByEmail, createUser } from 'services/user';
import { random } from 'helpers';

// Register a new user
export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(409);
        }

        const salt = random();
        const user = await createUser(username, email, password, salt);

        return res.sendStatus(201).json(user).end();
    } catch(error) {
        console.error('Error registering user:', error);
        return res.sendStatus(400);
    }
}