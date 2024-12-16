import express from 'express';
import { AppDataSource } from './data-source'; // Importa la configuración de la base de datos

const app = express();
app.use(express.json());

// Inicializa la conexión a la base de datos
AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos establecida");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => console.log(error));