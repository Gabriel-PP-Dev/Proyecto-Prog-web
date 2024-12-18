import express, { Request, Response } from 'express';
import { TiendaServices } from '../services/tienda.services'; // Importa el servicio

const getAll= express.Router();
const tiendaService = new TiendaServices();

getAll.get('/', async (req: Request, res: Response) => {
    try {
        const tiendas = await tiendaService.getAllTiendas();
        res.json(tiendas);
    } catch (error) {
        console.error("Error al obtener las tiendas:", error);
        res.status(500).json({ error: 'Error al obtener las tiendas' });
    }
});

export default getAll;