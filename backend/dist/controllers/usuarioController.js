"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByNameController = exports.deleteUserController = exports.updateUserController = exports.getUserByIdController = exports.addUserController = exports.getAllUsersController = void 0;
const usuarioServices_1 = require("../services/usuarioServices");
// Obtener todos los usuarios
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usuarioServices_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});
exports.getAllUsersController = getAllUsersController;
// Agregar un nuevo usuario
const addUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newUser = yield (0, usuarioServices_1.addUser)(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).json({ message: 'Error al agregar usuario', error });
    }
});
exports.addUserController = addUserController;
// Obtener un usuario por ID
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, usuarioServices_1.getUserById)(Number(id));
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
});
exports.getUserByIdController = getUserByIdController;
// Actualizar un usuario
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedUser = yield (0, usuarioServices_1.updateUser)(Number(id), req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
});
exports.updateUserController = updateUserController;
// Eliminar un usuario
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield (0, usuarioServices_1.deleteUser)(Number(id));
        if (deleted) {
            res.status(204).send(); // No content
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
});
exports.deleteUserController = deleteUserController;
// Obtener un usuario por nombre
const getUserByNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    console.log("Nombre recibido:", name); // Agregar esta línea para depuración
    try {
        const users = yield (0, usuarioServices_1.getUserByName)(name);
        if (users.length > 0) {
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al obtener el usuario por nombre:', error);
        res.status(500).json({ message: 'Error al obtener el usuario por nombre', error });
    }
});
exports.getUserByNameController = getUserByNameController;
