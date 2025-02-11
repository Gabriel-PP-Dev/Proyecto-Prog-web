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
exports.getProductosByNameController = exports.deleteProductoController = exports.updateProductoController = exports.addProductoController = exports.getAllProductosController = exports.getProductoByIdController = exports.moveProductoController = exports.getProductosByTiendaSortedByQuantityController = void 0;
const productoServices_1 = require("../services/productoServices");
//obtener productos de tienda (id) ordenados ascendentemente
const getProductosByTiendaSortedByQuantityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro, id de la tienda de la que desea obtener los productos)' });
        return;
    }
    try {
        const productos = yield (0, productoServices_1.getProductosByTiendaSortedByQuantity)(Number(id));
        if (productos) {
            res.status(200).json(productos);
        }
        else {
            res.status(404).json({ message: 'Tienda no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});
exports.getProductosByTiendaSortedByQuantityController = getProductosByTiendaSortedByQuantityController;
//mover producto a otra tienda
const moveProductoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { idTienda } = req.body;
        // Validación básica
        if (!id || !idTienda) {
            res.status(400).json({ message: 'Aegúrese de pasar como información: id (parámetro, id de tiendaProductoPrecio), idTienda (id de la tienda a la que desea mover el producto)' });
            return;
        }
        const newChange = yield (0, productoServices_1.moveProducto)(Number(id), idTienda);
        if (newChange != null)
            res.status(201).json(newChange);
        else
            res.status(201).json({ message: 'La tienda o el producto no existen' });
    }
    catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al cambiar producto', error });
    }
});
exports.moveProductoController = moveProductoController;
// Obtener un producto por ID
const getProductoByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validación básica
    if (!id) {
        res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro)' });
        return;
    }
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
// Agregar un nuevo producto
const addProductoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, costo, precio } = req.body;
    if (!nombre || !costo || !precio) {
        res.status(400).json({ message: 'Asegúrese de pasar como información: nombre, costo, precio' });
        return;
    }
    if (typeof nombre !== 'string' || typeof costo !== 'string' || typeof precio !== 'number') {
        res.status(400).json({ message: 'Los campos deben tener el tipo de dato correcto' });
        return;
    }
    try {
        const productoData = { nombre, costo, precio };
        const newProducto = yield (0, productoServices_1.addProducto)(productoData);
        if (newProducto) {
            // Excluir las propiedades que crean la estructura circular
            const replacer = (key, value) => {
                if (key === 'producto_precios') {
                    return undefined;
                }
                return value;
            };
            res.status(201).json(JSON.stringify(newProducto, replacer));
        }
        else {
            res.status(404).json({ message: 'El producto ya existe' });
        }
    }
    catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ message: 'Error al agregar el producto', error });
    }
});
exports.addProductoController = addProductoController;
// Actualizar un producto
const updateProductoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, costo, precio } = req.body;
    if (!id || !nombre || !costo || !precio) {
        res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro), nombre, costo, precio' });
        return;
    }
    if (typeof nombre !== 'string' || typeof costo !== 'string' || typeof precio !== 'number') {
        res.status(400).json({ message: 'Los campos deben tener el tipo de dato correcto' });
        return;
    }
    try {
        const updatedProducto = yield (0, productoServices_1.updateProducto)(Number(id), req.body);
        if (updatedProducto) {
            res.status(200).json(updatedProducto);
        }
        else {
            res.status(404).json({ message: 'El producto no existe' });
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
    if (!id) {
        res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro)' });
        return;
    }
    try {
        const deletedProducto = yield (0, productoServices_1.deleteProducto)(Number(id));
        if (deletedProducto) {
            res.status(204).json({ message: 'El producto ha sido eliminado' });
        }
        else {
            res.status(404).json({ message: 'El producto no existe' });
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
    if (!name) {
        res.status(400).json({ message: 'Asegúrese de pasar como información: name (parámetro)' });
        return;
    }
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
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});
exports.getProductosByNameController = getProductosByNameController;
