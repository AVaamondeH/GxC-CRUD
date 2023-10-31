import express from 'express';
import { getUsersController } from '../controllers/get_users';
import { postUserController } from '../controllers/post_users';

const router = express.Router();

// Definir las rutas CRUD aquí
router.get('/', getUsersController);

router.post('/', postUserController);

// Puedes importar controladores o servicios desde otras capas para manejar las solicitudes

export default router;
