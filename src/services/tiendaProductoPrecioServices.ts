import { AppDataSource } from '../data-source';
import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';

// Obtener todos los registros de TiendaProductoPrecio
export const getAllTiendaProductoPrecio = async (): Promise<TiendaProductoPrecio[]> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    return await tiendaProductoPrecioRepository.find({
        relations: ['tienda', 'producto_precio', 'ventas']
    });
};

// Agregar un nuevo registro de TiendaProductoPrecio
export const addTiendaProductoPrecio = async (tiendaProductoPrecioData: Partial<TiendaProductoPrecio>): Promise<TiendaProductoPrecio> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    const newTiendaProductoPrecio = tiendaProductoPrecioRepository.create(tiendaProductoPrecioData);
    return await tiendaProductoPrecioRepository.save(newTiendaProductoPrecio);
};

// Obtener un registro de TiendaProductoPrecio por ID
export const getTiendaProductoPrecioById = async (id: number): Promise<TiendaProductoPrecio | null> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    return await tiendaProductoPrecioRepository.findOne({
        where: { id_tiendaProductoPrecio: id },
        relations: ['tienda', 'producto_precio', 'ventas']
    });
};

// Actualizar un registro de TiendaProductoPrecio
export const updateTiendaProductoPrecio = async (id: number, tiendaProductoPrecioData: Partial<TiendaProductoPrecio>): Promise<TiendaProductoPrecio | null> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    await tiendaProductoPrecioRepository.update(id, tiendaProductoPrecioData);
    return await tiendaProductoPrecioRepository.findOneBy({ id_tiendaProductoPrecio: id });
};

// Eliminar un registro de TiendaProductoPrecio
export const deleteTiendaProductoPrecio = async (id: number): Promise<boolean> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    const result = await tiendaProductoPrecioRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};