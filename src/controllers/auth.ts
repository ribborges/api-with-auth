import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { getUserByEmail, createUser, getUserByUsername, updateSessionToken } from 'services/auth';
import { authentication, random } from 'helpers';

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Check for missing fields
        if (!username) {
            return res.status(400).json({ message: 'Missing username' });
        } else if (!password) {
            return res.status(400).json({ message: 'Missing password' });
        }

        const user = await getUserByUsername(username) as { _id: ObjectId, username: string, authentication: { password: string, salt: string, sessionToken: string } } | null;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (expectedHash !== user.authentication.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user.username);

        // Update the user document with the new session token
        await updateSessionToken(user.username, user.authentication.sessionToken);

        res.cookie('sessionToken', user.authentication.sessionToken, { httpOnly: true, domain: 'localhost', path: '/' });

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Error logging in user' });
    }
};

// Register a new user
const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // Check for missing fields
        if (!username) {
            return res.status(400).json({ message: 'Missing username' });
        } else if (!email) {
            return res.status(400).json({ message: 'Missing email' });
        } else if (!password) {
            return res.status(400).json({ message: 'Missing password' });
        } else if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        // Check if user already exists
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                password: authentication(salt, password),
                salt
            }
        });

        return res.status(201).json(user);
    } catch(error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Error registering user' });
    }
};

export { login, register };