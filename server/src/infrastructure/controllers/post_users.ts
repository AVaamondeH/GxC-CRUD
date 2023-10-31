import { Request, Response } from 'express';
import { postUser } from '../../app/userService';
import { User } from '../../domain/user.entity';

export const postUserController = async (req: Request, res: Response) => {
    try {
        const user = req.body as User;
        const createdUser = await postUser(user);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: `Error al crear el usuario ${error}` });
    }
};
