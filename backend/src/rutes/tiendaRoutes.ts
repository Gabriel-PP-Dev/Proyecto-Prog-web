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

// Agregar una nueva tienda
router.post('/tienda/createTienda', addTiendaController);
/**
 * Agregar una nueva tienda
 * 
 * Recibe en el body:
 * - nombre (string): Nombre de la tienda
 * - direccion (string): Dirección de la tienda
 * 
 * Retorna:
 * - La tienda creada con su ID y otros datos
 */

// Actualizar una tienda
router.put('/tienda/updateTienda/:id', updateTiendaController);
/**
 * Actualizar una tienda
 * 
 * Recive por parametrso:
 * id (string): Id de la tienda que se desea modifiar
 * 
 * Recibe en el body:
 * - nombre (string): Nuevo nombre de la tienda (opcional)
 * - direccion (string): Nueva dirección de la tienda (opcional)
 * 
 * Retorna:
 * - La tienda actualizada con su ID y otros datos
 */

// Eliminar una tienda
router.delete('/tienda/deleteTienda/:id', deleteTiendaController);
/**
 * Eliminar una tienda
 * 
 * Recive por parametrso:
 * id (string): Id de la tienda que se desea eliminar
 * 
 * No recibe datos en el body
 * 
 * Retorna:
 * - Un mensaje de confirmación de eliminación
 */

// Obtener una tienda por ID
router.get('/tienda/:id', getTiendaByIdController);
/**
 * Obtener una tienda por ID
 * 
 * Recive por parametrso:
 * id (string): Id de la tienda que se desea consultar
 * 
 * No recibe datos en el body
 * 
 * Retorna:
 * - La tienda con su ID y otros datos
 */

// Obtener todas las tiendas
router.get('/tienda', getAllTiendasController);
/**
 * Obtener todas las tiendas
 * 
 * No recibe datos en el body
 * 
 * Retorna:
 * - Un arreglo de tiendas con sus IDs y otros datos
 */

// Buscar tiendas por nombre
router.get('/tienda/searchByName/:name', getTiendaByNameController);
/**
 * Buscar tiendas por nombre
 * 
 * Recibe en el parámetro :name:
 * - name (string): Nombre de la tienda a buscar
 * 
 * Retorna:
 * - Un arreglo de tiendas que coinciden con el nombre buscado
 */


export default router;