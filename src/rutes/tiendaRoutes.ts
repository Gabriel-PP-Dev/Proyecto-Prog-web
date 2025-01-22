import { Router } from 'express';
import {
    getAllTiendasController,
    addTiendaController,
    getTiendaByIdController,
    updateTiendaController,
    deleteTiendaController,
    getTiendaByNameController
} from '../controllers/tiendaController';
import authenticate from '../helpers/authenticate';

const router = Router();

// Obtener todas las tiendas
router.get('/tienda', authenticate(['Administrador', 'Trabajador']), getAllTiendasController);

// Agregar una nueva tienda
router.post('/tienda/createTienda', authenticate(['Administrador', 'Trabajador']), addTiendaController);

// Obtener una tienda por ID
router.get('/tienda/:id', authenticate(['Administrador', 'Trabajador']), getTiendaByIdController);

// Actualizar una tienda
router.put('/tienda/updateTienda/:id', authenticate(['Administrador', 'Trabajador']), updateTiendaController);

// Eliminar una tienda
router.delete('/tienda/deleteTienda/:id', authenticate(['Administrador', 'Trabajador']), deleteTiendaController);

// Ruta para buscar una tienda por nombre
router.get('/tienda/searchByName/:name', authenticate(['Administrador', 'Trabajador']), getTiendaByNameController); // Nueva ruta


export default router;