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
const tiendaServices_1 = require("../services/tiendaServices");
// Obtener productos de Tienda (id) ordenados por cantidad 
const getProductosByTiendaSortedByQuantityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro, id de la tienda de la que desea obtener los productos)' });
        return;
    }
    try {
        const productos = yield (0, productoServices_1.getProductosByTiendaSortedByQuantity)(id);
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
// Mover producto a otra tienda
const moveProductoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id_tienda_origen, id_tienda_destino, cantidad } = req.body;
        // Validación básica
        if (!id || !id_tienda_origen || !id_tienda_destino || !cantidad) {
            res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro), id_tienda_origen, id_tienda_destino y cantidad (body)' });
            return;
        }
        if (typeof cantidad !== 'number' || cantidad <= 0) {
            res.status(400).json({ message: 'La cantidad debe ser un número entero positivo' });
            return;
        }
        const producto = yield (0, productoServices_1.getProductoById)(id);
        if (!producto) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }
        const tiendaOrigen = yield (0, tiendaServices_1.getTiendaById)(id_tienda_origen);
        if (!tiendaOrigen) {
            res.status(404).json({ message: 'Tienda de origen no encontrada' });
            return;
        }
        const tiendaDestino = yield (0, tiendaServices_1.getTiendaById)(id_tienda_destino);
        if (!tiendaDestino) {
            res.status(404).json({ message: 'Tienda de destino no encontrada' });
            return;
        }
        // Mover el producto a la tienda de destino
        const resultado = yield (0, productoServices_1.moveProducto)(id, id_tienda_destino, cantidad);
        if (resultado) {
            res.status(200).json({ message: 'Producto movido con éxito' });
        }
        else {
            res.status(500).json({ message: 'Error al mover el producto' });
        }
    }
    catch (error) {
        console.error('Error al mover el producto:', error);
        res.status(500).json({ message: 'Error al mover el producto', error });
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
        const producto = yield (0, productoServices_1.getProductoById)(id);
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
    try {
        const { nombre, costo } = req.body;
        if (!nombre || !costo) {
            res.status(400).json({ message: 'Asegúrese de pasar como información: nombre, costo' });
            return;
        }
        if (typeof nombre !== 'string' || typeof costo !== 'number') {
            res.status(400).json({ message: 'Los campos deben tener el tipo de dato correcto' });
            return;
        }
        const productoData = { nombre, costo };
        const newProducto = yield (0, productoServices_1.addProducto)(productoData);
        if (newProducto) {
            res.status(201).json(newProducto);
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
    const { nombre, costo } = req.body;
    // Crear un objeto con solo los campos proporcionados
    const fieldsToUpdate = {};
    if (!id) {
        res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro)' });
        return;
    }
    if (!nombre && !costo) {
        res.status(400).json({ message: 'Asegúrese de pasar como información: nombre y costo por el body' });
        return;
    }
    else if (typeof nombre !== 'string' || typeof costo !== 'number') {
        res.status(400).json({ message: 'Los campos deben tener el tipo de dato correcto' });
        return;
    }
    else {
        if (nombre)
            fieldsToUpdate.nombre = nombre;
        if (costo)
            fieldsToUpdate.costo = costo;
    }
    try {
        const updatedProducto = yield (0, productoServices_1.updateProducto)(id, fieldsToUpdate);
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
        const deletedProducto = yield (0, productoServices_1.deleteProducto)(id);
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
