import { Request, Response } from 'express';
import { 
    addTienda,
    deleteTienda,
    getAllTiendas, 
    getTiendaById,
    getTiendaByName,
    updateTienda
} from '../services/tiendaServices';

// Obtener todas las tiendas
export const getAllTiendasController = async (req: Request, res: Response): Promise<void> => {
    try {
        const tiendas = await getAllTiendas();
        res.status(200).json(tiendas);
    } catch (error) {
        console.error('Error al obtener tiendas:', error);
        res.status(500).json({ message: 'Error al obtener tiendas', error });
    }
};

// Agregar una nueva tienda
export const addTiendaController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, direccion } = req.body;

        // Validación básica
        if (!nombre || !direccion) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const newTienda = await addTienda(req.body);
        res.status(201).json(newTienda);
    } catch (error) {
        console.error('Error al agregar tienda:', error);
        res.status(500).json({ message: 'Error al agregar tienda', error });
    }
};

// Obtener una tienda por ID
export const getTiendaByIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const tienda = await getTiendaById(Number(id));
        if (tienda) {
            res.status(200).json(tienda);
        } else {
            res.status(404).json({ message: 'Tienda no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la tienda:', error);
        res.status(500).json({ message: 'Error al obtener la tienda', error });
    }
};

// Actualizar una tienda
export const updateTiendaController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const { nombre, direccion } = req.body;

        // Validación básica
        if (!nombre || !direccion) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const updatedTienda = await updateTienda(Number(id), req.body);
        if (updatedTienda) {
            res.status(200).json(updatedTienda);
        } else {
            res.status(404).json({ message: 'Tienda no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la tienda:', error);
        res.status(500).json({ message: 'Error al actualizar la tienda', error });
    }
};

// Eliminar una tienda
export const deleteTiendaController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deleted = await deleteTienda(Number(id));
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Tienda no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la tienda:', error);
        res.status(500).json({ message: 'Error al eliminar la tienda', error });
    }
};

// Obtener tiendas cuyo nombre contenga la cadena proporcionada
export const getTiendaByNameController = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.params;
    try {
        const tiendas = await getTiendaByName(name);
        if (tiendas.length > 0) {
            res.status(200).json(tiendas);
        } else {
            res.status(404).json({ message: 'No se encontraron tiendas con ese nombre' });
        }
    } catch (error) {
        console.error('Error al obtener la tienda por nombre:', error);
        res.status(500).json({ message: 'Error al obtener la tienda por nombre', error });
    }
};