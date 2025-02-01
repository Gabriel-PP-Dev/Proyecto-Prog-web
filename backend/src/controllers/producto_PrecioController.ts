import { Request, Response } from "express";
import { addProducto_Precio, deleteProducto_Precio, getAllProducto_Precio, getProducto_PrecioById, getProducto_PrecioByProductId, updateProducto_Precio } from "../services/producto_PrecioServices";

// Obtener todas los producto_precio
export const getAllProducto_PrecioController = async (req: Request, res: Response): Promise<void> => {
  try {
    const producto_Precio = await getAllProducto_Precio();
    res.status(200).json(producto_Precio.map((precio) => ({ ...precio, precio: Number(precio.precio) })));
  } catch (error) {
    console.error('Error al obtener productoPrecio:', error);
    res.status(500).json({ message: 'Error al obtener productoPrecio', error });
  }
};

// Agregar un nuevo producto_precio
export const addProducto_PrecioController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { precio, producto } = req.body;

    if (!producto || !precio) {
      res.status(400).json({ message: 'Deve proporcionar un producto:{id_producto: number} y un precio: decimal' });
      return;
    }
    if (typeof precio !== 'number') {
      res.status(400).json({ message: 'El precio debe ser un número decimal' });
      return;
    }

    const newProducto_Precio = await addProducto_Precio(req.body);
    res.status(201).json(newProducto_Precio);
  } catch (error) {
    console.error('Error al agregar productoPrecio:', error);
    res.status(500).json({ message: 'Error al agregar productoPrecio', error });
  }
};

// Actualizar un producto_precio
export const updateProducto_PrecioController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { precio, producto } = req.body;

    // Crear un objeto con solo los campos proporcionados
    const fieldsToUpdate: any = {};
    if (precio) fieldsToUpdate.precio = precio;
    if (producto) fieldsToUpdate.producto = producto;

    const updatedProducto_Precio = await updateProducto_Precio(id, fieldsToUpdate);
    res.status(200).json(updatedProducto_Precio);
  } catch (error) {
    console.error('Error al actualizar productoPrecio:', error);
    res.status(500).json({ message: 'Error al actualizar productoPrecio', error });
  }
};

// Obtener un Producto_Precio por ID
export const getProducto_PrecioByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ message: "Deve proporcionar un id" });
      return;
    }
    const producto_Precio = await getProducto_PrecioById(id);
    if (producto_Precio) {
      res.status(200).json({ ...producto_Precio, precio: Number(producto_Precio.precio) });
    } else {
      res.status(404).json({ message: "Producto_Precio no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el Producto_Precio:", error);
    res.status(500).json({ message: "Error al obtener el Producto_Precio", error });
  }
};

// Obtener todos los producto_precio por ID de producto
export const getProducto_PrecioByProductIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {

    const producto_Precio = await getProducto_PrecioByProductId(id);
    if (producto_Precio) {
      res.status(200).json(producto_Precio.map((precio) => ({ ...precio, precio: Number(precio.precio) })));
    } else {
      res.status(404).json({ message: "No se encontraron producto_precio para el ID de producto proporcionado" });
    }
  } catch (error) {
    console.error("Error al obtener los producto_precio:", error);
    res.status(500).json({ message: "Error al obtener los producto_precio", error });
  }
};

// Eliminar un Producto_Precio
export const deleteProductoPrecioController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {

    const deleted = await deleteProducto_Precio(id);
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: "Producto_Precio no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar el Producto_Precio:", error);
    res.status(500).json({ message: "Error al eliminar el Producto_Precio", error });
  }
};
