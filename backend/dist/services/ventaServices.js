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
exports.deleteVenta = exports.updateVenta = exports.getVentaById = exports.addVenta = exports.getAllVentas = void 0;
// src/services/ventaServices.ts
const data_source_1 = require("../data-source");
const Venta_1 = require("../entities/Venta");
const getAllVentas = () => __awaiter(void 0, void 0, void 0, function* () {
    const ventaRepository = data_source_1.AppDataSource.getRepository(Venta_1.Venta);
    return yield ventaRepository.find({
        relations: {
            tienda: true,
            producto_precio: {
                tienda: true,
                producto_precio: true
            }
        }
    });
});
exports.getAllVentas = getAllVentas;
const addVenta = (ventaData) => __awaiter(void 0, void 0, void 0, function* () {
    const ventaRepository = data_source_1.AppDataSource.getRepository(Venta_1.Venta);
    const newVenta = ventaRepository.create(ventaData);
    return yield ventaRepository.save(newVenta);
});
exports.addVenta = addVenta;
const getVentaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ventaRepository = data_source_1.AppDataSource.getRepository(Venta_1.Venta);
    return yield ventaRepository.findOne({
        where: { id_venta: id },
        relations: {
            tienda: true,
            producto_precio: {
                tienda: true,
                producto_precio: true
            }
        }
    });
});
exports.getVentaById = getVentaById;
const updateVenta = (id, ventaData) => __awaiter(void 0, void 0, void 0, function* () {
    const ventaRepository = data_source_1.AppDataSource.getRepository(Venta_1.Venta);
    yield ventaRepository.update(id, ventaData);
    return yield ventaRepository.findOneBy({ id_venta: id });
});
exports.updateVenta = updateVenta;
const deleteVenta = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ventaRepository = data_source_1.AppDataSource.getRepository(Venta_1.Venta);
    const result = yield ventaRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
});
exports.deleteVenta = deleteVenta;
