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
exports.getUserByName = exports.deleteUser = exports.updateUser = exports.getUserById = exports.addUser = exports.getAllUsers = void 0;
const data_source_1 = require("../data-source");
const Tienda_1 = require("../entities/Tienda");
const Usuario_1 = require("../entities/Usuario");
const AuxiliarFunctions_1 = require("../helpers/AuxiliarFunctions");
// Obtener todos los usuarios con su tienda asociada
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    return yield userRepository.find({
        relations: {
            tienda: true,
        },
    });
});
exports.getAllUsers = getAllUsers;
// Agregar un nuevo usuario con su tienda asociada
const addUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    // Verifica si userData.tienda está definido
    if (!userData.tienda || !userData.tienda.id_tienda) {
        throw new Error("ID de tienda no proporcionado");
    }
    const newTienda = yield data_source_1.AppDataSource.getRepository(Tienda_1.Tienda).findOne({
        where: { id_tienda: userData.tienda.id_tienda },
    });
    if (!newTienda) {
        throw new Error("Tienda no encontrada");
    }
    const newUser = userRepository.create(userData);
    newUser.tienda = newTienda;
    return yield userRepository.save(newUser);
});
exports.addUser = addUser;
// Obtener un usuario por ID con su tienda asociada
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    return yield userRepository.findOne({
        where: { id_usuario: id },
        relations: {
            tienda: true,
        },
    });
});
exports.getUserById = getUserById;
// Actualizar un usuario con su tienda asociada
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    const user = yield userRepository.findOne({
        where: { id_usuario: id },
        relations: {
            tienda: true,
        },
    });
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    if (userData.tienda) {
        const newTienda = yield data_source_1.AppDataSource.getRepository(Tienda_1.Tienda).findOne({
            where: { id_tienda: userData.tienda.id_tienda },
        });
        if (!newTienda) {
            throw new Error("Tienda no encontrada");
        }
        user.tienda = newTienda;
    }
    yield userRepository.update(id, userData);
    return yield userRepository.findOne({
        where: { id_usuario: id },
        relations: {
            tienda: true,
        },
    });
});
exports.updateUser = updateUser;
// Eliminar un usuario
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    const result = yield userRepository.delete(id);
    // Verifica que result.affected no sea null o undefined
    return (result.affected !== null &&
        result.affected !== undefined &&
        result.affected > 0);
});
exports.deleteUser = deleteUser;
// Obtener usuarios cuyo nombre contenga la cadena proporcionada
const getUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name) {
        throw new Error("El nombre no puede ser vacío");
    }
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    const normalizedName = (0, AuxiliarFunctions_1.removeAccents)(name.toLowerCase()); // Normalizar el nombre buscado
    // Obtener todos los usuarios y filtrar en memoria
    const users = yield userRepository.find({
        relations: {
            tienda: true, // Asegúrate de incluir la relación si es necesario
        }
    });
    // Filtrar usuarios que contengan el nombre normalizado
    return users.filter(user => (0, AuxiliarFunctions_1.removeAccents)(user.nombre.toLowerCase()).includes(normalizedName));
});
exports.getUserByName = getUserByName;
