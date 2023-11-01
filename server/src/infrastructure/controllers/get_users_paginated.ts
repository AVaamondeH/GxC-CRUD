import { Request, Response } from "express";
import { getUsersPaginated } from "../../app/userService";
import { validateSortBy } from "../../app/user.validation";
import { User } from "../../domain/user.entity";


export const getUsersPaginatedController = async (req: Request, res: Response) => {
    try {
        if (!req.query.page || !req.query.pageSize || !req.query.sortBy || !req.query.order) throw new Error(`Missing data`)
        const filters = {
            column: req.query.column as keyof User,
            filterType: req.query.filterType as 'Contains' | 'NotContains' | 'Equals' | 'NotEquals' | 'StartsWith' | 'EndsWith',
            searchValue: req.query.searchValue as string,
        };
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