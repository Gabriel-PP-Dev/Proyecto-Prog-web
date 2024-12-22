import { Request, Response } from 'express';
import { 
    moveProducto,
    getProductosByTiendaSortedByQuantity,
    addProducto,
    deleteProducto,
    getAllProductos, 
    getProductosByName,
    updateProducto
} from '../services/productoServices';

//obtener productos de tienda (id) ordenados ascendentemente
export const  getProductosByTiendaSortedByQuantityController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const productos = await  getProductosByTiendaSortedByQuantity(Number(id));
        if (productos!=null) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ message: 'Tienda no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

//mover producto a otra tienda
export const moveProductoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { idTiendaProductoPrecio, idTienda} = req.body;

        // Validación básica
        if (!idTiendaProductoPrecio || !idTienda) {
            res.status(400).json({ message: 'Aegúrese de pasar como información: idTiendaProductoPrecio, idTienda' });
            return;
        }

        const newChange = await moveProducto(idTiendaProductoPrecio, idTienda);
        if(newChange!=null)
            res.status(201).json(newChange);
        else
           res.status(201).json({ message: 'La tienda o el producto no existen'});
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
};


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


// Agregar un nuevo producto
export const addProductoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, costo, precio} = req.body;

        // Validación básica
        if (!nombre || !costo || !precio) {
            res.status(400).json({ message: 'Aegúrese de pasar como información: nombre, costo, precio' });
            return;
        }

        const newProducto = await addProducto(req.body);
        if(newProducto!=null)
            res.status(201).json(newProducto);
        else
           res.status(201).json({ message: 'El producto ya existe'});
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
};

// Actualizar un producto
export const updateProductoController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const { nombre, costo } = req.body;

        // Validación básica
        if (!nombre || !costo) {
            res.status(400).json({ message: 'Aegúrese de pasar como información: nombre, costo' });
            return;
        }

        const updatedProducto = await updateProducto(Number(id), req.body);
        if (updatedProducto!=null) {
            res.status(200).json(updatedProducto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado o existente' });
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
        const deletedProducto = await deleteProducto(Number(id));
        if (deletedProducto) {
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