import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "services/user";

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

export { isAuthenticated };