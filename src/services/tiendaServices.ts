import { AppDataSource } from '../data-source';
import { Tienda } from '../entities/Tienda';
import { removeAccents } from "../helpers/AuxiliarFunctions";

// Obtener todas las tiendas
export const getAllTiendas = async (): Promise<Tienda[]> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    return await tiendaRepository.find({
        relations: {
            usuarios: true, // Incluye la relación con Usuario
        }
    });
};

// Agregar una nueva tienda
export const addTienda = async (tiendaData: Partial<Tienda>): Promise<Tienda> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    const newTienda = tiendaRepository.create(tiendaData);
    return await tiendaRepository.save(newTienda);
};

// Obtener una tienda por ID
export const getTiendaById = async (id: string): Promise<Tienda | null> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    return await tiendaRepository.findOne({
        where: { id_tienda: id },
        relations: {
            usuarios: true, // Incluye la relación con Usuario
        }
    });
};
// Actualizar una tienda
export const updateTienda = async (id: string, tiendaData: Partial<Tienda>): Promise<Tienda | null> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    await tiendaRepository.update(id, tiendaData);
    return await tiendaRepository.findOneBy({ id_tienda: id });
};

// Eliminar una tienda
export const deleteTienda = async (id: string): Promise<boolean> => {
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    const result = await tiendaRepository.delete(id);
    
    // Verifica que result.affected no sea null o undefined
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};

// Obtener tiendas cuyo nombre contenga la cadena proporcionada
export const getTiendaByName = async (name: string): Promise<Tienda[]> => {
    if (!name) {
        throw new Error("El nombre no puede ser vacío");
    }
    
    const tiendaRepository = AppDataSource.getRepository(Tienda);
    const normalizedName = removeAccents(name.toLowerCase()); // Normalizar el nombre buscado

    // Obtener todas las tiendas y filtrar en memoria
    const tiendas = await tiendaRepository.find({
        relations: {
            usuarios: true, // Incluye la relación con Usuario
        }
    });

    // Filtrar tiendas que contengan el nombre normalizado
    return tiendas.filter(tienda => 
        removeAccents(tienda.nombre.toLowerCase()).includes(normalizedName)
    );
};