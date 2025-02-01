// src/routes/ventaRoutes.ts
import { Router } from 'express';
import { 
    addVentaController,
    deleteVentaController,
    getAllVentasController, 
    getVentaByIdController,
    updateVentaController ,
} from '../controllers/ventaController';

const router = Router();

router.get('/venta', getAllVentasController);
router.post('/venta/CreateVenta', addVentaController);
router.get('/venta/:id', getVentaByIdController);
router.put('/venta/UpdateVenta/:id', updateVentaController);
router.delete('/venta/DeleteVenta/:id', deleteVentaController);
// router.get('/venta/CreatePDF', exportVentasToPDFController);

export default router;