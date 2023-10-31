import { Request, Response } from "express";
import { getUsersPaginated } from "../../app/userService";
import { validateSortBy } from "../../app/user.validation";


export const getUsersPaginatedController = async (req: Request, res: Response) => {
    try {
        if (!req.query.page || !req.query.pageSize || !req.query.sortBy || !req.query.order) throw new Error(`Missing data`)
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 5;
        const sortBy = req.query.sortBy as string || 'name';
        const order = (req.query.order as string === 'desc') ? 'desc' : 'asc';

        const validSortBy = validateSortBy(sortBy);
        const { users, totalPages } = await getUsersPaginated(page, pageSize, validSortBy, order);
        res.json({ users, totalPages });

    } catch (error) {
        res.status(500).json({ error: `Error fetching pagination, error type ${error}` });
    }
}