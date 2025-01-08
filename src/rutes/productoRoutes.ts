import { Router } from 'express';
import {
    getProductoByIdController,
    moveProductoController,
    getProductosByTiendaSortedByQuantityController,
    getAllProductosController,
    addProductoController,
    updateProductoController,
    deleteProductoController,
    getProductosByNameController,
} from '../controllers/productoController';

const router = Router();

// Obtener todos los productos
router.get('/producto', getAllProductosController);

// Agregar un nuevo producto 
router.post('/producto/createProducto', addProductoController);

// Actualizar un producto
router.put('/producto/updateProducto/:id', updateProductoController);

// Eliminar un producto
router.delete('/producto/deleteProducto/:id', deleteProductoController);

// Buscar productos por nombre
router.get('/producto/searchByName/:name', getProductosByNameController);

// Obtener productos de una tienda ordenados por cantidad ascendentemente
router.get('/producto/searchByTienda/:id', getProductosByTiendaSortedByQuantityController);

// Buscar producto por identificador
router.get('/producto/getById/:id', getProductoByIdController);

//mover producto de una tienda a otra
router.put('/producto/move/:id', moveProductoController);

export default router;