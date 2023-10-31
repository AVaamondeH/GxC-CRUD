import { Request, Response } from 'express';
import { deleteUser } from '../../app/userService';

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const del = await deleteUser(userId);
        res.status(200).json(`User with id ${del} deleted successfully`);
    } catch (error) {
        res.status(500).json({ error: `Error deleting user ${error}` });
    }
};