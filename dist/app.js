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
const data_source_1 = require("./data-source"); // Importa la configuración de la base de datos
const Usuario_1 = require("./entities/Usuario"); // Importa la entidad Usuario
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Inicializa la conexión a la base de datos
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Conexión a la base de datos establecida");
    // Ejemplo de ruta
    app.get('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
        const usuarios = yield usuarioRepository.find();
        res.json(usuarios);
    }));
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
    .catch((error) => console.log(error));
