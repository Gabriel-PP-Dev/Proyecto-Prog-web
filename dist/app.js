"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source"); // Importa la configuración de la base de datos
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Inicializa la conexión a la base de datos
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Conexión a la base de datos establecida");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
    .catch((error) => console.log(error));
