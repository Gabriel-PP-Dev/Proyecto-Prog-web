import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './data-source'; // Importa la configuración de la base de datos
import usuarioRoutes from './rutes/usuarioRoutes'; // Importa las rutas de usuario
import tiendaRoutes from "./rutes/tiendaRoutes";
import productoRoutes from "./rutes/productoRoutes"
import ventaRoutes from './rutes/ventaRoutes';
import cors from "cors";
import producto_precio from "./rutes/producto_PrecioRoutes";
import tiendaProductoPrecio from "./rutes/tiendaProductoPrecioRoutes";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Middleware de registro
const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    res.send = (data: any) => {
      console.log(`[${req.method}] ${req.url} - : ${res.statusCode}`);
      return originalSend.call(res, data);
    };
    next();
  };

// Configuración de CORS
const corsOptions = {
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions));

AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos establecida");

        // Usa las rutas de usuario
        app.use('/', usuarioRoutes); // Puedes cambiar '/api' por la ruta base que desees
        // Usa las rutas de tienda
        app.use("/", tiendaRoutes)
        // Rutas de producto
        app.use("/", productoRoutes)
        // Rutas de venta
        app.use("/", ventaRoutes)
        // Rutas de producto_precio
        app.use("/", producto_precio)
        // Rutas de tiendaProductoPrecio
        app.use("/", tiendaProductoPrecio)

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => console.log(error));