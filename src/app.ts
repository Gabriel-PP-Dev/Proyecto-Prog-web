import express from 'express';
import { AppDataSource } from './data-source'; // Importa la configuración de la base de datos
import getAll from './controllers/tienda.getAll.controller';
import addTienda from './controllers/tienda.add.controller';

const app = express();
app.use(express.json());

// Inicializa la conexión a la base de datos
AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos establecida");

        const PORT = process.env.PORT || 3000;
        //ruta para obtener todas las tiendas
        app.use('/tiendas/getAll', getAll);
        // ruta para agregar una tienda
        app.use('/tiendas/add', addTienda); 
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => console.log(error));