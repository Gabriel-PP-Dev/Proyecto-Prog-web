// src/controllers/userController.ts
import { Request, Response } from 'express';
import { getAllUsers, addUser } from '../services/usuarioServices';

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

export const addUserController = async (req: Request, res: Response) => {
    try {
        const newUser = await addUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar usuario', error });
    }
};
