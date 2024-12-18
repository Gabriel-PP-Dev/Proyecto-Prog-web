import { AppDataSource } from '../data-source';
import { Tienda } from '../entities/Tienda';

// Obtener todas las tiendas
export const getAllTiendas = async (): Promise<Tienda[]> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    return await tiendaRepository.find();
};

// Agregar una nueva tienda
export const addTienda = async (tiendaData: Partial<Tienda>): Promise<Tienda> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    const newTienda = tiendaRepository.create(tiendaData);
    return await tiendaRepository.save(newTienda);
};

// Obtener una tienda por ID
export const getTiendaById = async (id: number): Promise<Tienda | null> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    return await tiendaRepository.findOneBy({ id_tienda: id });
};

// Actualizar una tienda
export const updateTienda = async (id: number, tiendaData: Partial<Tienda>): Promise<Tienda | null> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    await tiendaRepository.update(id, tiendaData);
    return await tiendaRepository.findOneBy({ id_tienda: id });
};

// Eliminar una tienda
export const deleteTienda = async (id: number): Promise<boolean> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    const result = await tiendaRepository.delete(id);
    
    // Verifica que result.affected no sea null o undefined
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};