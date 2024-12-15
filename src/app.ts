import express from 'express';
import { AppDataSource } from './data-source'; // Importa la configuración de la base de datos
import { Usuario } from './entities/Usuario'; // Importa la entidad Usuario

const app = express();
app.use(express.json());

// Inicializa la conexión a la base de datos
AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos establecida");

        // Ejemplo de ruta
        app.get('/usuarios', async (req, res) => {
            const usuarioRepository = AppDataSource.getRepository(Usuario);
            const usuarios = await usuarioRepository.find();
            res.json(usuarios);
        });

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => console.log(error));