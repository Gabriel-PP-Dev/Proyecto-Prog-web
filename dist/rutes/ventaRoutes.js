"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/ventaRoutes.ts
const express_1 = require("express");
const ventaController_1 = require("../controllers/ventaController");
const router = (0, express_1.Router)();
router.get('/ventas', ventaController_1.getAllVentasController);
router.post('/ventasAdd', ventaController_1.addVentaController);
router.get('/ventas/:id', ventaController_1.getVentaByIdController);
router.put('/ventas/:id', ventaController_1.updateVentaController);
router.delete('/ventas/:id', ventaController_1.deleteVentaController);
router.get('/ventasPDF', ventaController_1.exportVentasToPDFController);
exports.default = router;
