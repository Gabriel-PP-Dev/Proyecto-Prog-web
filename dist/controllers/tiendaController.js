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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTiendaByNameController = exports.deleteTiendaController = exports.updateTiendaController = exports.getTiendaByIdController = exports.addTiendaController = exports.getAllTiendasController = void 0;
const tiendaServices_1 = require("../services/tiendaServices");
// Obtener todas las tiendas
const getAllTiendasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiendas = yield (0, tiendaServices_1.getAllTiendas)();
        res.status(200).json(tiendas);
    }
    catch (error) {
        console.error('Error al obtener tiendas:', error);
        res.status(500).json({ message: 'Error al obtener tiendas', error });
    }
});
exports.getAllTiendasController = getAllTiendasController;
// Agregar una nueva tienda
const addTiendaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, direccion } = req.body;
        // Validación básica
        if (!nombre || !direccion) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        const newTienda = yield (0, tiendaServices_1.addTienda)(req.body);
        res.status(201).json(newTienda);
    }
    catch (error) {
        console.error('Error al agregar tienda:', error);
        res.status(500).json({ message: 'Error al agregar tienda', error });
    }
});
exports.addTiendaController = addTiendaController;
// Obtener una tienda por ID
const getTiendaByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tienda = yield (0, tiendaServices_1.getTiendaById)(Number(id));
        if (tienda) {
            res.status(200).json(tienda);
        }
        else {
            res.status(404).json({ message: 'Tienda no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al obtener la tienda:', error);
        res.status(500).json({ message: 'Error al obtener la tienda', error });
    }
});
exports.getTiendaByIdController = getTiendaByIdController;
// Actualizar una tienda
const updateTiendaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { nombre, direccion } = req.body;
        // Validación básica
        if (!nombre || !direccion) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }
        const updatedTienda = yield (0, tiendaServices_1.updateTienda)(Number(id), req.body);
        if (updatedTienda) {
            res.status(200).json(updatedTienda);
        }
        else {
            res.status(404).json({ message: 'Tienda no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al actualizar la tienda:', error);
        res.status(500).json({ message: 'Error al actualizar la tienda', error });
    }
});
exports.updateTiendaController = updateTiendaController;
// Eliminar una tienda
const deleteTiendaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield (0, tiendaServices_1.deleteTienda)(Number(id));
        if (deleted) {
            res.status(204).send(); // No content
        }
        else {
            res.status(404).json({ message: 'Tienda no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al eliminar la tienda:', error);
        res.status(500).json({ message: 'Error al eliminar la tienda', error });
    }
});
exports.deleteTiendaController = deleteTiendaController;
// Obtener tiendas cuyo nombre contenga la cadena proporcionada
const getTiendaByNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const tiendas = yield (0, tiendaServices_1.getTiendaByName)(name);
        if (tiendas.length > 0) {
            res.status(200).json(tiendas);
        }
        else {
            res.status(404).json({ message: 'No se encontraron tiendas con ese nombre' });
        }
    }
    catch (error) {
        console.error('Error al obtener la tienda por nombre:', error);
        res.status(500).json({ message: 'Error al obtener la tienda por nombre', error });
    }
});
exports.getTiendaByNameController = getTiendaByNameController;
