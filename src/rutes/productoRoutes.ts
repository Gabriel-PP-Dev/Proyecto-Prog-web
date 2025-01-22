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
router.get('/producto', authenticate(['Administrador', 'Trabajador']), getAllProductosController);

// Obtener un producto por ID
router.get('/producto/:id', authenticate(['Administrador', 'Trabajador']), getProductoByIdController);

// Agregar un nuevo producto
router.post('/producto/createProducto', authenticate(['Administrador', 'Trabajador']), addProductoController);

// Actualizar un producto
router.put('/producto/updateProducto/:id', authenticate(['Administrador', 'Trabajador']), updateProductoController);

// Eliminar un producto
router.delete('/producto/deleteProducto/:id', authenticate(['Administrador', 'Trabajador']), deleteProductoController);

// Buscar un producto por nombre
router.get('/producto/searchByName/:name', authenticate(['Administrador', 'Trabajador']), getProductosByNameController);

// Obtener productos de una tienda ordenados por cantidad ascendentemente
router.get('/producto/searchByTienda/:id', authenticate(['Administrador', 'Trabajador']), getProductosByTiendaSortedByQuantityController);

//mover producto de una tienda a otra
router.put('/producto/move/:id', authenticate(['Administrador', 'Trabajador']), moveProductoController);

export default router;