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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.addUser = exports.getAllUsers = void 0;
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entities/Usuario");
// Obtener todos los usuarios
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    return yield userRepository.find();
});
exports.getAllUsers = getAllUsers;
// Agregar un nuevo usuario
const addUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    const newUser = userRepository.create(userData);
    return yield userRepository.save(newUser);
});
exports.addUser = addUser;
// Obtener un usuario por ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    return yield userRepository.findOneBy({ id_usuario: id });
});
exports.getUserById = getUserById;
// Actualizar un usuario
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    yield userRepository.update(id, userData);
    return yield userRepository.findOneBy({ id_usuario: id });
});
exports.updateUser = updateUser;
// Eliminar un usuario
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    const result = yield userRepository.delete(id);
    // Verifica que result.affected no sea null o undefined
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
});
exports.deleteUser = deleteUser;
