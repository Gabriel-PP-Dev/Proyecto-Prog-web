import { Request, Response } from 'express';
import { 
    moveProducto,
    getProductosByTiendaSortedByQuantity,
    addProducto,
    deleteProducto,
    getAllProductos, 
    getProductosByName,
    updateProducto,
    getProductoById
} from '../services/productoServices';

//obtener productos de tienda (id) ordenados ascendentemente
export const getProductosByTiendaSortedByQuantityController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    if (!id) {
      res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro, id de la tienda de la que desea obtener los productos)' });
      return;
    }
  
    try {
      const productos = await getProductosByTiendaSortedByQuantity(Number(id));
      if (productos) {
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

        const newChange = await moveProducto(Number(id), idTienda);
        if(newChange!=null)
            res.status(201).json(newChange);
        else
           res.status(201).json({ message: 'La tienda o el producto no existen'});
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al cambiar producto', error });
    }
};

// Obtener un producto por ID
export const getProductoByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validación básica
  if (!id) {
      res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro)' });
      return;
  }

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
  const { nombre, costo, precio } = req.body;

  if (!nombre || !costo || !precio) {
    res.status(400).json({ message: 'Asegúrese de pasar como información: nombre, costo, precio' });
    return;
  }

  if (typeof nombre !== 'string' || typeof costo !== 'string' || typeof precio !== 'number') {
    res.status(400).json({ message: 'Los campos deben tener el tipo de dato correcto' });
    return;
  }

  try {
    const productoData = { nombre, costo, precio };
    const newProducto = await addProducto(productoData);
    if (newProducto) {
      // Excluir las propiedades que crean la estructura circular
      const replacer: (key: string, value: any) => any = (key, value) => {
        if (key === 'producto_precios') {
          return undefined;
        }
        return value;
      };
      res.status(201).json(JSON.stringify(newProducto, replacer));
    } else {
      res.status(404).json({ message: 'El producto ya existe' });
    }
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).json({ message: 'Error al agregar el producto', error });
  }
};

// Actualizar un producto
export const updateProductoController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nombre, costo, precio } = req.body;
  
    if (!id || !nombre || !costo || !precio) {
      res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro), nombre, costo, precio' });
      return;
    }
  
    if (typeof nombre !== 'string' || typeof costo !== 'string' || typeof precio !== 'number') {
      res.status(400).json({ message: 'Los campos deben tener el tipo de dato correcto' });
      return;
    }
  
    try {
      const updatedProducto = await updateProducto(Number(id), req.body);
      if (updatedProducto) {
        res.status(200).json(updatedProducto);
      } else {
        res.status(404).json({ message: 'El producto no existe' });
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
  };

// Eliminar un producto
export const deleteProductoController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    if (!id) {
      res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro)' });
      return;
    }
  
    try {
      const deletedProducto = await deleteProducto(Number(id));
      if (deletedProducto) {
        res.status(204).json({ message: 'El producto ha sido eliminado' });
      } else {
        res.status(404).json({ message: 'El producto no existe' });
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  };

// Obtener productos cuyo nombre contenga la cadena proporcionada
export const getProductosByNameController = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.params;
  
    if (!name) {
      res.status(400).json({ message: 'Asegúrese de pasar como información: name (parámetro)' });
      return;
    }
  
    try {
      const productos = await getProductosByName(name);
      if (productos.length > 0) {
        res.status(200).json(productos);
      } else {
        res.status(404).json({ message: 'No se encontraron productos con ese nombre' });
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ message: 'Error al obtener los productos', error });
    }
  };