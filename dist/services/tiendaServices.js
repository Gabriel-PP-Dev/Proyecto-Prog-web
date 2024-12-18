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
exports.deleteTienda = exports.updateTienda = exports.getTiendaById = exports.addTienda = exports.getAllTiendas = void 0;
const data_source_1 = require("../data-source");
const Tienda_1 = require("../entities/Tienda");
// Obtener todas las tiendas
const getAllTiendas = () => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaRepository = data_source_1.AppDataSource.getRepository(Tienda_1.Tienda);
    return yield tiendaRepository.find();
});
exports.getAllTiendas = getAllTiendas;
// Agregar una nueva tienda
const addTienda = (tiendaData) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaRepository = data_source_1.AppDataSource.getRepository(Tienda_1.Tienda);
    const newTienda = tiendaRepository.create(tiendaData);
    return yield tiendaRepository.save(newTienda);
});
exports.addTienda = addTienda;
// Obtener una tienda por ID
const getTiendaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaRepository = data_source_1.AppDataSource.getRepository(Tienda_1.Tienda);
    return yield tiendaRepository.findOneBy({ id_tienda: id });
});
exports.getTiendaById = getTiendaById;
// Actualizar una tienda
const updateTienda = (id, tiendaData) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaRepository = data_source_1.AppDataSource.getRepository(Tienda_1.Tienda);
    yield tiendaRepository.update(id, tiendaData);
    return yield tiendaRepository.findOneBy({ id_tienda: id });
});
exports.updateTienda = updateTienda;
// Eliminar una tienda
const deleteTienda = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaRepository = data_source_1.AppDataSource.getRepository(Tienda_1.Tienda);
    const result = yield tiendaRepository.delete(id);
    // Verifica que result.affected no sea null o undefined
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
});
exports.deleteTienda = deleteTienda;
