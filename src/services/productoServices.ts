import { AppDataSource } from '../data-source';
import { Producto } from '../entities/Producto';
import { Tienda } from '../entities/Tienda';
import { Producto_Precio } from '../entities/Producto_Precio';
import { removeAccents } from "../helpers/AuxiliarFunctions";
import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';

// Obtener todos los productos
export const getAllProductos = async (): Promise<Producto[]> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.find();
};

// Agregar un nuevo producto
export const addProducto = async (productoData: Partial<Producto> & { precio: number }): Promise<Producto | null> => {
    if ((await getProductosByName(String(productoData.nombre))).length == 0) {
        const productoRepository = AppDataSource.getRepository(Producto);
        const precioRepository = AppDataSource.getRepository(Producto_Precio);

        // Crear un nuevo producto
        const newProducto = productoRepository.create(productoData);
        await productoRepository.save(newProducto);

        // Crear un nuevo precio asociado al producto
        const newPrecio = precioRepository.create({ precio: productoData.precio, producto: newProducto });
        await precioRepository.save(newPrecio);
        return newProducto; // Devolver el producto recién creado
    }
    return null;
};


// Obtener un producto por ID
export const getProductoById = async (id: number): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.findOneBy({ id_producto: id });
};


// Obtener un producto por nombre
export const getProductoByName = async (name: string): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.findOneBy({ nombre: name});
};


// Actualizar un producto
export const updateProducto = async (id: number, productoData: Partial<Producto>): Promise<Producto | null> => {
    if((await getProductosByName(String(productoData.nombre))).length<=1 ){
    const productoRepository = AppDataSource.getRepository(Producto);
    await productoRepository.update(id, productoData);
    return await productoRepository.findOneBy({ id_producto: id });
    }else
    return null;
};

//mover producto a una tienda
export const moveProducto = async (idTiendaProductoPrecio: number, idTienda:number): Promise<TiendaProductoPrecio | null> => {
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

// Eliminar un producto
export const deleteProducto = async (id: number): Promise<boolean> => {
    const productoRepository = AppDataSource.getRepository(Producto);

    // Obtener el producto por su ID
    const producto = await productoRepository.findOneBy({id_producto: id});

    if (!producto) {
        return false; // Devolver false si no se encuentra el producto
    }

    // Eliminar los registros relacionados en la tabla Producto_Precio
    await producto.producto_precios.forEach(async (productoPrecio) => {
        await AppDataSource.getRepository(Producto_Precio).delete(productoPrecio.id_producto_precio);
    });

    // Eliminar el producto en la tabla Producto
    const result = await productoRepository.delete(id);

    // Verificar que se haya eliminado al menos un registro
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};


// Obtener productos por nombre (array)
export const getProductosByName = async (name: string): Promise<Producto[]> => {
    if (!name) {
        throw new Error("El nombre no puede ser vacío");
    }
    
    const productoRepository = AppDataSource.getRepository(Producto);
    const normalizedName = removeAccents(name.toLowerCase()); // Normalizar el nombre buscado

    // Obtener todos los productos y filtrar en memoria
    const productos = await productoRepository.find();

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
        relations: ["tienda", "producto_precio"] // Cargar las relaciones con Tienda y Producto_Precio
    });
    return productos;
};