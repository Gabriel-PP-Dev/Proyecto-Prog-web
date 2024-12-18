"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const router = (0, express_1.Router)();
// Ruta para obtener todos los usuarios
router.get('/usuario', usuarioController_1.getAllUsersController);
// Ruta para agregar un nuevo usuario
router.post('/usuario/createUsuario', usuarioController_1.addUserController);
// Ruta para obtener un usuario por ID
router.get('/usuario/:id', usuarioController_1.getUserByIdController);
// Ruta para actualizar un usuario
router.put('/usuario/updateUsuarii/:id', usuarioController_1.updateUserController);
// Ruta para eliminar un usuario
router.delete('/usuario/deleteUsuario:id', usuarioController_1.deleteUserController);
exports.default = router;
