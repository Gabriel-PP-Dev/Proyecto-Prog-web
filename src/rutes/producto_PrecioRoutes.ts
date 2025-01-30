import { Router } from 'express';
import { 
    addProducto_PrecioController, 
    deleteProductoPrecioController, 
    getAllProducto_PrecioController, 
    getProducto_PrecioByIdController, 
    getProducto_PrecioByProductIdController, 
    updateProducto_PrecioController 
} from '../controllers/producto_PrecioController';
import authenticate from '../helpers/authenticate';

const router = Router();

// Obtener todos los producto_precio
router.get('/Producto_Precio', authenticate(['Administrador', 'Trabajador']), getAllProducto_PrecioController);
/**
 * Obtener todos los producto_precio
 * 
 * No recibe datos en el body
 * 
 * Retorna:
 * - Un arreglo de producto_precio con sus IDs y otros datos
 */

// Agregar un nuevo producto_precio
router.post('/Producto_Precio/createProducto_Precio', authenticate(['Administrador', 'Trabajador']), addProducto_PrecioController);
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
router.get('/Producto_Precio/:id', authenticate(['Administrador', 'Trabajador']), getProducto_PrecioByIdController);
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
router.put('/Producto_Precio/updateProducto_Precio/:id', authenticate(['Administrador', 'Trabajador']), updateProducto_PrecioController);
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
router.delete('/Producto_Precio/deleteProducto_Precio/:id', authenticate(['Administrador', 'Trabajador']), deleteProductoPrecioController);
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
router.get('/Producto_Precio/getProducto_PrecioByProducto/:id', authenticate(['Administrador', 'Trabajador']), getProducto_PrecioByProductIdController);
/**
 * Obtener todos los producto_precio por ID de producto
 * 
 * Recibe en el parámetro :id:
 * - id (string): ID del producto
 * 
 * Retorna:
 * - Un arreglo de producto_precio que coinciden con el ID de producto proporcionado
 */

export default router;