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
exports.getProductosByNameController = exports.getProductoByIdController = exports.deleteProductoController = exports.updateProductoController = exports.addProductoController = exports.getAllProductosController = exports.moveProductoController = exports.getProductosByTiendaSortedByQuantityController = exports.getProductosMasVendidosController = void 0;
const productoServices_1 = require("../services/productoServices");
//obtener los 10 productos más vendidos
const getProductosMasVendidosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield (0, productoServices_1.getTop10ProductosMasVendidos)();
        if (productos != null)
            res.status(200).json(productos);
        else
            res.status(500).json({ message: 'Aún no se han realizado ventas' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos más vendidos' });
    }
});
exports.getProductosMasVendidosController = getProductosMasVendidosController;
//obtener productos de tienda (id) ordenados ascendentemente
const getProductosByTiendaSortedByQuantityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Aegúrese de pasar por parámetros: id (id de la tienda de la que desea obtener los productos)' });
        return;
    }
    try {
        const productos = yield (0, productoServices_1.getProductosByTiendaSortedByQuantity)(Number(id));
        if (productos != null) {
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
        if (Number.isInteger(idTienda)) {
            const newChange = yield (0, productoServices_1.moveProducto)(Number(id), idTienda);
            if (newChange != null)
                res.status(201).json(newChange);
            else
                res.status(201).json({ message: 'La tienda o el producto no existen' });
        }
        else
            res.status(404).json({ message: 'El identificador debe ser un número entero' });
    }
    catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al cambiar producto', error });
    }
});
exports.moveProductoController = moveProductoController;
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
        const { nombre, costo, precio } = req.body;
        // Validación básica
        if (!nombre || !costo || !precio) {
            res.status(400).json({ message: 'Aegúrese de pasar como información: nombre, costo, precio' });
            return;
        }
        if (Number.isInteger(precio) && /^-?\d+\.\d+$/.test(costo)) {
            const newProducto = yield (0, productoServices_1.addProducto)(req.body);
            if (newProducto != null)
                res.status(201).json(newProducto);
            else
                res.status(201).json({ message: 'El producto ya existe' });
        }
        else
            res.status(201).json({ message: 'El precio debe ser un entero y el costo debe ser un double' });
    }
    catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
});
exports.addProductoController = addProductoController;
// Actualizar un producto
const updateProductoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { nombre, costo } = req.body;
        // Validación básica
        if (!nombre || !costo || !id) {
            res.status(400).json({ message: 'Aegúrese de pasar como información: nombre, costo' });
            return;
        }
        if (/^-?\d+\.\d+$/.test(costo)) {
            const updatedProducto = yield (0, productoServices_1.updateProducto)(Number(id), req.body);
            if (updatedProducto != null) {
                res.status(200).json(updatedProducto);
            }
            else {
                res.status(404).json({ message: 'Producto no encontrado o existente' });
            }
        }
        else
            res.status(404).json({ message: 'El costo debe ser un double' });
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
        res.status(400).json({ message: 'Aegúrese de pasar por parámetros: id (id del producto a eliminar)' });
        return;
    }
    try {
        const deletedProducto = yield (0, productoServices_1.deleteProducto)(Number(id));
        if (deletedProducto) {
            res.status(204).json({ message: 'Producto eliminado correctamente' });
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado o está relacionado con otras tablas' });
        }
    }
    catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
});
exports.deleteProductoController = deleteProductoController;
// Obtener un producto por id
const getProductoByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Aegúrese de pasar por parámetros: id (id del producto a obtener)' });
        return;
    }
    try {
        const productoById = yield (0, productoServices_1.getProductoById)(Number(id));
        if (productoById) {
            res.status(200).json(productoById);
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
// Obtener productos cuyo nombre contenga la cadena proporcionada
const getProductosByNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    if (!name) {
        res.status(400).json({ message: 'Aegúrese de pasar por parámetros: name (nombre del producto a buscar)' });
        return;
    }
    try {
        const productos = yield (0, productoServices_1.getProductosByName)(String(name));
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
