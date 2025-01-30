import { Router } from 'express';
import { getAllUsersController, addUserController, getUserByIdController, updateUserController, deleteUserController, getUserByNameController, authenticateUserController } from '../controllers/usuarioController';
import authenticate from '../helpers/authenticate';

const router = Router();

// Devuelve todos los usuarios del sistema (no params)
router.get('/usuario', authenticate(['Administrador', 'Trabajador']), getAllUsersController);

// Agrega un nuevo usuario al sistema 
// (body: {nombre: string, nombre_usuario: string, email: string(deve tener @gmail.com),
//  contrasenna, rol: string, tienda: {"id_tienda": string} })
router.post('/usuario/createUsuario', addUserController);

// Devuelve un usuario por su id
router.get('/usuario/:id', authenticate(['Administrador', 'Trabajador']), getUserByIdController);

// Actualiza los datos del usuario segun su id
// (body: {nombre: string, nombre_usuario: string, email: string(deve tener @gmail.com),
//  contrasenna, rol: string, id_tienda: string })
router.put('/usuario/updateUsuari/:id', authenticate(['Administrador', 'Trabajador']), updateUserController);

// Elimina un usuario segun el id
router.delete('/usuario/deleteUsuario/:id', authenticate(['Administrador', 'Trabajador']), deleteUserController);

// Busca un usuario por su nombre
router.get('/usuario/searchByName/:name', authenticate(['Administrador', 'Trabajador']), getUserByNameController);

// Autentificacion de usuario
// (body: {nombre_usuario: string, contrasenna: string})
router.post('/usuario/authenticate', authenticateUserController);

export default router;
