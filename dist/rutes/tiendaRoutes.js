"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiendaController_1 = require("../controllers/tiendaController");
const router = (0, express_1.Router)();
// Obtener todas las tiendas
router.get('/tienda', tiendaController_1.getAllTiendasController);
// Agregar una nueva tienda
router.post('/tienda/createTienda', tiendaController_1.addTiendaController);
// Obtener una tienda por ID
router.get('/tienda/:id', tiendaController_1.getTiendaByIdController);
// Actualizar una tienda
router.put('/tienda/updateTienda/:id', tiendaController_1.updateTiendaController);
// Eliminar una tienda
router.delete('/tienda/deleteTienda/:id', tiendaController_1.deleteTiendaController);
exports.default = router;
