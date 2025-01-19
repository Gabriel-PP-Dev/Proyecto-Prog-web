import { Request, Response } from 'express';
import { 
    getProductoById,
    moveProducto,
    getProductosByTiendaSortedByQuantity,
    addProducto,
    deleteProducto,
    getAllProductos, 
    getProductosByName,
    updateProducto,
    getTop10ProductosMasVendidos
} from '../services/productoServices';
import { Producto } from '../entities/Producto';

//obtener los 10 productos más vendidos
export const getProductosMasVendidosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos = await getTop10ProductosMasVendidos();
        if(productos!=null)
           res.status(200).json(productos);
        else
           res.status(500).json({ message: 'Aún no se han realizado ventas' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos más vendidos' });
    }
};

//obtener productos de tienda (id) ordenados ascendentemente
export const  getProductosByTiendaSortedByQuantityController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if(!id){
        res.status(400).json({ message: 'Aegúrese de pasar por parámetros: id (id de la tienda de la que desea obtener los productos)' });
        return;
    }

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
        const { id } = req.params;
        const {idTienda} = req.body;

        // Validación básica
        if (!id || !idTienda) {
            res.status(400).json({ message: 'Aegúrese de pasar como información: id (parámetro, id de tiendaProductoPrecio), idTienda (id de la tienda a la que desea mover el producto)' });
            return;
        }

        if(Number.isInteger(idTienda)){ 
        const newChange = await moveProducto(Number(id), idTienda);
        if(newChange!=null)
            res.status(201).json(newChange);
        else
           res.status(201).json({ message: 'La tienda o el producto no existen'});
        }else
        res.status(404).json({ message: 'El identificador debe ser un número entero' });
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al cambiar producto', error });
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

        if(Number.isInteger(precio) && /^-?\d+\.\d+$/.test(costo)){
            const newProducto = await addProducto(req.body);
           if(newProducto!=null)
            res.status(201).json(newProducto);
           else
           res.status(201).json({ message: 'El producto ya existe'});
        }else
        res.status(201).json({ message: 'El precio debe ser un entero y el costo debe ser un double'});
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
        if (!nombre || !costo || !id) {
            res.status(400).json({ message: 'Aegúrese de pasar como información: nombre, costo' });
            return;
        }

        if(/^-?\d+\.\d+$/.test(costo)){
            const updatedProducto = await updateProducto(Number(id), req.body);
        if (updatedProducto!=null) {
            res.status(200).json(updatedProducto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado o existente' });
        }
        }else
        res.status(404).json({ message: 'El costo debe ser un double' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto
export const deleteProductoController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if(!id){
        res.status(400).json({ message: 'Aegúrese de pasar por parámetros: id (id del producto a eliminar)' });
        return;
    }

    try {
            const deletedProducto = await deleteProducto(Number(id));
            if (deletedProducto) {
                res.status(204).json({ message: 'Producto eliminado correctamente' }); 
            } else {
                res.status(404).json({ message: 'Producto no encontrado o está relacionado con otras tablas' });
            }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

// Obtener un producto por id
export const getProductoByIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if(!id){
        res.status(400).json({ message: 'Aegúrese de pasar por parámetros: id (id del producto a obtener)' });
        return;
    }

    try {
            const productoById = await getProductoById(Number(id));
            if (productoById) {
                res.status(200).json(productoById);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// Obtener productos cuyo nombre contenga la cadena proporcionada
export const getProductosByNameController = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.params;

    if(!name){
        res.status(400).json({ message: 'Aegúrese de pasar por parámetros: name (nombre del producto a buscar)' });
        return;
    }

    try {
        const productos = await getProductosByName(String(name));
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