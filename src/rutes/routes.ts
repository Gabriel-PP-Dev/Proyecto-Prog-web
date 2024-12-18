import { Router } from 'express';
import { getAllUsersController, addUserController } from '../controllers/usuarioController';

const router = Router();

router.get('/users', getAllUsersController);
router.post('/users', addUserController);

export default router;
