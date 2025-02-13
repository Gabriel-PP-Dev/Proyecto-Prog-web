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
exports.deleteProductoPrecioController = exports.getProducto_PrecioByProductIdController = exports.getProducto_PrecioByIdController = exports.updateProducto_PrecioController = exports.addProducto_PrecioController = exports.getAllProducto_PrecioController = void 0;
const producto_PrecioServices_1 = require("../services/producto_PrecioServices");
// Obtener todas los producto_precio
const getAllProducto_PrecioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto_Precio = yield (0, producto_PrecioServices_1.getAllProducto_Precio)();
        res
            .status(200)
            .json(producto_Precio.map((precio) => (Object.assign(Object.assign({}, precio), { precio: Number(precio.precio) }))));
    }
    catch (error) {
        console.error("Error al obtener productoPrecio:", error);
        res.status(500).json({ message: "Error al obtener productoPrecio", error });
    }
});
exports.getAllProducto_PrecioController = getAllProducto_PrecioController;
// Agregar un nuevo producto_precio
const addProducto_PrecioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { precio, producto } = req.body;
        if (!producto || !precio) {
            res
                .status(400)
                .json({
                message: "Deve proporcionar un producto:{id_producto: number} y un precio: decimal",
            });
            return;
        }
        if (typeof precio !== "number") {
            res.status(400).json({ message: "El precio debe ser un número decimal" });
            return;
        }
        const newProducto_Precio = yield (0, producto_PrecioServices_1.addProducto_Precio)(req.body);
        res.status(201).json(newProducto_Precio);
    }
    catch (error) {
        console.error("Error al agregar productoPrecio:", error);
        res.status(500).json({ message: "Error al agregar productoPrecio", error });
    }
});
exports.addProducto_PrecioController = addProducto_PrecioController;
// Actualizar un producto_precio
const updateProducto_PrecioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { precio, producto } = req.body;
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        // Crear un objeto con solo los campos proporcionados
        const fieldsToUpdate = {};
        if (precio)
            fieldsToUpdate.precio = precio;
        if (producto)
            fieldsToUpdate.producto = producto;
        const updatedProducto_Precio = yield (0, producto_PrecioServices_1.updateProducto_Precio)(id, fieldsToUpdate);
        res.status(200).json(updatedProducto_Precio);
    }
    catch (error) {
        console.error("Error al actualizar productoPrecio:", error);
        res
            .status(500)
            .json({ message: "Error al actualizar productoPrecio", error });
    }
});
exports.updateProducto_PrecioController = updateProducto_PrecioController;
// Obtener un Producto_Precio por ID
const getProducto_PrecioByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Deve proporcionar un id" });
            return;
        }
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        const producto_Precio = yield (0, producto_PrecioServices_1.getProducto_PrecioById)(id);
        if (producto_Precio) {
            res
                .status(200)
                .json(Object.assign(Object.assign({}, producto_Precio), { precio: Number(producto_Precio.precio) }));
        }
        else {
            res.status(404).json({ message: "Producto_Precio no encontrado" });
        }
    }
    catch (error) {
        console.error("Error al obtener el Producto_Precio:", error);
        res
            .status(500)
            .json({ message: "Error al obtener el Producto_Precio", error });
    }
});
exports.getProducto_PrecioByIdController = getProducto_PrecioByIdController;
// Obtener todos los producto_precio por ID de producto
const getProducto_PrecioByProductIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        const producto_Precio = yield (0, producto_PrecioServices_1.getProducto_PrecioByProductId)(id);
        if (producto_Precio) {
            res
                .status(200)
                .json(producto_Precio.map((precio) => (Object.assign(Object.assign({}, precio), { precio: Number(precio.precio) }))));
        }
        else {
            res
                .status(404)
                .json({
                message: "No se encontraron producto_precio para el ID de producto proporcionado",
            });
        }
    }
    catch (error) {
        console.error("Error al obtener los producto_precio:", error);
        res
            .status(500)
            .json({ message: "Error al obtener los producto_precio", error });
    }
});
exports.getProducto_PrecioByProductIdController = getProducto_PrecioByProductIdController;
// Eliminar un Producto_Precio
const deleteProductoPrecioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Validar si el id es un uuid válido
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
            res.status(400).json({ message: "El id debe ser un uuid válido" });
            return;
        }
        const deleted = yield (0, producto_PrecioServices_1.deleteProducto_Precio)(id);
        if (deleted) {
            res.status(204).send(); // No content
        }
        else {
            res.status(404).json({ message: "Producto_Precio no encontrada" });
        }
    }
    catch (error) {
        console.error("Error al eliminar el Producto_Precio:", error);
        res
            .status(500)
            .json({ message: "Error al eliminar el Producto_Precio", error });
    }
});
exports.deleteProductoPrecioController = deleteProductoPrecioController;
