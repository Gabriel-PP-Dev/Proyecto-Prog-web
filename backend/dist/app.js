"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source"); // Importa la configuración de la base de datos
const usuarioRoutes_1 = __importDefault(require("./rutes/usuarioRoutes")); // Importa las rutas de usuario
const tiendaRoutes_1 = __importDefault(require("./rutes/tiendaRoutes"));
const productoRoutes_1 = __importDefault(require("./rutes/productoRoutes"));
const ventaRoutes_1 = __importDefault(require("./rutes/ventaRoutes"));
const producto_PrecioRoutes_1 = __importDefault(require("./rutes/producto_PrecioRoutes"));
const tiendaProductoPrecioRoutes_1 = __importDefault(require("./rutes/tiendaProductoPrecioRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Inicializa la conexión a la base de datos
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Conexión a la base de datos establecida");
    // Usa las rutas de usuario
    app.use('/', usuarioRoutes_1.default); // Puedes cambiar '/api' por la ruta base que desees
    // Usa las rutas de tienda
    app.use("/", tiendaRoutes_1.default);
    // Rutas de producto
    app.use("/", productoRoutes_1.default);
    // Rutas de venta
    app.use("/", ventaRoutes_1.default);
    // Rutas de producto_precio
    app.use("/", producto_PrecioRoutes_1.default);
    // Rutas de tiendaProductoPrecio
    app.use("/", tiendaProductoPrecioRoutes_1.default);
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
    .catch((error) => console.log(error));
