import { AppDataSource } from '../data-source';
import { Producto_Precio } from '../entities/Producto_Precio';
import { removeAccents } from "../helpers/AuxiliarFunctions";

// Obtener todas las tiendas
export const getAllProducto_Precio = async (): Promise<Producto_Precio[]> => {
    const producto_precioRepository = AppDataSource.getRepository(Producto_Precio);
    return await producto_precioRepository.find({
        relations: {
            producto: true, // Incluye la relación con producto y tiendaProductoPrecio
            tiendaProductoPrecio: true
        }
    });
};

// Agregar una nueva tienda
export const addProducto_Precio = async (producto_PrecioData: Partial<Producto_Precio>): Promise<Producto_Precio> => {
    const producto_PrecioRepository = AppDataSource.getRepository(Producto_Precio);
    const newProducto_Precio = producto_PrecioRepository.create(producto_PrecioData);
    return await producto_PrecioRepository.save(newProducto_Precio);
};

// Obtener una tienda por ID
export const getProducto_PrecioById = async (id: number): Promise<Producto_Precio | null> => {
    const producto_PrecioRepository = AppDataSource.getRepository(Producto_Precio);
    return await producto_PrecioRepository.findOne({
        where: { id_producto_precio: id },
        relations: {
            producto: true, // Incluye la relación con producto y tiendaProductoPrecio
            tiendaProductoPrecio: true
        }
    });
};
// Actualizar una tienda
export const updateProducto_Precio = async (id: number, tiendaData: Partial<Producto_Precio>): Promise<Producto_Precio | null> => {
    const tiendaRepository = AppDataSource.getRepository(Producto_Precio);
    await tiendaRepository.update(id, tiendaData);
    return await tiendaRepository.findOneBy({ id_producto_precio: id });
};

// Eliminar una tienda
export const deleteProducto_Precio = async (id: number): Promise<boolean> => {
    const tiendaRepository = AppDataSource.getRepository(Producto_Precio);
    const result = await tiendaRepository.delete(id);
    
    // Verifica que result.affected no sea null o undefined
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};

// Obtener tiendas cuyo nombre contenga la cadena proporcionada
//export const getTiendaByName = async (name: string): Promise<Producto_Precio[]> => {
//    if (!name) {
//        throw new Error("El nombre no puede ser vacío");
//    }
//    
//    const tiendaRepository = AppDataSource.getRepository(Producto_Precio);
//    const normalizedName = removeAccents(name.toLowerCase()); // Normalizar el nombre buscado
//
//    // Obtener todas las tiendas y filtrar en memoria
//    const tiendas = await tiendaRepository.find({
//        relations: {
//            producto: true, // Incluye la relación con producto y tiendaProductoPrecio
//        }
//    });
//
//    // Filtrar tiendas que contengan el nombre normalizado
//    return tiendas.filter(tienda => 
//        removeAccents(tienda.nombre.toLowerCase()).includes(normalizedName)
//    );
//};