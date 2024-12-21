import { Router } from 'express';
import {
    addPrecioController,
    getAllProductosController,
    addProductoController,
    getProductoByIdController,
    updateProductoController,
    deleteProductoController,
    getProductosByNameController
} from '../controllers/productoController';

const router = Router();

// Obtener todos los productos
router.get('/producto', getAllProductosController);

// Agregar un nuevo producto
router.post('/producto/createProducto', addProductoController);

// Agregar precio a producto
router.post('/producto/addPrecio', addPrecioController);

// Obtener un producto por ID
router.get('/producto/:id', getProductoByIdController);

// Actualizar un producto
router.put('/producto/updateProducto/:id', updateProductoController);

// Eliminar un producto
router.delete('/producto/deleteProducto/:id', deleteProductoController);

// Buscar un producto por nombre
router.get('/producto/searchByName/:name', getProductosByNameController);




export default router;