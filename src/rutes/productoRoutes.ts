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

const router = Router();

// Obtener todos los productos
router.get('/producto', getAllProductosController);

// Obtener un producto por ID
router.get('/producto/:id', getProductoByIdController);

// Agregar un nuevo producto
router.post('/producto/createProducto', addProductoController);

// Actualizar un producto
router.put('/producto/updateProducto/:id', updateProductoController);

// Eliminar un producto
router.delete('/producto/deleteProducto/:id', deleteProductoController);

// Buscar un producto por nombre
router.get('/producto/searchByName/:name', getProductosByNameController);

// Obtener productos de una tienda ordenados por cantidad ascendentemente
router.get('/producto/searchByTienda/:id', getProductosByTiendaSortedByQuantityController);

//mover producto de una tienda a otra
router.put('/producto/move/:id', moveProductoController);

export default router;