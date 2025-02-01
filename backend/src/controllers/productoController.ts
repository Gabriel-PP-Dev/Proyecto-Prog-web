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
import { getTiendaById } from '../services/tiendaServices';

// Obtener productos de Tienda (id) ordenados por cantidad 
export const getProductosByTiendaSortedByQuantityController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro, id de la tienda de la que desea obtener los productos)' });
    return;
  }

  try {
    const productos = await getProductosByTiendaSortedByQuantity(id);
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

// Mover producto a otra tienda
export const moveProductoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { id_tienda_origen, id_tienda_destino, cantidad } = req.body;

    // Validación básica
    if (!id || !id_tienda_origen || !id_tienda_destino || !cantidad) {
      res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro), id_tienda_origen, id_tienda_destino y cantidad (body)' });
      return;
    }

    if (typeof cantidad !== 'number' || cantidad <= 0) {
      res.status(400).json({ message: 'La cantidad debe ser un número entero positivo' });
      return;
    }

    const producto = await getProductoById(id);
    if (!producto) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }

    const tiendaOrigen = await getTiendaById(id_tienda_origen);
    if (!tiendaOrigen) {
      res.status(404).json({ message: 'Tienda de origen no encontrada' });
      return;
    }

    const tiendaDestino = await getTiendaById(id_tienda_destino);
    if (!tiendaDestino) {
      res.status(404).json({ message: 'Tienda de destino no encontrada' });
      return;
    }

    // Mover el producto a la tienda de destino
    const resultado = await moveProducto(id, id_tienda_destino, cantidad);
    if (resultado) {
      res.status(200).json({ message: 'Producto movido con éxito' });
    } else {
      res.status(500).json({ message: 'Error al mover el producto' });
    }
  } catch (error) {
    console.error('Error al mover el producto:', error);
    res.status(500).json({ message: 'Error al mover el producto', error });
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
      const producto = await getProductoById(id);
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
  try {
    const { nombre, costo } = req.body;

    if (!nombre || !costo) {
      res.status(400).json({ message: 'Asegúrese de pasar como información: nombre, costo' });
      return;
    }

    if (typeof nombre !== 'string' || typeof costo !== 'number') {
      res.status(400).json({ message: 'Los campos deben tener el tipo de dato correcto' });
      return;
    }

    const productoData = { nombre, costo };
    const newProducto = await addProducto(productoData);
    if (newProducto) {
      res.status(201).json(newProducto);
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
  const { nombre, costo } = req.body;

  // Crear un objeto con solo los campos proporcionados
  const fieldsToUpdate: any = {};

  if (!id) {
    res.status(400).json({ message: 'Asegúrese de pasar como información: id (parámetro)' });
    return;
  }
  if (!nombre && !costo) {
    res.status(400).json({ message: 'Asegúrese de pasar como información: nombre y costo por el body' });
    return;
  }else if (typeof nombre !== 'string' || typeof costo !== 'number') {
    res.status(400).json({ message: 'Los campos deben tener el tipo de dato correcto' });
    return;
  }else{
    if (nombre) fieldsToUpdate.nombre = nombre;
    if (costo) fieldsToUpdate.costo = costo;
  }

  try {
    const updatedProducto = await updateProducto(id, fieldsToUpdate);
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
    const deletedProducto = await deleteProducto(id);
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
