"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = require("../controllers/productoController");
const router = (0, express_1.Router)();
// Obtener todos los productos
router.get('/producto', productoController_1.getAllProductosController);
// Agregar un nuevo producto
router.post('/producto/createProducto', productoController_1.addProductoController);
// Actualizar un producto
router.put('/producto/updateProducto/:id', productoController_1.updateProductoController);
// Eliminar un producto
router.delete('/producto/deleteProducto/:id', productoController_1.deleteProductoController);
// Buscar un producto por nombre
router.get('/producto/searchByName/:name', productoController_1.getProductosByNameController);
// Obtener productos de una tienda ordenados por cantidad ascendentemente
router.get('/producto/searchByTienda/:id', productoController_1.getProductosByTiendaSortedByQuantityController);
//mover producto de una tienda a otra
router.put('/producto/move', productoController_1.moveProductoController);
exports.default = router;
