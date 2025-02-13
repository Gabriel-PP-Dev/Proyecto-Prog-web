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
exports.getTiendaProductoPrecioByTiendaIdOrdenados = exports.getTiendaProductoPrecioByTiendaId = exports.getTiendaProductoPrecioByProductId = exports.deleteTiendaProductoPrecio = exports.updateTiendaProductoPrecio = exports.getTiendaProductoPrecioById = exports.addTiendaProductoPrecio = exports.getAllTiendaProductoPrecio = void 0;
const data_source_1 = require("../data-source");
const TiendaProductoPrecio_1 = require("../entities/TiendaProductoPrecio");
// Obtener todos los registros de TiendaProductoPrecio
const getAllTiendaProductoPrecio = () => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    return yield tiendaProductoPrecioRepository.find({
        relations: ['tienda', 'producto_precios.producto', 'ventas']
    });
});
exports.getAllTiendaProductoPrecio = getAllTiendaProductoPrecio;
// Agregar un nuevo registro de TiendaProductoPrecio
const addTiendaProductoPrecio = (tiendaProductoPrecioData) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    const newTiendaProductoPrecio = tiendaProductoPrecioRepository.create(tiendaProductoPrecioData);
    yield tiendaProductoPrecioRepository.save(newTiendaProductoPrecio);
    return newTiendaProductoPrecio;
});
exports.addTiendaProductoPrecio = addTiendaProductoPrecio;
// Obtener un registro de TiendaProductoPrecio por ID
const getTiendaProductoPrecioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    return yield tiendaProductoPrecioRepository.findOne({
        where: { id_tiendaProductoPrecio: id },
        relations: ['tienda', 'producto_precios.producto', 'ventas']
    });
});
exports.getTiendaProductoPrecioById = getTiendaProductoPrecioById;
// Actualizar un registro de TiendaProductoPrecio
const updateTiendaProductoPrecio = (id, tiendaProductoPrecioData) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    yield tiendaProductoPrecioRepository.update(id, tiendaProductoPrecioData);
    return yield tiendaProductoPrecioRepository.findOneBy({ id_tiendaProductoPrecio: id });
});
exports.updateTiendaProductoPrecio = updateTiendaProductoPrecio;
// Eliminar un registro de TiendaProductoPrecio
const deleteTiendaProductoPrecio = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    const result = yield tiendaProductoPrecioRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
});
exports.deleteTiendaProductoPrecio = deleteTiendaProductoPrecio;
// Obtener todos los registros de TiendaProductoPrecio por ID de producto
const getTiendaProductoPrecioByProductId = (id_producto) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    return yield tiendaProductoPrecioRepository.find({
        relations: ['tienda', 'producto_precios', 'producto_precios.producto', 'ventas'],
        where: {
            producto_precios: {
                producto: {
                    id_producto
                }
            }
        }
    });
});
exports.getTiendaProductoPrecioByProductId = getTiendaProductoPrecioByProductId;
// Obtener todos los TiendaProductoPrecio de una tienda por ID
const getTiendaProductoPrecioByTiendaId = (id_tienda) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    return yield tiendaProductoPrecioRepository.find({
        where: { tienda: { id_tienda } },
        relations: ['tienda', 'producto_precios', 'producto_precios.producto']
    });
});
exports.getTiendaProductoPrecioByTiendaId = getTiendaProductoPrecioByTiendaId;
// Obtener todos los TiendaProductoPrecio de una tienda por ID ordenados por cantidad
const getTiendaProductoPrecioByTiendaIdOrdenados = (id_tienda) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    return yield tiendaProductoPrecioRepository.find({
        where: { tienda: { id_tienda } },
        order: { cantidad_en_tienda: 'ASC' }, // Ordenar por cantidad de menor a mayor
        relations: ['tienda', 'producto_precios', 'producto_precios.producto'],
    });
});
exports.getTiendaProductoPrecioByTiendaIdOrdenados = getTiendaProductoPrecioByTiendaIdOrdenados;
