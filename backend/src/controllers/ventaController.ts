// src/controllers/ventaController.ts
import { Request, Response } from 'express';
import { 
    addVenta,
    deleteVenta,
    getAllVentas, 
    getVentaById,
    updateVenta
} from '../services/ventaServices';
import fs from 'fs';

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
    try {
        const venta = await getVentaById(String(id));
        if (venta) {
            res.status(200).json(venta);
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la venta:', error);
        res.status(500).json({ message: 'Error al obtener la venta', error });
    }
};

// Actualizar una venta
export const updateVentaController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedVenta = await updateVenta(String(id), req.body);
        if (updatedVenta) {
            res.status(200).json(updatedVenta);
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la venta:', error);
        res.status(500).json({ message: 'Error al actualizar la venta', error });
    }
};

// Eliminar una venta
export const deleteVentaController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deleted = await deleteVenta(Number(id));
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
        res.status(500).json({ message: 'Error al eliminar la venta', error });
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