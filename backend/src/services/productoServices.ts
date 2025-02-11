import { AppDataSource } from '../data-source';
import { Producto } from '../entities/Producto';
import { Tienda } from '../entities/Tienda';
import { Producto_Precio } from '../entities/Producto_Precio';
import { removeAccents } from "../helpers/AuxiliarFunctions";
import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';
import { Venta } from '../entities/Venta';

// Obtener todos los productos
export const getAllProductos = async (): Promise<Producto[]> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.find({
        relations: {
            producto_precios: true, // Incluye la relación con Producto_Precio
        }
    });
};

// Agregar un nuevo producto
export const addProducto = async (productoData: Partial<Producto>): Promise<Producto | null> => {
    if ((await getProductosByName(String(productoData.nombre))).length == 0) {
      const productoRepository = AppDataSource.getRepository(Producto);
      const newProducto = productoRepository.create(productoData);
      return await productoRepository.save(newProducto);
    }
    return null;
  };


// Obtener un producto por ID
export const getProductoById = async (id: string): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.findOne({
        where: { id_producto: id },
        relations: {
            producto_precios: true, // Incluye la relación con Producto_Precio
        }
    });
};


// Obtener un producto por nombre
export const getProductoByName = async (name: string): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.findOne({
        where: { nombre: name },
        relations: {
            producto_precios: true, // Incluye la relación con Producto_Precio
        }
    });
};


// Actualizar un producto
export const updateProducto = async (id: string, productoData: Partial<Producto>): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    await productoRepository.update(id, productoData);
    return await productoRepository.findOneBy({ id_producto: id });
  };

//editar tienda en tiendaProductoPrecio
export const moveTiendaProductoPrecio = async (idTiendaProductoPrecio: string, idTienda:string): Promise<TiendaProductoPrecio | null> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    const tiendaRepository = AppDataSource.getRepository(Tienda);

    // Buscar el registro de TiendaProductoPrecio por su ID
    const elemento = await tiendaProductoPrecioRepository.findOneBy({ id_tiendaProductoPrecio: idTiendaProductoPrecio });

    if (!elemento) {
        return null; // Devolver null si no se encuentra el registro
    }

    // Obtener la nueva tienda basada en el ID proporcionado
    const nuevaTienda = await tiendaRepository.findOneBy({ id_tienda: idTienda });

    if (!nuevaTienda) {
        return null; // Devolver null si no se encuentra la nueva tienda
    }

    // Cambiar la tienda asociada al registro de TiendaProductoPrecio
    elemento.tienda = nuevaTienda;

    // Guardar los cambios en la base de datos
    await tiendaProductoPrecioRepository.save(elemento);

    return elemento; // Devolver el registro actualizado
};

// Mover producto a otra tienda
export const moveProducto = async (id_producto: string, id_tienda_destino: string, cantidad: number): Promise<boolean> => {
  const productoRepository = AppDataSource.getRepository(Producto);
  const productoPrecioRepository = AppDataSource.getRepository(Producto_Precio);
  const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);

  // Buscar el producto por su ID
  const producto = await productoRepository.findOne({ 
    where: { id_producto }, 
    relations: ['producto_precios'] 
  });

  if (!producto) {
    return false; // Devolver false si no se encuentra el producto
  }

  // Obtener los Producto_Precio asociados al producto
  const productoPrecios = await productoPrecioRepository.find({
    where: { producto: { id_producto } },
    relations: ['tiendaProductoPrecio']
  });

  for (const productoPrecio of productoPrecios) {
    // Obtener el TiendaProductoPrecio asociado al Producto_Precio
    const tiendaProductoPrecio = productoPrecio.tiendaProductoPrecio;

    if (tiendaProductoPrecio) {
      // Verificar si el TiendaProductoPrecio es de la tienda de origen
      if (tiendaProductoPrecio.tienda.id_tienda === id_tienda_destino) {
        // Actualizar la cantidad en la tienda de destino
        tiendaProductoPrecio.cantidad_en_tienda += cantidad;
        await tiendaProductoPrecioRepository.save(tiendaProductoPrecio);
      } else {
        // Verificar si el TiendaProductoPrecio es de la tienda de origen y tiene suficiente cantidad
        if (tiendaProductoPrecio.tienda.id_tienda !== id_tienda_destino && tiendaProductoPrecio.cantidad_en_tienda >= cantidad) {
          // Actualizar la cantidad en la tienda de origen
          tiendaProductoPrecio.cantidad_en_tienda -= cantidad;
          await tiendaProductoPrecioRepository.save(tiendaProductoPrecio);
        }
      }
    }
  }

  return true;
};


// Eliminar un producto
export const deleteProducto = async (id: string): Promise<boolean> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    const productoPrecioRepository = AppDataSource.getRepository(Producto_Precio);
  
    // Obtener el producto por su ID con todas las relaciones cargadas
    const producto = await productoRepository.findOneBy({id_producto : id});
  
    if (!producto) {
      return false; // Devolver false si no se encuentra el producto
    }
  
    const precio = await productoPrecioRepository.findOneBy({producto : producto});
    
    if (!precio){
      // Eliminar el producto en la tabla Producto
      const result = await productoRepository.delete(id);
  
      // Verificar que se haya eliminado al menos un registro
      return result.affected !== null && result.affected !== undefined && result.affected > 0;
    }else
    return false;//el producto tiene un precio en Producto_Precio, por lo que no se puede eliminar
  };


// Obtener productos cuyo nombre contenga la cadena proporcionada
export const getProductosByName = async (name: string): Promise<Producto[]> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    const normalizedName = removeAccents(name.toLowerCase()); // Normalizar el nombre buscado
  
    // Obtener todos los productos y filtrar en memoria
    const productos = await productoRepository.find({
      relations: {
        producto_precios: true, // Incluye la relación con Producto_Precio
      }
    });
  
    // Filtrar productos que contengan el nombre normalizado
    return productos.filter(producto => 
      removeAccents(producto.nombre.toLowerCase()).includes(normalizedName)
    );
  };


// Obtener productos de Tienda (id) ordenados por cantidad 
export const getProductosByTiendaSortedByQuantity = async (id: string): Promise<TiendaProductoPrecio[]> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    const productos = await tiendaProductoPrecioRepository.find({
      where: { tienda: { id_tienda : id } }, // Filtrar por id de la tienda
      order: { cantidad_en_tienda: "ASC" }, // Ordenar por cantidad
      relations: ["tienda", "producto_precio", "producto_precio.producto"] // Cargar las relaciones con Tienda, Producto_Precio y Producto
    });
    return productos;
  };