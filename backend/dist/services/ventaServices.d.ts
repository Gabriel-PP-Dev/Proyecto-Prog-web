import { Venta } from '../entities/Venta';
export declare const getAllVentas: () => Promise<Venta[]>;
export declare const addVenta: (ventaData: Partial<Venta>) => Promise<Venta>;
export declare const getVentaById: (id: string) => Promise<Venta | null>;
export declare const updateVenta: (id: string, ventaData: Partial<Venta>) => Promise<Venta | null>;
export declare const deleteVenta: (id: string) => Promise<boolean>;
export declare const getVentasByTiendaId: (id_tienda: string) => Promise<Venta[]>;
export declare const exportToExcel: (data: any[], fileName: string) => Promise<Buffer>;
