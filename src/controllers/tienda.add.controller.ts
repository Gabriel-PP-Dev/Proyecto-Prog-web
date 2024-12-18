import express, { Request, Response } from 'express';
import { TiendaServices } from '../services/tienda.services';

const addTienda = express.Router();
const tiendaService = new TiendaServices();

addTienda.post('/', async (req: Request, res: Response) => {
    const { nombre, direccion } = req.body;

    try {
        const nuevaTienda = await TiendaServices.addTienda(nombre, direccion);
        res.json(nuevaTienda);
    } catch (error) {
        console.error("Error al agregar la tienda:", error);
        res.json({ message: "Error al agregar la tienda" });
    }
});

export default addTienda;