"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_PrecioController_1 = require("../controllers/producto_PrecioController");
const router = (0, express_1.Router)();
// Obtener todos los producto_precio
router.get('/Producto_Precio', producto_PrecioController_1.getAllProducto_PrecioController);
/**
 * Obtener todos los producto_precio
 *
 * No recibe datos en el body
 *
 * Retorna:
 * - Un arreglo de producto_precio con sus IDs y otros datos
 */
// Agregar un nuevo producto_precio
router.post('/Producto_Precio/createProducto_Precio', producto_PrecioController_1.addProducto_PrecioController);
/**
 * Agregar un nuevo producto_precio
 *
 * Recibe en el body:
 * - precio (number): Precio del producto
 * - producto (object): Objeto que contiene el ID del producto
 *
 * Retorna:
 * - El producto_precio creado con su ID y otros datos
 */
// Obtener un producto_precio por ID
router.get('/Producto_Precio/:id', producto_PrecioController_1.getProducto_PrecioByIdController);
/**
 * Obtener un producto_precio por ID
 *
 * Recibe en el parámetro :id:
 * - id (string): ID del producto_precio
 *
 * Retorna:
 * - El producto_precio con su ID y otros datos
 */
// Actualizar un producto_precio
router.put('/Producto_Precio/updateProducto_Precio/:id', producto_PrecioController_1.updateProducto_PrecioController);
/**
 * Actualizar un producto_precio
 *
 * Recibe en el parámetro :id:
 * - id (string): ID del producto_precio
 *
 * Recibe en el body:
 * - precio (number): Nuevo precio del producto
 * - producto (object): Objeto que contiene el ID del producto
 *
 * Retorna:
 * - El producto_precio actualizado con su ID y otros datos
 */
// Eliminar un producto_precio
router.delete('/Producto_Precio/deleteProducto_Precio/:id', producto_PrecioController_1.deleteProductoPrecioController);
/**
 * Eliminar un producto_precio
 *
 * Recibe en el parámetro :id:
 * - id (string): ID del producto_precio
 *
 * No recibe datos en el body
 *
 * Retorna:
 * - Un mensaje de confirmación de eliminación
 */
// Obtener todos los producto_precio por ID de producto
router.get('/Producto_Precio/getProducto_PrecioByProducto/:id', producto_PrecioController_1.getProducto_PrecioByProductIdController);
/**
 * Obtener todos los producto_precio por ID de producto
 *
 * Recibe en el parámetro :id:
 * - id (string): ID del producto
 *
 * Retorna:
 * - Un arreglo de producto_precio que coinciden con el ID de producto proporcionado
 */
exports.default = router;
