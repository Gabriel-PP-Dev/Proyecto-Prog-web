"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/ventaRoutes.ts
const express_1 = require("express");
const ventaController_1 = require("../controllers/ventaController");
const router = (0, express_1.Router)();
router.get('/venta', ventaController_1.getAllVentasController);
router.post('/venta/CreateVenta', ventaController_1.addVentaController);
router.get('/venta/:id', ventaController_1.getVentaByIdController);
router.put('/venta/UpdateVenta/:id', ventaController_1.updateVentaController);
router.delete('/venta/DeleteVenta/:id', ventaController_1.deleteVentaController);
// router.get('/venta/CreatePDF', exportVentasToPDFController);
exports.default = router;
