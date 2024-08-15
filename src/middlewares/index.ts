import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "services/auth";

const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentId = get(req, 'identity._id') as unknown as string;

        if (!currentId) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else if (currentId.toString() !== id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        return next();
    } catch (error) {
        console.log('Error checking ownership:', error);
        return res.status(500).json({ message: 'Error checking ownership' });        
    }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['sessionToken'];

        if (!sessionToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.log('Error authenticating user:', error);
        return res.status(500).json({ message: 'Error authenticating user' });
    }
}

export { isOwner, isAuthenticated };