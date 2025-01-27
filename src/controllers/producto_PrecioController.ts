import { Request, Response } from "express";
import { addProducto_Precio, deleteProducto_Precio, getAllProducto_Precio, getProducto_PrecioById, updateProducto_Precio } from "../services/producto_PrecioServices";

// Obtener todas los Producto_Precio
export const getAllProducto_PrecioController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const producto_Precio = await getAllProducto_Precio();
    res.status(200).json(producto_Precio);
  } catch (error) {
    console.error("Error al obtener Producto_Precio:", error);
    res.status(500).json({ message: "Error al obtener Producto_Precio", error });
  }
};

// Agregar una nuevo Producto_Precio
export const addProducto_PrecioController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { precio, id_producto, id_tiendaProductoPrecio } = req.body;

    // Validación básica
    if (!precio || !id_producto || !id_tiendaProductoPrecio) {
      res
        .status(400)
        .json({
          message:
            "El precio, id_producto, id_tiendaProductoPrecio son obligatorios para crear un Producto_precio",
        });
      return;
    }

    const newProducto_Precio = await addProducto_Precio(req.body);
    res.status(201).json(newProducto_Precio);
  } catch (error) {
    console.error("Error al agregar tienda:", error);
    res.status(500).json({ message: "Error al agregar tienda", error });
  }
};

// Obtener un Producto_Precio por ID
export const getProducto_PrecioByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    // Verificar que el id sea un numero
    if (isNaN(Number(id))) {
      res
        .status(400)
        .json({ message: "El ID proporcionado no es un número válido" });
      return;
    }

    const producto_Precio = await getProducto_PrecioById(Number(id));
    if (producto_Precio) {
      res.status(200).json(producto_Precio);
    } else {
      res.status(404).json({ message: "Producto_Precio no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el Producto_Precio:", error);
    res.status(500).json({ message: "Error al obtener el Producto_Precio", error });
  }
};

// Actualizar un Producto_Precio
export const updateProducto_PrecioController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const { precio, id_producto, id_tiendaProductoPrecio } = req.body;

    try {
      // Verificar que el id sea un numero
      if (isNaN(Number(id))) {
        res.status(400).json({ message: "El ID proporcionado no es un número válido" });
        return;
      }
  
      // Validar que al menos un campo sea proporcionado
      if (!precio && !id_producto && !id_tiendaProductoPrecio) {
        res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar." });
        return;
      }
  
      // Crear un objeto con solo los campos proporcionados
      const fieldsToUpdate: any = {};
      if (precio) fieldsToUpdate.precio = precio;
      if (id_producto) fieldsToUpdate.id_producto = id_producto;
      if (id_tiendaProductoPrecio) fieldsToUpdate.id_tiendaProductoPrecio = id_tiendaProductoPrecio;
  
      const updatedProducto_Precio = await updateProducto_Precio(Number(id), fieldsToUpdate);
      if (updatedProducto_Precio) {
        res.status(200).json(updatedProducto_Precio);
      } else {
        res.status(404).json({ message: "Producto_Precio no encontrado" });
      }
    } catch (error) {
      console.error("Error al actualizar el producto_precio:", error);
      res.status(500).json({ message: "Error al actualizar el producto_precio", error });
    }
  };

// Eliminar un Producto_Precio
export const deleteProductoPrecioController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {

    // Verificar que el id sea un numero
    if (isNaN(Number(id))) {
        res.status(400).json({ message: "El ID proporcionado no es un número válido" });
        return;
    }

    const deleted = await deleteProducto_Precio(Number(id));
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
