// src/routes/ventaRoutes.ts
import { Router } from 'express';
import { 
    addVentaController,
    deleteVentaController,
    exportarVentasExcelController,
    getAllVentasController, 
    getVentaByIdController,
    getVentasByTiendaIdController,
    updateVentaController ,
} from '../controllers/ventaController';

const router = Router();

/**
 * Obtener todas las ventas.
 * 
 * Método: GET
 * Ruta: /venta
 * Parámetros: Ninguno
 * Retorna: Un arreglo de objetos con información de las ventas.
 */
router.get('/venta', getAllVentasController);

/**
 * Agregar una nueva venta.
 * 
 * Método: POST
 * Ruta: /venta/CreateVenta
 * Parámetros: 
 *  - id_tienda (requerido): ID de la tienda.
 *  - id_producto_precio (requerido): ID del producto precio.
 *  - cantidad (requerido): Cantidad de la venta.
 *  - precio (requerido): Precio de la venta.
 * Retorna: Un objeto con información de la venta creada.
 */
router.post('/venta/CreateVenta', addVentaController);

/**
 * Obtener una venta por ID.
 * 
 * Método: GET
 * Ruta: /venta/:id
 * Parámetros: 
 *  - id (requerido): ID de la venta.
 * Retorna: Un objeto con información de la venta.
 */
router.get('/venta/:id', getVentaByIdController);

/**
 * Actualizar una venta.
 * 
 * Método: PUT
 * Ruta: /venta/UpdateVenta/:id
 * Parámetros: 
 *  - id (requerido): ID de la venta.
 *  - cantidad (opcional): Cantidad de la venta.
 *  - precio (opcional): Precio de la venta.
 * Retorna: Un objeto con información de la venta actualizada.
 */
router.put('/venta/UpdateVenta/:id', updateVentaController);

/**
 * Eliminar una venta.
 * 
 * Método: DELETE
 * Ruta: /venta/DeleteVenta/:id
 * Parámetros: 
 *  - id (requerido): ID de la venta.
 * Retorna: Un mensaje de confirmación de eliminación.
 */
router.delete('/venta/DeleteVenta/:id', deleteVentaController);

/**
 * Obtener todas las ventas de una tienda por ID.
 * 
 * Método: GET
 * Ruta: /venta/tienda/:id
 * Parámetros: 
 *  - id (requerido): ID de la tienda.
 * Retorna: Un arreglo de objetos con información de las ventas.
 */
router.get('/venta/tienda/:id', getVentasByTiendaIdController);

/**
 * Exportar todas las ventas a un archivo Excel.
 * 
 * Método: GET
 * Ruta: /venta_exportar-excel
 * Parámetros: Ninguno
 * Retorna: Un archivo Excel con información de las ventas.
 * 
 * Nota: El archivo se descargará automáticamente con el nombre "ventas.xlsx".
 */
router.get('/venta_exportar-excel', exportarVentasExcelController);

export default router;