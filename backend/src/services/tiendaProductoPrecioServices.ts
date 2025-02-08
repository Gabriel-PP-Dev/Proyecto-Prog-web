import { AppDataSource } from '../data-source';
import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';

// Obtener todos los registros de TiendaProductoPrecio
export const getAllTiendaProductoPrecio = async (): Promise<TiendaProductoPrecio[]> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    return await tiendaProductoPrecioRepository.find({
        relations:['tienda', 'producto_precios.producto', 'ventas']
    });
};

// Agregar un nuevo registro de TiendaProductoPrecio
export const addTiendaProductoPrecio = async (tiendaProductoPrecioData: Partial<TiendaProductoPrecio>): Promise<TiendaProductoPrecio> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    const newTiendaProductoPrecio = tiendaProductoPrecioRepository.create(tiendaProductoPrecioData);
    await tiendaProductoPrecioRepository.save(newTiendaProductoPrecio);
    return newTiendaProductoPrecio;
};

// Obtener un registro de TiendaProductoPrecio por ID
export const getTiendaProductoPrecioById = async (id: string): Promise<TiendaProductoPrecio | null> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    return await tiendaProductoPrecioRepository.findOne({
        where: { id_tiendaProductoPrecio: id },
        relations:['tienda', 'producto_precios.producto', 'ventas']
    });
};

// Actualizar un registro de TiendaProductoPrecio
export const updateTiendaProductoPrecio = async (id: string, tiendaProductoPrecioData: Partial<TiendaProductoPrecio>): Promise<TiendaProductoPrecio | null> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    await tiendaProductoPrecioRepository.update(id, tiendaProductoPrecioData);
    return await tiendaProductoPrecioRepository.findOneBy({ id_tiendaProductoPrecio: id });
};

// Eliminar un registro de TiendaProductoPrecio
export const deleteTiendaProductoPrecio = async (id: string): Promise<boolean> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    const result = await tiendaProductoPrecioRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};

// Obtener todos los registros de TiendaProductoPrecio por ID de producto
export const getTiendaProductoPrecioByProductId = async (id_producto: string): Promise<TiendaProductoPrecio[]> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    return await tiendaProductoPrecioRepository.find({
        relations: ['tienda', 'producto_precios', 'producto_precios.producto', 'ventas'],
        where: {
            producto_precios: {
                producto: {
                    id_producto
                }
            }
        }
    });
};

// Obtener todos los TiendaProductoPrecio de una tienda por ID
export const getTiendaProductoPrecioByTiendaId = async (id_tienda: string): Promise<TiendaProductoPrecio[]> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    return await tiendaProductoPrecioRepository.find({
      where: { tienda: { id_tienda } },
      relations: ['tienda', 'producto_precios', 'producto_precios.producto']
    });
  };

  // Obtener todos los TiendaProductoPrecio de una tienda por ID ordenados por cantidad
export const getTiendaProductoPrecioByTiendaIdOrdenados = async (
    id_tienda: string
  ): Promise<TiendaProductoPrecio[]> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(
      TiendaProductoPrecio
    );
    return await tiendaProductoPrecioRepository.find({
      where: { tienda: { id_tienda } },
      order: { cantidad_en_tienda: 'ASC' }, // Ordenar por cantidad de menor a mayor
      relations: ['tienda', 'producto_precios', 'producto_precios.producto'],
    });
  };