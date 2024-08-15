import { Request, Response } from 'express';

import { deleteUserById, getUserById, getUsers, updateUserById } from 'services/users';

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        throw new Error('Error getting all users');
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteUserById(id);
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Missing username' });
        }

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await updateUserById(id, username);

        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        
    }
};

export { getAllUsers, deleteUser, updateUser };