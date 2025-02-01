"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiendaProductoPrecioController_1 = require("../controllers/tiendaProductoPrecioController");
const authenticate_1 = __importDefault(require("../helpers/authenticate"));
const router = (0, express_1.Router)();
/**
 * Obtener todos los registros de TiendaProductoPrecio
 *
 * No recibe datos en el body
 *
 * Retorna:
 * - Un arreglo de tiendaProductoPrecio con sus IDs y otros datos
 */
router.get('/tiendaProductoPrecio', (0, authenticate_1.default)(['Administrador', 'Trabajador']), tiendaProductoPrecioController_1.getAllTiendaProductoPrecioController);
/**
 * Agregar un nuevo registro de TiendaProductoPrecio
 *
 * Recibe en el body:
 * - id_tienda (string): ID de la tienda
 * - id_producto_precio (string): ID del producto precio
 * - cantidad_en_tienda (number): Cantidad del producto en la tienda
 *
 * Retorna:
 * - El tiendaProductoPrecio creado con su ID y otros datos
 */
router.post('/tiendaProductoPrecio/createTiendaProductoPrecio', (0, authenticate_1.default)(['Administrador', 'Trabajador']), tiendaProductoPrecioController_1.addTiendaProductoPrecioController);
/**
 * Obtener un registro de TiendaProductoPrecio por ID
 *
 * Recibe en el parámetro :id:
 * - id (string): ID del tiendaProductoPrecio
 *
 * No recibe datos en el body
 *
 * Retorna:
 * - El tiendaProductoPrecio con su ID y otros datos
 */
router.get('/tiendaProductoPrecio/:id', (0, authenticate_1.default)(['Administrador', 'Trabajador']), tiendaProductoPrecioController_1.getTiendaProductoPrecioByIdController);
/**
 * Obtener todos los tiendaProductoPrecio donde esté contenido un producto por su ID
 *
 * Recibe en el parámetro :id:
 * - id (string): ID del producto
 *
 * No recibe datos en el body
 *
 * Retorna:
 * - Un arreglo de tiendaProductoPrecio que coinciden con el ID de producto proporcionado
 */
router.get('/tiendaProductoPrecio/getTiendaProductoPrecioByProducto/:id', (0, authenticate_1.default)(['Administrador', 'Trabajador']), tiendaProductoPrecioController_1.getTiendaProductoPrecioByProductIdController);
/**
 * Actualizar un registro de TiendaProductoPrecio
 *
 * Recibe en el parámetro :id:
 * - id (string): ID del tiendaProductoPrecio
 *
 * Recibe en el body:
 * - id_tienda (string): ID de la tienda
 * - id_producto_precio (string): ID del producto precio
 * - cantidad_en_tienda (number): Cantidad del producto en la tienda
 *
 * Retorna:
 * - El tiendaProductoPrecio actualizado con su ID y otros datos
 */
router.put('/tiendaProductoPrecio/updateTiendaProductoPrecio/:id', (0, authenticate_1.default)(['Administrador', 'Trabajador']), tiendaProductoPrecioController_1.updateTiendaProductoPrecioController);
/**
 * Eliminar un registro de TiendaProductoPrecio
 *
 * Recibe en el parámetro :id:
 * - id (string): ID del tiendaProductoPrecio
 *
 * No recibe datos en el body
 *
 * Retorna:
 * - Un mensaje de confirmación de eliminación
 */
router.delete('/tiendaProductoPrecio/deleteTiendaProductoPrecio/:id', (0, authenticate_1.default)(['Administrador', 'Trabajador']), tiendaProductoPrecioController_1.deleteTiendaProductoPrecioController);
exports.default = router;
