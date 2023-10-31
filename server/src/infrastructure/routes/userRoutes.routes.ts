import express from 'express';
import { getUsersController } from '../controllers/get_users';
import { postUserController } from '../controllers/post_users';
import { updateUserController } from '../controllers/put_user';
import { deleteUserController } from '../controllers/delete_user';
import { getUsersPaginatedController } from '../controllers/get_users_paginated';

const router = express.Router();

router.get('/', getUsersController);
router.post('/', postUserController);
router.put("/:id", updateUserController)
router.delete("/:id", deleteUserController)
router.get("/paginated", getUsersPaginatedController)

export default router;