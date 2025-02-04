import { Router } from 'express';
import { getAllUsersController, addUserController, getUserByIdController, updateUserController, deleteUserController, getUserByNameController} from '../controllers/usuarioController';


const router = Router();

// Devuelve todos los usuarios del sistema (no params)
router.get('/usuario', getAllUsersController);

// Agrega un nuevo usuario al sistema 
// (body: {nombre: string, nombre_usuario: string, email: string(deve tener @gmail.com),
//  contrasenna, rol: string, tienda: {"id_tienda": string} })
router.post('/usuario/createUsuario', addUserController);

// Devuelve un usuario por su id
router.get('/usuario/:id', getUserByIdController);

// Actualiza los datos del usuario segun su id
// (body: {nombre: string, nombre_usuario: string, email: string(deve tener @gmail.com),
//  contrasenna, rol: string, id_tienda: string })
router.put('/usuario/updateUsuari/:id', updateUserController);

// Elimina un usuario segun el id
router.delete('/usuario/deleteUsuario/:id', deleteUserController);

// Busca un usuario por su nombre
router.get('/usuario/searchByName/:name', getUserByNameController);

export default router;
