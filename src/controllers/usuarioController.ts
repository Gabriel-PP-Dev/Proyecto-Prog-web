import { Request, Response } from 'express';
import { 
    addUser,
    deleteUser,
    getAllUsers, 
    getUserById,
    updateUser
} from '../services/usuarioServices';

// Obtener todos los usuarios
export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

// Agregar un nuevo usuario
export const addUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, nombre_usuario, contrasenna, rol, tienda, email } = req.body;

        // Validación básica
        if (!nombre || !nombre_usuario || !contrasenna || !rol || !tienda || !email) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        // Validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'El correo electrónico no es válido' });
            return;
        }

        const newUser  = await addUser (req.body);
        res.status(201).json(newUser );
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).json({ message: 'Error al agregar usuario', error });
    }
};

// Obtener un usuario por ID
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await getUserById(Number(id));
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// Actualizar un usuario
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const { nombre, nombre_usuario, contrasenna, rol, tienda, email } = req.body;

        // Validación básica
        if (!nombre || !nombre_usuario || !contrasenna || !rol || !tienda || !email) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        // Validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'El correo electrónico no es válido' });
            return;
        }

        const updatedUser  = await updateUser (Number(id), req.body);
        if (updatedUser ) {
            res.status(200).json(updatedUser );
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// Eliminar un usuario
export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deleted = await deleteUser (Number(id));
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};