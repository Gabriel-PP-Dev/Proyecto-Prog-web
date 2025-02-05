import { Router } from 'express';
import {
    moveProductoController,
    getProductosByTiendaSortedByQuantityController,
    getAllProductosController,
    addProductoController,
    updateProductoController,
    deleteProductoController,
    getProductosByNameController,
    getProductoByIdController
} from '../controllers/productoController';
import authenticate from '../helpers/authenticate';

const router = Router();

// Obtener todos los productos
router.get('/producto', getAllProductosController);
/**
 * Obtener todos los productos
 * 
 * No recibe datos en el body
 * 
 * Retorna:
 * - Un arreglo de productos con sus IDs y otros datos
 */

// Obtener un producto por ID
router.get('/producto/:id', getProductoByIdController);
/**
 * Obtener un producto por ID
 * 
 * Recibe en el parámetro :id:
 * - id (string): ID del producto
 * 
 * Retorna:
 * - El producto con su ID y otros datos
 */

// Agregar un nuevo producto
router.post('/producto/createProducto', addProductoController);
/**
 * Agregar un nuevo producto
 * 
 * Recibe en el body:
 * - nombre (string): Nombre del producto
 * - costo (number): Costo del producto
 * 
 * Retorna:
 * - El producto creado con su ID y otros datos
 */

// Actualizar un producto
router.put('/producto/updateProducto/:id', updateProductoController);
/**
 * Actualizar un producto
 * 
 * Recibe en el parámetro :id:
 * - id (string): ID del producto
 * 
 * Recibe en el body:
 * - nombre (string): Nuevo nombre del producto (opcional)
 * - costo (number): Nuevo costo del producto (opcional)
 * 
 * Retorna:
 * - El producto actualizado con su ID y otros datos
 */

// Eliminar un producto
router.delete('/producto/deleteProducto/:id', deleteProductoController);
/**
 * Eliminar un producto
 * 
 * Recibe en el parámetro :id:
 * - id (string): ID del producto
 * 
 * No recibe datos en el body
 * 
 * Retorna:
 * - Un mensaje de confirmación de eliminación
 */

// Buscar un producto por nombre
router.get('/producto/searchByName/:name', getProductosByNameController);
/**
 * Buscar un producto por nombre
 * 
 * Recibe en el parámetro :name:
 * - name (string): Nombre del producto a buscar
 * 
 * Retorna:
 * - Un arreglo de productos que coinciden con el nombre buscado
 */

// Obtener productos de una tienda ordenados por cantidad
router.get('/producto/searchByTienda/:id', getProductosByTiendaSortedByQuantityController);
/**
 * Obtener productos de una tienda ordenados por cantidad
 * 
 * Recibe en el parámetro :id:
 * - id (string): ID de la tienda
 * 
 * Retorna:
 * - Un arreglo de productos de la tienda ordenados por cantidad
 */

// Mover un producto a otra tienda
router.put('/producto/move/:id', moveProductoController);
/**
 * Mover un producto a otra tienda
 * 
 * Recibe en el parámetro :id:
 * - id (string): ID del producto
 * 
 * Recibe en el body:
 * - id_tienda_origen (string): ID de la tienda de origen del producto
 * - id_tienda_destino (string): ID de la tienda a la que se moverá el producto
 * - cantidad (number): Cantidad del producto que se moverá
 * 
 * Retorna:
 * - Un mensaje de confirmación de movimiento
 */

export default router;