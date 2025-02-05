import { Tienda } from '../entities/Tienda';
export declare const getAllTiendas: () => Promise<Tienda[]>;
export declare const addTienda: (tiendaData: Partial<Tienda>) => Promise<Tienda>;
export declare const getTiendaById: (id: string) => Promise<Tienda | null>;
export declare const updateTienda: (id: string, tiendaData: Partial<Tienda>) => Promise<Tienda | null>;
export declare const deleteTienda: (id: string) => Promise<boolean>;
export declare const getTiendaByName: (name: string) => Promise<Tienda[]>;
