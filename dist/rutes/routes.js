"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const router = (0, express_1.Router)();
router.get('/users', usuarioController_1.getAllUsersController);
router.post('/users', usuarioController_1.addUserController);
exports.default = router;
