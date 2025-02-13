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
exports.exportarVentasExcelController = exports.getVentasByTiendaIdController = exports.deleteVentaController = exports.updateVentaController = exports.getVentaByIdController = exports.addVentaController = exports.getAllVentasController = void 0;
const ventaServices_1 = require("../services/ventaServices");
const data_source_1 = require("../data-source");
const Tienda_1 = require("../entities/Tienda");
const TiendaProductoPrecio_1 = require("../entities/TiendaProductoPrecio");
const Venta_1 = require("../entities/Venta");
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
        const { tienda, producto_precio, cantidad, precio } = req.body;
        // Validar si se están pasando todos los campos requeridos
        if (!tienda || !producto_precio || !cantidad || !precio) {
            res.status(400).json({ message: 'Debes proporcionar todos los campos requeridos' });
            return;
        }
        // Validar si la cantidad es un número entero
        if (!Number.isInteger(cantidad)) {
            res.status(400).json({ message: 'La cantidad debe ser un número entero' });
            return;
        }
        // Validar si el precio es un número flotante
        if (typeof precio !== 'number') {
            res.status(400).json({ message: 'El precio debe ser un número flotante' });
            return;
        }
        // Validar si el ID de la tienda es un UUID válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(tienda)) {
            res.status(400).json({ message: 'El ID de la tienda debe ser un UUID válido' });
            return;
        }
        // Validar si el ID del producto precio es un UUID válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(producto_precio)) {
            res.status(400).json({ message: 'El ID del producto precio debe ser un UUID válido' });
            return;
        }
        // Comprobar si existe la tienda correspondiente a "tienda"
        const tiendaRepository = data_source_1.AppDataSource.getRepository(Tienda_1.Tienda);
        const tiendaExistente = yield tiendaRepository.findOne({ where: { id_tienda: tienda } });
        if (!tiendaExistente) {
            res.status(404).json({ message: 'La tienda no existe' });
            return;
        }
        // Comprobar si existe la tiendaProductoPrecio correspondiente a "producto_precio"
        const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
        const tiendaProductoPrecioExistente = yield tiendaProductoPrecioRepository.findOne({ where: { id_tiendaProductoPrecio: producto_precio } });
        if (!tiendaProductoPrecioExistente) {
            res.status(404).json({ message: 'La tienda producto precio no existe' });
            return;
        }
        // Comprobar si hay suficiente cantidad en stock
        if (tiendaProductoPrecioExistente.cantidad_en_tienda - cantidad < 0) {
            res.status(400).json({ message: 'No hay suficiente cantidad en el objeto de tiendaProductoPrecio para realizar la venta' });
            return;
        }
        // Restar la cantidad de la venta del stock
        tiendaProductoPrecioExistente.cantidad_en_tienda -= cantidad;
        yield tiendaProductoPrecioRepository.save(tiendaProductoPrecioExistente);
        // Crear la venta
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
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
        res.status(400).json({ message: 'El id debe ser un uuid válido' });
        return;
    }
    try {
        const venta = yield (0, ventaServices_1.getVentaById)(id);
        if (venta) {
            res.status(200).json(venta);
        }
        else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al obtener venta:', error);
        res.status(500).json({ message: 'Error al obtener venta', error });
    }
});
exports.getVentaByIdController = getVentaByIdController;
// Actualizar una venta
const updateVentaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { cantidad, precio } = req.body;
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
        res.status(400).json({ message: 'El id debe ser un uuid válido' });
        return;
    }
    // Validar si se están pasando todos los campos requeridos
    if (!cantidad || !precio) {
        res.status(400).json({ message: 'Debes proporcionar todos los campos requeridos' });
        return;
    }
    // Validar si la cantidad es un número entero
    if (!Number.isInteger(cantidad)) {
        res.status(400).json({ message: 'La cantidad debe ser un número entero' });
        return;
    }
    // Validar si el precio es un número flotante
    if (typeof precio !== 'number') {
        res.status(400).json({ message: 'El precio debe ser un número flotante' });
        return;
    }
    try {
        // Obtener la venta por ID
        const ventaRepository = data_source_1.AppDataSource.getRepository(Venta_1.Venta);
        const venta = yield ventaRepository.findOne({ where: { id_venta: id }, relations: ['producto_precio'] });
        if (!venta) {
            res.status(404).json({ message: 'Venta no encontrada' });
            return;
        }
        // Obtener el tiendaProductoPrecio correspondiente a la venta
        const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
        const tiendaProductoPrecio = yield tiendaProductoPrecioRepository.findOne({ where: { id_tiendaProductoPrecio: venta.producto_precio.id_tiendaProductoPrecio } });
        if (!tiendaProductoPrecio) {
            res.status(404).json({ message: 'Tienda producto precio no encontrada' });
            return;
        }
        // Verificar si la cantidad en tiendaProductoPrecio es suficiente para realizar la venta
        const cantidadFinal = tiendaProductoPrecio.cantidad_en_tienda - venta.cantidad + cantidad;
        if (cantidadFinal < 0) {
            res.status(400).json({ message: 'No hay suficiente cantidad en stock para realizar la venta' });
            return;
        }
        // Actualizar la cantidad en tiendaProductoPrecio
        tiendaProductoPrecio.cantidad_en_tienda = cantidadFinal;
        yield tiendaProductoPrecioRepository.save(tiendaProductoPrecio);
        // Actualizar la venta
        const updatedVenta = yield (0, ventaServices_1.updateVenta)(id, req.body);
        if (updatedVenta) {
            res.status(200).json(updatedVenta);
        }
        else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al actualizar venta:', error);
        res.status(500).json({ message: 'Error al actualizar venta', error });
    }
});
exports.updateVentaController = updateVentaController;
// Eliminar una venta
const deleteVentaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
        res.status(400).json({ message: 'El id debe ser un uuid válido' });
        return;
    }
    try {
        // Obtener la venta por ID
        const ventaRepository = data_source_1.AppDataSource.getRepository(Venta_1.Venta);
        const venta = yield ventaRepository.findOne({ where: { id_venta: id }, relations: ['producto_precio'] });
        if (!venta) {
            res.status(404).json({ message: 'Venta no encontrada' });
            return;
        }
        // Obtener el tiendaProductoPrecio correspondiente a la venta
        const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
        const tiendaProductoPrecio = yield tiendaProductoPrecioRepository.findOne({ where: { id_tiendaProductoPrecio: venta.producto_precio.id_tiendaProductoPrecio } });
        if (!tiendaProductoPrecio) {
            res.status(404).json({ message: 'Tienda producto precio no encontrada' });
            return;
        }
        // Sumar la cantidad de la venta a la cantidad de tiendaProductoPrecio
        tiendaProductoPrecio.cantidad_en_tienda += venta.cantidad;
        yield tiendaProductoPrecioRepository.save(tiendaProductoPrecio);
        // Eliminar la venta
        const deleted = yield (0, ventaServices_1.deleteVenta)(id);
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al eliminar venta:', error);
        res.status(500).json({ message: 'Error al eliminar venta', error });
    }
});
exports.deleteVentaController = deleteVentaController;
// Obtener todas las ventas de una tienda por ID
const getVentasByTiendaIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
        res.status(400).json({ message: 'El id debe ser un uuid válido' });
        return;
    }
    try {
        const ventas = yield (0, ventaServices_1.getVentasByTiendaId)(id);
        if (ventas) {
            res.status(200).json(ventas);
        }
        else {
            res.status(404).json({ message: 'No se encontraron ventas para la tienda' });
        }
    }
    catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ message: 'Error al obtener ventas', error });
    }
});
exports.getVentasByTiendaIdController = getVentasByTiendaIdController;
// Exportar ventas a Excel
const exportarVentasExcelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = yield (0, ventaServices_1.getAllVentas)();
        const excelData = [];
        ventas.forEach((venta) => {
            excelData.push({
                'ID Venta': venta.id_venta,
                'ID Tienda Producto Precio': venta.producto_precio.id_tiendaProductoPrecio,
                'Cantidad': venta.cantidad,
                'Precio': venta.precio,
                'Tienda': venta.tienda.nombre,
            });
        });
        const excelBuffer = yield (0, ventaServices_1.exportToExcel)(excelData, 'Ventas');
        res.status(200).json(excelBuffer);
    }
    catch (error) {
        console.error('Error al exportar ventas a Excel:', error);
        res.status(500).json({ message: 'Error al exportar ventas a Excel', error });
    }
});
exports.exportarVentasExcelController = exportarVentasExcelController;
// Método para exportar todas las ventas a PDF
/*
export const exportVentasToPDFController = async (req: Request, res: Response): Promise<void> => {
    try {
        const ventas = await getAllVentas();

        // Crear un nuevo documento PDF
        const doc = new PDFDocument();
        const filePath = './ventas.pdf';

        // Guardar el PDF en el sistema de archivos
        doc.pipe(fs.createWriteStream(filePath));

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

    } catch (error) {
        console.error('Error al exportar ventas a PDF:', error);
        res.status(500).json({ message: 'Error al exportar ventas a PDF', error });
    }
};
*/ 
