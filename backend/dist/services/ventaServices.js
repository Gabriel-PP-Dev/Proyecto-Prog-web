"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.exportToExcel = exports.getVentasByTiendaId = exports.deleteVenta = exports.updateVenta = exports.getVentaById = exports.addVenta = exports.getAllVentas = void 0;
// src/services/ventaServices.ts
const data_source_1 = require("../data-source");
const Venta_1 = require("../entities/Venta");
const XLSX = __importStar(require("xlsx"));
const getAllVentas = () => __awaiter(void 0, void 0, void 0, function* () {
    const ventaRepository = data_source_1.AppDataSource.getRepository(Venta_1.Venta);
    return yield ventaRepository.find({
        relations: {
            tienda: true,
            producto_precio: {
                tienda: true
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
                producto_precios: true
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
// Obtener todas las ventas de una tienda por ID
const getVentasByTiendaId = (id_tienda) => __awaiter(void 0, void 0, void 0, function* () {
    const ventaRepository = data_source_1.AppDataSource.getRepository(Venta_1.Venta);
    return yield ventaRepository.find({
        where: { tienda: { id_tienda } },
        relations: {
            tienda: true,
            producto_precio: {
                tienda: true
            }
        }
    });
});
exports.getVentasByTiendaId = getVentasByTiendaId;
const exportToExcel = (data, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    return excelBuffer;
});
exports.exportToExcel = exportToExcel;
