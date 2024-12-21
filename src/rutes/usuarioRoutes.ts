import { Router } from 'express';
import { getAllUsersController, addUserController, getUserByIdController, updateUserController, deleteUserController, getUserByNameController } from '../controllers/usuarioController';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/usuario', getAllUsersController);

// Ruta para agregar un nuevo usuario
router.post('/usuario/createUsuario', addUserController);

// Ruta para obtener un usuario por ID
router.get('/usuario/:id', getUserByIdController);

// Ruta para actualizar un usuario
router.put('/usuario/updateUsuarii/:id', updateUserController);

// Ruta para eliminar un usuario
router.delete('/usuario/deleteUsuario:id', deleteUserController);

// Ruta para buscar un usuario por nombre
router.get('/usuario/searchByName/:name', getUserByNameController);

export default router;
