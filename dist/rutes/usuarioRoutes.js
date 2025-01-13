"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /usuario:
 *   get:
 *     tags: [Usuario]
 *     summary: Obtener todos los usuarios
 *     description: Retorna una lista de todos los usuarios.
 *     responses:
 *       200:
 *         description: Usuarios obtenidos exitosamente.
 */
router.get('/usuario', usuarioController_1.getAllUsersController);
/**
 * @swagger
 * /usuario/createUsuario:
 *   post:
 *     tags: [Usuario]
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasenna:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 */
router.post('/usuario/createUsuario', usuarioController_1.addUserController);
/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     tags: [Usuario]
 *     summary: Obtener un usuario por ID
 *     description: Retorna un usuario con el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente.
 */
router.get('/usuario/:id', usuarioController_1.getUserByIdController);
/**
 * @swagger
 * /usuario/updateUsuarii/{id}:
 *   put:
 *     tags: [Usuario]
 *     summary: Actualizar un usuario
 *     description: Actualiza un usuario con el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasenna:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 */
router.put('/usuario/updateUsuarii/:id', usuarioController_1.updateUserController);
/**
 * @swagger
 * /usuario/deleteUsuario/{id}:
 *   delete:
 *     tags: [Usuario]
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario con el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente.
 */
router.delete('/usuario/deleteUsuario/:id', usuarioController_1.deleteUserController);
/**
 * @swagger
 * /usuario/searchByName/{name}:
 *   get:
 *     tags: [Usuario]
 *     summary: Buscar un usuario por nombre
 *     description: Retorna un usuario con el nombre proporcionado.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nombre del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente.
 */
router.get('/usuario/searchByName/:name', usuarioController_1.getUserByNameController);
exports.default = router;
