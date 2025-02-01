import { Request, Response } from 'express';
import { 
    addTiendaProductoPrecio, 
    deleteTiendaProductoPrecio, 
    getAllTiendaProductoPrecio, 
    getTiendaProductoPrecioById, 
    getTiendaProductoPrecioByProductId, 
    updateTiendaProductoPrecio 
} from '../services/tiendaProductoPrecioServices';
import { getTiendaById } from '../services/tiendaServices';
import { getProducto_PrecioById } from '../services/producto_PrecioServices';

// Obtener todos los registros de TiendaProductoPrecio
export const getAllTiendaProductoPrecioController = async (req: Request, res: Response): Promise<void> => {
    try {
        const tiendaProductoPrecio = await getAllTiendaProductoPrecio();
        res.status(200).json(tiendaProductoPrecio);
    } catch (error) {
        console.error('Error al obtener TiendaProductoPrecio:', error);
        res.status(500).json({ message: 'Error al obtener TiendaProductoPrecio', error });
    }
};

// Agregar un nuevo registro de TiendaProductoPrecio
export const addTiendaProductoPrecioController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cantidad_en_tienda, id_tienda, id_producto_precio } = req.body;

        // Validación básica
        if (!cantidad_en_tienda || !id_tienda || !id_producto_precio) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const tienda = await getTiendaById(id_tienda);
        const productoPrecio = await getProducto_PrecioById(id_producto_precio);

        if (!tienda || !productoPrecio) {
            res.status(404).json({ message: 'Tienda o producto precio no encontrado' });
            return;
        }

        const newTiendaProductoPrecio = await addTiendaProductoPrecio({ tienda, producto_precios: [productoPrecio], cantidad_en_tienda });
        res.status(201).json(newTiendaProductoPrecio);
    } catch (error) {
        console.error('Error al agregar TiendaProductoPrecio:', error);
        res.status(500).json({ message: 'Error al agregar TiendaProductoPrecio', error });
    }
};

// Obtener un registro de TiendaProductoPrecio por ID
export const getTiendaProductoPrecioByIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const tiendaProductoPrecio = await getTiendaProductoPrecioById(id);
        if (tiendaProductoPrecio) {
            res.status(200).json(tiendaProductoPrecio);
        } else {
            res.status(404).json({ message: 'TiendaProductoPrecio no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener TiendaProductoPrecio:', error);
        res.status(500).json({ message: 'Error al obtener TiendaProductoPrecio', error });
    }
};

// Actualizar un registro de TiendaProductoPrecio
export const updateTiendaProductoPrecioController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedTiendaProductoPrecio = await updateTiendaProductoPrecio(id, req.body);
        if (updatedTiendaProductoPrecio) {
            res.status(200).json(updatedTiendaProductoPrecio);
        } else {
            res.status(404).json({ message: 'TiendaProductoPrecio no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar TiendaProductoPrecio:', error);
        res.status(500).json({ message: 'Error al actualizar TiendaProductoPrecio', error });
    }
};

// Eliminar un registro de TiendaProductoPrecio
export const deleteTiendaProductoPrecioController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deleted = await deleteTiendaProductoPrecio(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'TiendaProductoPrecio no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar TiendaProductoPrecio:', error);
        res.status(500).json({ message: 'Error al eliminar TiendaProductoPrecio', error });
    }
};

export const getTiendaProductoPrecioByProductIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const tiendaProductoPrecios = await getTiendaProductoPrecioByProductId(id);
        res.status(200).json(tiendaProductoPrecios);
    } catch (error) {
        console.error('Error al obtener tiendaProductoPrecios:', error);
        res.status(500).json({ message: 'Error al obtener tiendaProductoPrecios', error });
    }
};