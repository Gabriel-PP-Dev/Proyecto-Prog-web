import { Tienda } from '../entities/Tienda';
export declare const getAllTiendas: () => Promise<Tienda[]>;
export declare const addTienda: (tiendaData: Partial<Tienda>) => Promise<Tienda>;
export declare const getTiendaById: (id: number) => Promise<Tienda | null>;
export declare const updateTienda: (id: number, tiendaData: Partial<Tienda>) => Promise<Tienda | null>;
export declare const deleteTienda: (id: number) => Promise<boolean>;
