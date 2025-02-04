import { Venta } from '../entities/Venta';
export declare const getAllVentas: () => Promise<Venta[]>;
export declare const addVenta: (ventaData: Partial<Venta>) => Promise<Venta>;
export declare const getVentaById: (id: number) => Promise<Venta | null>;
export declare const updateVenta: (id: number, ventaData: Partial<Venta>) => Promise<Venta | null>;
export declare const deleteVenta: (id: number) => Promise<boolean>;
