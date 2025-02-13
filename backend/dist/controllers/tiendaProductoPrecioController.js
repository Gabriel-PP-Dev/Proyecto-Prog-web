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
exports.getTiendaProductoPrecioByTiendaIdOrdenadosController = exports.getTiendaProductoPrecioByTiendaIdController = exports.getTiendaProductoPrecioByProductIdController = exports.deleteTiendaProductoPrecioController = exports.updateTiendaProductoPrecioController = exports.getTiendaProductoPrecioByIdController = exports.addTiendaProductoPrecioController = exports.getAllTiendaProductoPrecioController = void 0;
const tiendaProductoPrecioServices_1 = require("../services/tiendaProductoPrecioServices");
const tiendaServices_1 = require("../services/tiendaServices");
const producto_PrecioServices_1 = require("../services/producto_PrecioServices");
// Obtener todos los registros de TiendaProductoPrecio
const getAllTiendaProductoPrecioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiendaProductoPrecio = yield (0, tiendaProductoPrecioServices_1.getAllTiendaProductoPrecio)();
        res.status(200).json(tiendaProductoPrecio);
    }
    catch (error) {
        console.error("Error al obtener TiendaProductoPrecio:", error);
        res
            .status(500)
            .json({ message: "Error al obtener TiendaProductoPrecio", error });
    }
});
exports.getAllTiendaProductoPrecioController = getAllTiendaProductoPrecioController;
// Agregar un nuevo registro de TiendaProductoPrecio
const addTiendaProductoPrecioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cantidad_en_tienda, id_tienda, id_producto_precio } = req.body;
        // Validación básica
        if (!cantidad_en_tienda || !id_tienda || !id_producto_precio) {
            res.status(400).json({ message: "Todos los campos son obligatorios" });
            return;
        }
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id_tienda)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id_producto_precio)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        const tienda = yield (0, tiendaServices_1.getTiendaById)(id_tienda);
        const productoPrecio = yield (0, producto_PrecioServices_1.getProducto_PrecioById)(id_producto_precio);
        if (!tienda || !productoPrecio) {
            res
                .status(404)
                .json({ message: "Tienda o producto precio no encontrado" });
            return;
        }
        const newTiendaProductoPrecio = yield (0, tiendaProductoPrecioServices_1.addTiendaProductoPrecio)({
            tienda,
            producto_precios: [productoPrecio],
            cantidad_en_tienda,
        });
        res.status(201).json(newTiendaProductoPrecio);
    }
    catch (error) {
        console.error("Error al agregar TiendaProductoPrecio:", error);
        res
            .status(500)
            .json({ message: "Error al agregar TiendaProductoPrecio", error });
    }
});
exports.addTiendaProductoPrecioController = addTiendaProductoPrecioController;
// Obtener un registro de TiendaProductoPrecio por ID
const getTiendaProductoPrecioByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        const tiendaProductoPrecio = yield (0, tiendaProductoPrecioServices_1.getTiendaProductoPrecioById)(id);
        if (tiendaProductoPrecio) {
            res.status(200).json(tiendaProductoPrecio);
        }
        else {
            res.status(404).json({ message: "TiendaProductoPrecio no encontrado" });
        }
    }
    catch (error) {
        console.error("Error al obtener TiendaProductoPrecio:", error);
        res
            .status(500)
            .json({ message: "Error al obtener TiendaProductoPrecio", error });
    }
});
exports.getTiendaProductoPrecioByIdController = getTiendaProductoPrecioByIdController;
// Actualizar un registro de TiendaProductoPrecio
const updateTiendaProductoPrecioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        const updatedTiendaProductoPrecio = yield (0, tiendaProductoPrecioServices_1.updateTiendaProductoPrecio)(id, req.body);
        if (updatedTiendaProductoPrecio) {
            res.status(200).json(updatedTiendaProductoPrecio);
        }
        else {
            res.status(404).json({ message: "TiendaProductoPrecio no encontrado" });
        }
    }
    catch (error) {
        console.error("Error al actualizar TiendaProductoPrecio:", error);
        res
            .status(500)
            .json({ message: "Error al actualizar TiendaProductoPrecio", error });
    }
});
exports.updateTiendaProductoPrecioController = updateTiendaProductoPrecioController;
// Eliminar un registro de TiendaProductoPrecio
const deleteTiendaProductoPrecioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        const deleted = yield (0, tiendaProductoPrecioServices_1.deleteTiendaProductoPrecio)(id);
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "TiendaProductoPrecio no encontrado" });
        }
    }
    catch (error) {
        console.error("Error al eliminar TiendaProductoPrecio:", error);
        res
            .status(500)
            .json({ message: "Error al eliminar TiendaProductoPrecio", error });
    }
});
exports.deleteTiendaProductoPrecioController = deleteTiendaProductoPrecioController;
const getTiendaProductoPrecioByProductIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        const tiendaProductoPrecios = yield (0, tiendaProductoPrecioServices_1.getTiendaProductoPrecioByProductId)(id);
        res.status(200).json(tiendaProductoPrecios);
    }
    catch (error) {
        console.error("Error al obtener tiendaProductoPrecios:", error);
        res
            .status(500)
            .json({ message: "Error al obtener tiendaProductoPrecios", error });
    }
});
exports.getTiendaProductoPrecioByProductIdController = getTiendaProductoPrecioByProductIdController;
// Obtener todos los TiendaProductoPrecio de una tienda por ID
const getTiendaProductoPrecioByTiendaIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validar si se está pasando un id por parámetro
    if (!id) {
        res.status(400).json({ message: "Debes proporcionar un id de tienda" });
        return;
    }
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
        res.status(400).json({ message: "El id debe ser un uuid válido" });
        return;
    }
    try {
        // Verificar si existe una tienda que coincida con el id pasado por parámetros
        const tienda = yield (0, tiendaServices_1.getTiendaById)(id);
        if (!tienda) {
            res
                .status(404)
                .json({ message: "No se encontró una tienda con el id proporcionado" });
            return;
        }
        const tiendaProductoPrecios = yield (0, tiendaProductoPrecioServices_1.getTiendaProductoPrecioByTiendaId)(id);
        if (tiendaProductoPrecios) {
            res.status(200).json(tiendaProductoPrecios);
        }
        else {
            res.status(404).json({
                message: "No se encontraron TiendaProductoPrecio para la tienda",
            });
        }
    }
    catch (error) {
        console.error("Error al obtener los TiendaProductoPrecio:", error);
        res
            .status(500)
            .json({ message: "Error al obtener los TiendaProductoPrecio", error });
    }
});
exports.getTiendaProductoPrecioByTiendaIdController = getTiendaProductoPrecioByTiendaIdController;
// Obtener todos los TiendaProductoPrecio de una tienda por ID ordenados por cantidad
const getTiendaProductoPrecioByTiendaIdOrdenadosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validar si se está pasando un id por parámetro
    if (!id) {
        res.status(400).json({ message: 'Debes proporcionar un id de tienda' });
        return;
    }
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
        res.status(400).json({ message: 'El id debe ser un uuid válido' });
        return;
    }
    try {
        // Verificar si existe una tienda que coincida con el id pasado por parámetros
        const tienda = yield (0, tiendaServices_1.getTiendaById)(id);
        if (!tienda) {
            res
                .status(404)
                .json({ message: 'No se encontró una tienda con el id proporcionado' });
            return;
        }
        // Obtener todos los TiendaProductoPrecio de la tienda ordenados por cantidad
        const tiendaProductoPrecios = yield (0, tiendaProductoPrecioServices_1.getTiendaProductoPrecioByTiendaIdOrdenados)(id);
        if (tiendaProductoPrecios) {
            res.status(200).json(tiendaProductoPrecios);
        }
        else {
            res.status(404).json({
                message: 'No se encontraron TiendaProductoPrecio para la tienda',
            });
        }
    }
    catch (error) {
        console.error('Error al obtener los TiendaProductoPrecio:', error);
        res
            .status(500)
            .json({ message: 'Error al obtener los TiendaProductoPrecio', error });
    }
});
exports.getTiendaProductoPrecioByTiendaIdOrdenadosController = getTiendaProductoPrecioByTiendaIdOrdenadosController;
