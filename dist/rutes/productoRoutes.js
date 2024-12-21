"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = require("../controllers/productoController");
const router = (0, express_1.Router)();
// Obtener todos los productos
router.get('/producto', productoController_1.getAllProductosController);
// Agregar un nuevo producto
router.post('/producto/createProducto', productoController_1.addProductoController);
// Agregar precio a producto
router.post('/producto/addPrecio', productoController_1.addPrecioController);
// Obtener un producto por ID
router.get('/producto/:id', productoController_1.getProductoByIdController);
// Actualizar un producto
router.put('/producto/updateProducto/:id', productoController_1.updateProductoController);
// Eliminar un producto
router.delete('/producto/deleteProducto/:id', productoController_1.deleteProductoController);
// Buscar un producto por nombre
router.get('/producto/searchByName/:name', productoController_1.getProductosByNameController);
exports.default = router;
