import { Request, Response } from "express";
import { getUsers } from "../../app/userService";


export const getUsersController = async (_req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: `Error fetching users, error type ${error}` });
    }
}