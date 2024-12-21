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
exports.getProductosByNameController = exports.deleteProductoController = exports.updateProductoController = exports.getProductoByIdController = exports.addProductoController = exports.addPrecioController = exports.getAllProductosController = void 0;
const productoServices_1 = require("../services/productoServices");
// Obtener todos los productos
const getAllProductosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield (0, productoServices_1.getAllProductos)();
        res.status(200).json(productos);
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});
exports.getAllProductosController = getAllProductosController;
// Agregar un nuevo precio
const addPrecioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productoId, precio } = req.body;
        // Validación básica
        if (!productoId || !precio) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        const newPrecio = yield (0, productoServices_1.addPrecio)(req.body);
        res.status(201).json(newPrecio);
    }
    catch (error) {
        console.error('Error al agregar precio:', error);
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
});
exports.addPrecioController = addPrecioController;
// Agregar un nuevo producto
const addProductoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, costo, precio } = req.body;
        // Validación básica
        if (!nombre || !costo || !precio) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        const newProducto = yield (0, productoServices_1.addProducto)(req.body);
        res.status(201).json(newProducto);
    }
    catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
});
exports.addProductoController = addProductoController;
// Obtener un producto por ID
const getProductoByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const producto = yield (0, productoServices_1.getProductoById)(Number(id));
        if (producto) {
            res.status(200).json(producto);
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
});
exports.getProductoByIdController = getProductoByIdController;
// Actualizar un producto
const updateProductoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { nombre, costo } = req.body;
        // Validación básica
        if (!nombre || !costo) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        const updatedTienda = yield (0, productoServices_1.updateProducto)(Number(id), req.body);
        if (updatedTienda) {
            res.status(200).json(updatedTienda);
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
});
exports.updateProductoController = updateProductoController;
// Eliminar un producto
const deleteProductoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProducto = yield (0, productoServices_1.deleteProducto)(Number(id));
        const deletedPrecio = yield (0, productoServices_1.deleteProductoPrecio)(Number(id));
        if (deletedProducto && deletedPrecio) {
            res.status(204).send(); // No content
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
});
exports.deleteProductoController = deleteProductoController;
// Obtener productos cuyo nombre contenga la cadena proporcionada
const getProductosByNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const productos = yield (0, productoServices_1.getProductosByName)(name);
        if (productos.length > 0) {
            res.status(200).json(productos);
        }
        else {
            res.status(404).json({ message: 'No se encontraron productos con ese nombre' });
        }
    }
    catch (error) {
        console.error('Error al obtener el producto por nombre:', error);
        res.status(500).json({ message: 'Error al obtener el producto por nombre', error });
    }
});
exports.getProductosByNameController = getProductosByNameController;
