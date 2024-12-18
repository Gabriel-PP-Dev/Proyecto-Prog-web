"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./entities/Usuario");
const Tienda_1 = require("./entities/Tienda");
const Producto_Precio_1 = require("./entities/Producto_Precio");
const Venta_1 = require("./entities/Venta");
const TiendaProductoPrecio_1 = require("./entities/TiendaProductoPrecio");
const Producto_1 = require("./entities/Producto");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres", // Cambia esto si usas otra base de datos
    host: "localhost",
    port: 5432,
    username: "postgres", // Cambia esto por tu usuario
    password: "postgreMi@", // Cambia esto por tu contraseña
    database: "WebPCDoctor", // Cambia esto por el nombre de tu base de datos
    synchronize: true, // Solo para desarrollo
    logging: false,
    entities: [Usuario_1.Usuario, Tienda_1.Tienda, Producto_Precio_1.Producto_Precio, Venta_1.Venta, TiendaProductoPrecio_1.TiendaProductoPrecio, Producto_1.Producto],
});
