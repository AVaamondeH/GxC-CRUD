import { Request, Response } from "express";
import { getUsersPaginated } from "../../app/userService";
import { validateSortBy } from "../../app/user.validation";


export const getUsersPaginatedController = async (req: Request, res: Response) => {
    try {
        if (!req.query.page || !req.query.pageSize || !req.query.sortBy || !req.query.order) throw new Error(`Missing data`)
        let filters = req.body;
        if (!filters || Object.keys(filters).length === 0) {
          filters = undefined;
        }
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 5;
        const sortBy = req.query.sortBy as string || 'id';
        const order = (req.query.order as string === 'desc') ? 'desc' : 'asc';

        const validSortBy = validateSortBy(sortBy);
        const { users, totalPages } = await getUsersPaginated(page, pageSize, validSortBy, order, filters);
        res.json({ users, totalPages });

    } catch (error) {
        res.status(500).json({ error: `Error fetching pagination, error type ${error}` });
    }
}