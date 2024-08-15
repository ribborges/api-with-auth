import { Request, Response } from 'express';

import { deleteUserById, getUsers } from 'services/users';

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        throw new Error('Error getting all users');
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteUserById(id);
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
    }
}

export { getAllUsers, deleteUser };