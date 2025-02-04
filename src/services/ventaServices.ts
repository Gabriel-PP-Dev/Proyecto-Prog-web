// src/services/ventaServices.ts
import { AppDataSource } from '../data-source';
import { Venta } from '../entities/Venta';
import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';

export const getAllVentas = async (): Promise<Venta[]> => {
    const ventaRepository = AppDataSource.getRepository(Venta);
    return await ventaRepository.find({
        relations: {
            tienda: true,
            producto_precio: {
                tienda: true
            }
        }
    });
};

export const addVenta = async (ventaData: Partial<Venta>): Promise<Venta> => {
    const ventaRepository = AppDataSource.getRepository(Venta);
    const newVenta = ventaRepository.create(ventaData);
    return await ventaRepository.save(newVenta);
};

export const getVentaById = async (id: number): Promise<Venta | null> => {
    const ventaRepository = AppDataSource.getRepository(Venta);
    return await ventaRepository.findOne({
        where: { id_venta: id },
        relations: {
            tienda: true,
            producto_precio: {
                tienda: true,
                producto_precio: true
            }
        }
    });
};

export const updateVenta = async (id: number, ventaData: Partial<Venta>): Promise<Venta | null> => {
    const ventaRepository = AppDataSource.getRepository(Venta);
    await ventaRepository.update(id, ventaData);
    return await ventaRepository.findOneBy({ id_venta: id });
};

export const deleteVenta = async (id: number): Promise<boolean> => {
    const ventaRepository = AppDataSource.getRepository(Venta);
    const result = await ventaRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};