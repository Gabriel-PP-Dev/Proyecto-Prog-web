// src/routes/ventaRoutes.ts
import { Router } from 'express';
import { 
    addVentaController,
    deleteVentaController,
    getAllVentasController, 
    getVentaByIdController,
    updateVentaController ,
    exportVentasToPDFController
} from '../controllers/ventaController';

const router = Router();

router.get('/ventas', getAllVentasController);
router.post('/ventasAdd', addVentaController);
router.get('/ventas/:id', getVentaByIdController);
router.put('/ventas/:id', updateVentaController);
router.delete('/ventas/:id', deleteVentaController);
router.get('/ventasPDF', exportVentasToPDFController);

export default router;