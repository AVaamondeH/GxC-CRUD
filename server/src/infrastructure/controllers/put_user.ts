import { Request, Response } from 'express';
import { updateUser } from '../../app/userService';
import { updateUserValidation } from '../../app/user.validation';

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const userData = req.body;

        const { error, value } = updateUserValidation.validate(userData);
        
        if (error) {
            res.status(400).json({ error: `User data not valid, ${error}` });
            return;
        }

        const updatedUser = await updateUser(userId, value);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: `User with ID ${userId} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: `Error updating user, ${error}` });
    }
};