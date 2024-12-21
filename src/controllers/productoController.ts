import { Request, Response } from 'express';
import { 
    deleteProductoPrecio,
    addPrecio,
    addProducto,
    deleteProducto,
    getAllProductos, 
    getProductoById,
    getProductosByName,
    updateProducto
} from '../services/productoServices';

// Obtener todos los productos
export const getAllProductosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos = await getAllProductos();
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

// Agregar un nuevo precio
export const addPrecioController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productoId, precio} = req.body;

        // Validación básica
        if (!productoId || !precio) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const newPrecio = await addPrecio(req.body);
        res.status(201).json(newPrecio);
    } catch (error) {
        console.error('Error al agregar precio:', error);
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
};

// Agregar un nuevo producto
export const addProductoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, costo, precio} = req.body;

        // Validación básica
        if (!nombre || !costo || !precio) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const newProducto = await addProducto(req.body);
        res.status(201).json(newProducto);
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
};

// Obtener un producto por ID
export const getProductoByIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const producto = await getProductoById(Number(id));
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// Actualizar un producto
export const updateProductoController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const { nombre, costo } = req.body;

        // Validación básica
        if (!nombre || !costo) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const updatedTienda = await updateProducto(Number(id), req.body);
        if (updatedTienda) {
            res.status(200).json(updatedTienda);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto
export const deleteProductoController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedPrecio = await deleteProductoPrecio(Number(id))
        const deletedProducto = await deleteProducto(Number(id));
        if (deletedProducto && deletedPrecio) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

// Obtener productos cuyo nombre contenga la cadena proporcionada
export const getProductosByNameController = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.params;
    try {
        const productos = await getProductosByName(name);
        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ message: 'No se encontraron productos con ese nombre' });
        }
    } catch (error) {
        console.error('Error al obtener el producto por nombre:', error);
        res.status(500).json({ message: 'Error al obtener el producto por nombre', error });
    }
};