// src/controllers/ventaController.ts
import { Request, Response } from 'express';
import { 
    addVenta,
    deleteVenta,
    exportToExcel,
    getAllVentas, 
    getVentaById,
    getVentasByTiendaId,
    updateVenta
} from '../services/ventaServices';
import fs from 'fs';
import { AppDataSource } from '../data-source';
import { Tienda } from '../entities/Tienda';
import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';
import { Venta } from '../entities/Venta';

// Obtener todas las ventas
export const getAllVentasController = async (req: Request, res: Response): Promise<void> => {
    try {
        const ventas = await getAllVentas();
        res.status(200).json(ventas);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ message: 'Error al obtener ventas', error });
    }
};

// Agregar una nueva venta
export const addVentaController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { tienda, producto_precio, cantidad, precio } = req.body;
  
      // Validar si se están pasando todos los campos requeridos
      if (!tienda || !producto_precio || !cantidad || !precio) {
        res.status(400).json({ message: 'Debes proporcionar todos los campos requeridos' });
        return;
      }
  
      // Validar si la cantidad es un número entero
      if (!Number.isInteger(cantidad)) {
        res.status(400).json({ message: 'La cantidad debe ser un número entero' });
        return;
      }
  
      // Validar si el precio es un número flotante
      if (typeof precio !== 'number') {
        res.status(400).json({ message: 'El precio debe ser un número flotante' });
        return;
      }
  
      // Validar si el ID de la tienda es un UUID válido
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(tienda)) {
        res.status(400).json({ message: 'El ID de la tienda debe ser un UUID válido' });
        return;
      }
  
      // Validar si el ID del producto precio es un UUID válido
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(producto_precio)) {
        res.status(400).json({ message: 'El ID del producto precio debe ser un UUID válido' });
        return;
      }
  
      // Comprobar si existe la tienda correspondiente a "tienda"
      const tiendaRepository = AppDataSource.getRepository(Tienda);
      const tiendaExistente = await tiendaRepository.findOne({ where: { id_tienda: tienda } });
      if (!tiendaExistente) {
        res.status(404).json({ message: 'La tienda no existe' });
        return;
      }
  
      // Comprobar si existe la tiendaProductoPrecio correspondiente a "producto_precio"
      const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
      const tiendaProductoPrecioExistente = await tiendaProductoPrecioRepository.findOne({ where: { id_tiendaProductoPrecio: producto_precio } });
      if (!tiendaProductoPrecioExistente) {
        res.status(404).json({ message: 'La tienda producto precio no existe' });
        return;
      }
  
      // Comprobar si hay suficiente cantidad en stock
      if (tiendaProductoPrecioExistente.cantidad_en_tienda - cantidad < 0) {
        res.status(400).json({ message: 'No hay suficiente cantidad en el objeto de tiendaProductoPrecio para realizar la venta' });
        return;
      }
  
      // Restar la cantidad de la venta del stock
      tiendaProductoPrecioExistente.cantidad_en_tienda -= cantidad;
      await tiendaProductoPrecioRepository.save(tiendaProductoPrecioExistente);
  
      // Crear la venta
      const newVenta = await addVenta(req.body);
      res.status(201).json(newVenta);
    } catch (error) {
      console.error('Error al agregar venta:', error);
      res.status(500).json({ message: 'Error al agregar venta', error });
    }
  };

// Obtener una venta por ID
export const getVentaByIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
      res.status(400).json({ message: 'El id debe ser un uuid válido' });
      return;
    }
  
    try {
      const venta = await getVentaById(id);
      if (venta) {
        res.status(200).json(venta);
      } else {
        res.status(404).json({ message: 'Venta no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener venta:', error);
      res.status(500).json({ message: 'Error al obtener venta', error });
    }
  };

// Actualizar una venta
export const updateVentaController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { cantidad, precio } = req.body;
  
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
      res.status(400).json({ message: 'El id debe ser un uuid válido' });
      return;
    }
  
    // Validar si se están pasando todos los campos requeridos
    if (!cantidad || !precio) {
      res.status(400).json({ message: 'Debes proporcionar todos los campos requeridos' });
      return;
    }
  
    // Validar si la cantidad es un número entero
    if (!Number.isInteger(cantidad)) {
      res.status(400).json({ message: 'La cantidad debe ser un número entero' });
      return;
    }
  
    // Validar si el precio es un número flotante
    if (typeof precio !== 'number') {
      res.status(400).json({ message: 'El precio debe ser un número flotante' });
      return;
    }
  
    try {
      // Obtener la venta por ID
      const ventaRepository = AppDataSource.getRepository(Venta);
      const venta = await ventaRepository.findOne({ where: { id_venta: id }, relations: ['producto_precio'] });
  
      if (!venta) {
        res.status(404).json({ message: 'Venta no encontrada' });
        return;
      }
  
      // Obtener el tiendaProductoPrecio correspondiente a la venta
      const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
      const tiendaProductoPrecio = await tiendaProductoPrecioRepository.findOne({ where: { id_tiendaProductoPrecio: venta.producto_precio.id_tiendaProductoPrecio } });
  
      if (!tiendaProductoPrecio) {
        res.status(404).json({ message: 'Tienda producto precio no encontrada' });
        return;
      }
  
      // Verificar si la cantidad en tiendaProductoPrecio es suficiente para realizar la venta
      const cantidadFinal = tiendaProductoPrecio.cantidad_en_tienda - venta.cantidad + cantidad;
      if (cantidadFinal < 0) {
        res.status(400).json({ message: 'No hay suficiente cantidad en stock para realizar la venta' });
        return;
      }
  
      // Actualizar la cantidad en tiendaProductoPrecio
      tiendaProductoPrecio.cantidad_en_tienda = cantidadFinal;
      await tiendaProductoPrecioRepository.save(tiendaProductoPrecio);
  
      // Actualizar la venta
      const updatedVenta = await updateVenta(id, req.body);
      if (updatedVenta) {
        res.status(200).json(updatedVenta);
      } else {
        res.status(404).json({ message: 'Venta no encontrada' });
      }
    } catch (error) {
      console.error('Error al actualizar venta:', error);
      res.status(500).json({ message: 'Error al actualizar venta', error });
    }
  };

// Eliminar una venta
export const deleteVentaController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
      res.status(400).json({ message: 'El id debe ser un uuid válido' });
      return;
    }
  
    try {
      // Obtener la venta por ID
      const ventaRepository = AppDataSource.getRepository(Venta);
      const venta = await ventaRepository.findOne({ where: { id_venta: id }, relations: ['producto_precio'] });
  
      if (!venta) {
        res.status(404).json({ message: 'Venta no encontrada' });
        return;
      }
  
      // Obtener el tiendaProductoPrecio correspondiente a la venta
      const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
      const tiendaProductoPrecio = await tiendaProductoPrecioRepository.findOne({ where: { id_tiendaProductoPrecio: venta.producto_precio.id_tiendaProductoPrecio } });
  
      if (!tiendaProductoPrecio) {
        res.status(404).json({ message: 'Tienda producto precio no encontrada' });
        return;
      }
  
      // Sumar la cantidad de la venta a la cantidad de tiendaProductoPrecio
      tiendaProductoPrecio.cantidad_en_tienda += venta.cantidad;
      await tiendaProductoPrecioRepository.save(tiendaProductoPrecio);
  
      // Eliminar la venta
      const deleted = await deleteVenta(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Venta no encontrada' });
      }
    } catch (error) {
      console.error('Error al eliminar venta:', error);
      res.status(500).json({ message: 'Error al eliminar venta', error });
    }
  };

// Obtener todas las ventas de una tienda por ID
export const getVentasByTiendaIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    // Validar si el id es un uuid válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
      res.status(400).json({ message: 'El id debe ser un uuid válido' });
      return;
    }
  
    try {
      const ventas = await getVentasByTiendaId(id);
      if (ventas) {
        res.status(200).json(ventas);
      } else {
        res.status(404).json({ message: 'No se encontraron ventas para la tienda' });
      }
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      res.status(500).json({ message: 'Error al obtener ventas', error });
    }
  };

// Exportar ventas a Excel
export const exportarVentasExcelController = async (req: Request, res: Response): Promise<void> => {
  try {
    const ventas:any[] = await getAllVentas();
    const excelData:any = [];

    ventas.forEach((venta) => {
      excelData.push({
        'ID Venta': venta.id_venta,
        'ID Tienda Producto Precio': venta.producto_precio.id_tiendaProductoPrecio,
        'Cantidad': venta.cantidad,
        'Precio': venta.precio,
        'Tienda': venta.tienda.nombre,
      });
    });
    

    const excelBuffer = await exportToExcel(excelData, 'Ventas');
    
    res.status(200).json(excelBuffer);
  } catch (error) {
    console.error('Error al exportar ventas a Excel:', error);
    res.status(500).json({ message: 'Error al exportar ventas a Excel', error });
  }
};
// Método para exportar todas las ventas a PDF
/*
export const exportVentasToPDFController = async (req: Request, res: Response): Promise<void> => {
    try {
        const ventas = await getAllVentas();

        // Crear un nuevo documento PDF
        const doc = new PDFDocument();
        const filePath = './ventas.pdf';

        // Guardar el PDF en el sistema de archivos
        doc.pipe(fs.createWriteStream(filePath));

        // Agregar un título
        doc.fontSize(25).text('Reporte de Ventas', { align: 'center' });
        doc.moveDown();

        // Agregar las ventas al PDF
        ventas.forEach(venta => {
            doc.fontSize(12).text(`ID Venta: ${venta.id_venta}`);
            doc.text(`Tienda: ${venta.tienda.nombre}`);
            doc.text(`Cantidad: ${venta.cantidad}`);
            doc.text(`Precio Total: ${venta.precio}`);
            doc.moveDown();
        });

        // Finalizar el documento
        doc.end();

    } catch (error) {
        console.error('Error al exportar ventas a PDF:', error);
        res.status(500).json({ message: 'Error al exportar ventas a PDF', error });
    }
};
*/