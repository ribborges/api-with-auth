import {Request, Response} from 'express';
import { getUserByEmail, createUser } from 'services/user';
import { random } from 'helpers';

// Register a new user
export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Missing username' });
        } else if (!email) {
            return res.status(400).json({ message: 'Missing email' });
        } else if (!password) {
            return res.status(400).json({ message: 'Missing password' });
        } else if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = random();
        const user = await createUser(username, email, password, salt);

        return res.status(201).json(user);
    } catch(error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Error registering user' });
    }
}