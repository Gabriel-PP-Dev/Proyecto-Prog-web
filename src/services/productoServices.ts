import { AppDataSource } from '../data-source';
import { Producto } from '../entities/Producto';
import { Producto_Precio } from '../entities/Producto_Precio';
import { removeAccents } from "../helpers/AuxiliarFunctions";

// Obtener todos los productos
export const getAllProductos = async (): Promise<Producto[]> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.find();
};

// Agregar un nuevo producto
export const addProducto = async (productoData: Partial<Producto> & { precio: number }): Promise<Producto | null> => {
    if((await getProductosByName(String(productoData.nombre))).length==0){
        const productoRepository = AppDataSource.getRepository(Producto);
        const newProducto = productoRepository.create(productoData);
        const productoID = await getIdByName(String(productoData.nombre));
        await productoRepository.save(newProducto);
        var newPrecio;
        if(productoID!=null){
         newPrecio = { productoId: productoID, precio: productoData.precio};
         await addPrecio(newPrecio); // Llamada a addPrecio
        }
        return newProducto;
    }else
    return null
};

// Obtener id de producto por nombre 
export const getIdByName = async (name: string): Promise<number | null> => {
    if (!name) {
        throw new Error("El nombre no puede ser vacío");
    }
    
    const productoRepository = AppDataSource.getRepository(Producto);
    const normalizedName = removeAccents(name.toLowerCase()); // Normalizar el nombre buscado

    // Obtener todos los productos y filtrar en memoria
    const productos = await productoRepository.find();

    // Buscar el primer producto que contenga el nombre normalizado
    const productoEncontrado = productos.find(producto => 
        removeAccents(producto.nombre.toLowerCase()).includes(normalizedName)
    );

    // Si se encontró un producto, retornar su ID. Si no, retornar null.
    return productoEncontrado ? productoEncontrado.id_producto : null;
};

//Agregar precio a Producto_Precio
export const addPrecio = async (productoPrecio: Partial<Producto_Precio>): Promise<Producto_Precio> => {
    const productoPrecioRepository = AppDataSource.getRepository(Producto_Precio);
    const newProductoPrecio = productoPrecioRepository.create(productoPrecio);
    return await productoPrecioRepository.save(newProductoPrecio);
};

// Obtener un producto por ID
export const getProductoById = async (id: number): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.findOneBy({ id_producto: id });
};

// Actualizar un producto
export const updateProducto = async (id: number, productoData: Partial<Producto>): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    await productoRepository.update(id, productoData);
    return await productoRepository.findOneBy({ id_producto: id });
};

// Eliminar un producto
export const deleteProducto = async (id: number): Promise<boolean> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    const result = await productoRepository.delete(id);
    
    // Verifica que result.affected no sea null o undefined
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};

// Eliminar producto en ProductoPrecio
export const deleteProductoPrecio = async (id: number): Promise<boolean> => {
    const productoPrecioRepository = AppDataSource.getRepository(Producto_Precio);
    const deleteResult = await productoPrecioRepository.delete(id);
    
    // Verifica que deleteResult.affected no sea null o undefined
    return deleteResult.affected !== null && deleteResult.affected !== undefined && deleteResult.affected > 0;
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