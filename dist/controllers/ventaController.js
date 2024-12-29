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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportVentasToPDFController = exports.deleteVentaController = exports.updateVentaController = exports.getVentaByIdController = exports.addVentaController = exports.getAllVentasController = void 0;
const ventaServices_1 = require("../services/ventaServices");
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
// Obtener todas las ventas
const getAllVentasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = yield (0, ventaServices_1.getAllVentas)();
        res.status(200).json(ventas);
    }
    catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ message: 'Error al obtener ventas', error });
    }
});
exports.getAllVentasController = getAllVentasController;
// Agregar una nueva venta
const addVentaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newVenta = yield (0, ventaServices_1.addVenta)(req.body);
        res.status(201).json(newVenta);
    }
    catch (error) {
        console.error('Error al agregar venta:', error);
        res.status(500).json({ message: 'Error al agregar venta', error });
    }
});
exports.addVentaController = addVentaController;
// Obtener una venta por ID
const getVentaByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const venta = yield (0, ventaServices_1.getVentaById)(Number(id));
        if (venta) {
            res.status(200).json(venta);
        }
        else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al obtener la venta:', error);
        res.status(500).json({ message: 'Error al obtener la venta', error });
    }
});
exports.getVentaByIdController = getVentaByIdController;
// Actualizar una venta
const updateVentaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedVenta = yield (0, ventaServices_1.updateVenta)(Number(id), req.body);
        if (updatedVenta) {
            res.status(200).json(updatedVenta);
        }
        else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al actualizar la venta:', error);
        res.status(500).json({ message: 'Error al actualizar la venta', error });
    }
});
exports.updateVentaController = updateVentaController;
// Eliminar una venta
const deleteVentaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield (0, ventaServices_1.deleteVenta)(Number(id));
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al eliminar la venta:', error);
        res.status(500).json({ message: 'Error al eliminar la venta', error });
    }
});
exports.deleteVentaController = deleteVentaController;
// Método para exportar todas las ventas a PDF
const exportVentasToPDFController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = yield (0, ventaServices_1.getAllVentas)();
        // Crear un nuevo documento PDF
        const doc = new pdfkit_1.default();
        const filePath = './ventas.pdf';
        // Guardar el PDF en el sistema de archivos
        doc.pipe(fs_1.default.createWriteStream(filePath));
        // Agregar un título
        doc.fontSize(25).text('Reporte de Ventas', { align: 'center' });
        doc.moveDown();
        // Agregar las ventas al PDF
        ventas.forEach(venta => {
            doc.fontSize(12).text(`ID Venta: ${venta.id_venta}`);
            doc.text(`Tienda: ${venta.tienda.nombre}`);
            doc.text(`Cantidad: ${venta.cantidad}`);
            doc.text(`Precio Total: ${venta.precio}`);
            doc.moveDown();
        });
        // Finalizar el documento
        doc.end();
    }
    catch (error) {
        console.error('Error al exportar ventas a PDF:', error);
        res.status(500).json({ message: 'Error al exportar ventas a PDF', error });
    }
});
exports.exportVentasToPDFController = exportVentasToPDFController;
