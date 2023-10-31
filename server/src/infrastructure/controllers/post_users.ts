import { Request, Response } from 'express';
import { postUser } from '../../app/userService';
import { userValidation } from '../../app/user.validation';

export const postUserController = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const {error} = userValidation.validate(user);

        if(error) {
            res.status(400).json({ error: `Invalid user data, ${error}` });
            return;
        }
        const createdUser = await postUser(user);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: `Error al crear el usuario ${error}` });
    }
};
