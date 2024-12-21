import { Router } from 'express';
import {
    getAllTiendasController,
    addTiendaController,
    getTiendaByIdController,
    updateTiendaController,
    deleteTiendaController,
    getTiendaByNameController
} from '../controllers/tiendaController';

const router = Router();

// Obtener todas las tiendas
router.get('/tienda', getAllTiendasController);

// Agregar una nueva tienda
router.post('/tienda/createTienda', addTiendaController);

// Obtener una tienda por ID
router.get('/tienda/:id', getTiendaByIdController);

// Actualizar una tienda
router.put('/tienda/updateTienda/:id', updateTiendaController);

// Eliminar una tienda
router.delete('/tienda/deleteTienda/:id', deleteTiendaController);

// Ruta para buscar una tienda por nombre
router.get('/tienda/searchByName/:name', getTiendaByNameController); // Nueva ruta


export default router;