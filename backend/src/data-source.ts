import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario";
import { Tienda } from "./entities/Tienda";
import { Producto_Precio } from "./entities/Producto_Precio";
import { Venta } from "./entities/Venta";
import { TiendaProductoPrecio } from "./entities/TiendaProductoPrecio";
import { Producto } from "./entities/Producto";

export const AppDataSource = new DataSource({
    type: "postgres", // Cambia esto si usas otra base de datos
    host: "localhost",
    port: 5433,
    username: "postgres", // Cambia esto por tu usuario
    password: "pg", // Cambia esto por tu contraseña
    database: "WebPCDoctor", // Cambia esto por el nombre de tu base de datos
    synchronize: true, // Solo para desarrollo
    logging: false,
    entities: [Usuario, Tienda, Producto_Precio, Venta, TiendaProductoPrecio, Producto],
});