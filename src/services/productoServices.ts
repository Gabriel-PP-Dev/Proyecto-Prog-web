import { AppDataSource } from '../data-source';
import { Producto } from '../entities/Producto';
import { Tienda } from '../entities/Tienda';
import { Producto_Precio } from '../entities/Producto_Precio';
import { removeAccents } from "../helpers/AuxiliarFunctions";
import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';

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
export const getProductoById = async (id: number): Promise<Producto | null> => {
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
export const updateProducto = async (id: number, productoData: Partial<Producto>): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    await productoRepository.update(id, productoData);
    return await productoRepository.findOneBy({ id_producto: id });
  };

//editar tienda en tiendaProductoPrecio
export const moveTiendaProductoPrecio = async (idTiendaProductoPrecio: number, idTienda:number): Promise<TiendaProductoPrecio | null> => {
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
export const moveProducto = async (idProducto: number, idNuevaTienda: number): Promise<TiendaProductoPrecio[] | null> => {
  const productoRepository = AppDataSource.getRepository(Producto);
  const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);

  // Buscar el producto por su ID y obtener todos los Producto_Precio asociados
  const producto = await productoRepository.findOne({ 
    where: { id_producto: idProducto },
    relations: ['producto_precios'] 
  });

  if (!producto) {
    return null; // Devolver null si no se encuentra el producto
  }

  const productosPrecio = producto.producto_precios;

  const tiendaProductoPrecioActualizados: TiendaProductoPrecio[] = [];

  for (const productoPrecio of productosPrecio) {
    // Obtener todos los registros de TiendaProductoPrecio asociados al Producto_Precio
    const tiendaProductoPrecios = await tiendaProductoPrecioRepository.find({ 
      where: { producto_precio: { id_producto_precio: productoPrecio.id_producto_precio } } 
    });

    for (const tiendaProductoPrecio of tiendaProductoPrecios) {
      // Utilizar el servicio existente para cambiar la tienda en TiendaProductoPrecio
      const tiendaProductoActualizado = await moveTiendaProductoPrecio(tiendaProductoPrecio.id_tiendaProductoPrecio, idNuevaTienda);
      
      if (tiendaProductoActualizado) {
        tiendaProductoPrecioActualizados.push(tiendaProductoActualizado);
      }
    }
  }

  return tiendaProductoPrecioActualizados;
};


// Eliminar un producto
export const deleteProducto = async (id: number): Promise<boolean> => {
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
export const getProductosByTiendaSortedByQuantity = async (id: number): Promise<TiendaProductoPrecio[]> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    const productos = await tiendaProductoPrecioRepository.find({
      where: { tienda: { id_tienda : id } }, // Filtrar por id de la tienda
      order: { cantidad_en_tienda: "ASC" }, // Ordenar por cantidad
      relations: ["tienda", "producto_precio", "producto_precio.producto"] // Cargar las relaciones con Tienda, Producto_Precio y Producto
    });
    return productos;
  };