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
exports.addUserController = exports.getAllUsersController = void 0;
const usuarioServices_1 = require("../services/usuarioServices");
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usuarioServices_1.getAllUsers)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});
exports.getAllUsersController = getAllUsersController;
const addUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, usuarioServices_1.addUser)(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al agregar usuario', error });
    }
});
exports.addUserController = addUserController;
