"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const authenticate_1 = __importDefault(require("../helpers/authenticate"));
const router = (0, express_1.Router)();
// Devuelve todos los usuarios del sistema (no params)
router.get('/usuario', (0, authenticate_1.default)(['Administrador', 'Trabajador']), usuarioController_1.getAllUsersController);
// Agrega un nuevo usuario al sistema 
// (body: {nombre: string, nombre_usuario: string, email: string(deve tener @gmail.com),
//  contrasenna, rol: string, tienda: {"id_tienda": string} })
router.post('/usuario/createUsuario', usuarioController_1.addUserController);
// Devuelve un usuario por su id
router.get('/usuario/:id', (0, authenticate_1.default)(['Administrador', 'Trabajador']), usuarioController_1.getUserByIdController);
// Actualiza los datos del usuario segun su id
// (body: {nombre: string, nombre_usuario: string, email: string(deve tener @gmail.com),
//  contrasenna, rol: string, id_tienda: string })
router.put('/usuario/updateUsuari/:id', (0, authenticate_1.default)(['Administrador', 'Trabajador']), usuarioController_1.updateUserController);
// Elimina un usuario segun el id
router.delete('/usuario/deleteUsuario/:id', (0, authenticate_1.default)(['Administrador', 'Trabajador']), usuarioController_1.deleteUserController);
// Busca un usuario por su nombre
router.get('/usuario/searchByName/:name', (0, authenticate_1.default)(['Administrador', 'Trabajador']), usuarioController_1.getUserByNameController);
// Autentificacion de usuario
// (body: {nombre_usuario: string, contrasenna: string})
router.post('/usuario/authenticate', usuarioController_1.authenticateUserController);
exports.default = router;
