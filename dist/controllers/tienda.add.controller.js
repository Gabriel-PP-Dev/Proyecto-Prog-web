"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tienda_services_1 = require("../services/tienda.services");
const addTienda = express_1.default.Router();
const tiendaService = new tienda_services_1.TiendaServices();
addTienda.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, direccion } = req.body;
    try {
        const nuevaTienda = yield tienda_services_1.TiendaServices.addTienda(nombre, direccion);
        res.json(nuevaTienda);
    }
    catch (error) {
        console.error("Error al agregar la tienda:", error);
        res.json({ message: "Error al agregar la tienda" });
    }
}));
exports.default = addTienda;
