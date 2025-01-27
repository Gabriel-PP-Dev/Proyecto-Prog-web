import { Router } from 'express';
import { addProducto_PrecioController, deleteProductoPrecioController, getAllProducto_PrecioController, getProducto_PrecioByIdController, updateProducto_PrecioController } from '../controllers/producto_PrecioController';
import authenticate from '../helpers/authenticate';

const router = Router();

// Obtener todos los producto_precio
router.get('/Producto_Precio',authenticate(['Administrador', 'Trabajador']), getAllProducto_PrecioController);

// Agregar un nuevo producto_precio
router.post('/Producto_Precio/createProducto_Precio',authenticate(['Administrador', 'Trabajador']), addProducto_PrecioController);

// Obtener un producto_precio por ID
router.get('/Producto_Precio/:id',authenticate(['Administrador', 'Trabajador']), getProducto_PrecioByIdController);

// Actualizar un producto_precio
router.put('/Producto_Precio/updateProducto_Precio/:id',authenticate(['Administrador', 'Trabajador']), updateProducto_PrecioController);

// Eliminar un producto_precio
router.delete('/Producto_Precio/deleteProducto_Precio/:id',authenticate(['Administrador', 'Trabajador']), deleteProductoPrecioController);


export default router;