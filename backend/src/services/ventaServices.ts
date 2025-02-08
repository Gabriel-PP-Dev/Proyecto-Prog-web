// src/services/ventaServices.ts
import { AppDataSource } from '../data-source';
import { Venta } from '../entities/Venta';
import * as XLSX from 'xlsx';
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

export const getVentaById = async (id: string): Promise<Venta | null> => {
    const ventaRepository = AppDataSource.getRepository(Venta);
    return await ventaRepository.findOne({
        where: { id_venta: id },
        relations: {
            tienda: true,
            producto_precio: {
                tienda: true,
                producto_precios: true
            }
        }
    });
};

export const updateVenta = async (id: string, ventaData: Partial<Venta>): Promise<Venta | null> => {
    const ventaRepository = AppDataSource.getRepository(Venta);
    await ventaRepository.update(id, ventaData);
    return await ventaRepository.findOneBy({ id_venta: id });
};

export const deleteVenta = async (id: string): Promise<boolean> => {
    const ventaRepository = AppDataSource.getRepository(Venta);
    const result = await ventaRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};

// Obtener todas las ventas de una tienda por ID
export const getVentasByTiendaId = async (id_tienda: string): Promise<Venta[]> => {
    const ventaRepository = AppDataSource.getRepository(Venta);
    return await ventaRepository.find({
      where: { tienda: { id_tienda } },
      relations: {
        tienda: true,
        producto_precio: {
          tienda: true
        }
      }
    });
  };

  export const exportToExcel = async (data: any[], fileName: string): Promise<Buffer> => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
    return excelBuffer;
  };