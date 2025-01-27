import { Router } from 'express';
import { 
    addTiendaProductoPrecioController, 
    deleteTiendaProductoPrecioController, 
    getAllTiendaProductoPrecioController, 
    getTiendaProductoPrecioByIdController, 
    updateTiendaProductoPrecioController 
} from '../controllers/tiendaProductoPrecioController';
import authenticate from '../helpers/authenticate';

const router = Router();

// Obtener todos los registros de TiendaProductoPrecio
router.get('/tiendaProductoPrecio', authenticate(['Administrador', 'Trabajador']), getAllTiendaProductoPrecioController);

// Agregar un nuevo registro de TiendaProductoPrecio
router.post('/tiendaProductoPrecio/createTiendaProductoPrecio', authenticate(['Administrador', 'Trabajador']), addTiendaProductoPrecioController);

// Obtener un registro de TiendaProductoPrecio por ID
router.get('/tiendaProductoPrecio/:id', authenticate(['Administrador', 'Trabajador']), getTiendaProductoPrecioByIdController);

// Actualizar un registro de TiendaProductoPrecio
router.put('/tiendaProductoPrecio/updateTiendaProductoPrecio/:id', authenticate(['Administrador', 'Trabajador']), updateTiendaProductoPrecioController);

// Eliminar un registro de TiendaProductoPrecio
router.delete('/tiendaProductoPrecio/deleteTiendaProductoPrecio/:id', authenticate(['Administrador', 'Trabajador']), deleteTiendaProductoPrecioController);

export default router;