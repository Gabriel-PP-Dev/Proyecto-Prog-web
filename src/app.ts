import express from 'express';
import { AppDataSource } from './data-source'; // Importa la configuración de la base de datos
import usuarioRoutes from './rutes/usuarioRoutes'; // Importa las rutas de usuario
import tiendaRoutes from "./rutes/tiendaRoutes";
import ventaRoutes from './rutes/ventaRoutes';

const app = express();
app.use(express.json());

// Inicializa la conexión a la base de datos
AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos establecida");

        // Usa las rutas de usuario
        app.use('/', usuarioRoutes); // Puedes cambiar '/api' por la ruta base que desees
        // Usa las rutas de tienda
        app.use("/", tiendaRoutes)

        app.use('/', ventaRoutes);

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => console.log(error));