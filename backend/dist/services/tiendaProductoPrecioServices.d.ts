import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';
export declare const getAllTiendaProductoPrecio: () => Promise<TiendaProductoPrecio[]>;
export declare const addTiendaProductoPrecio: (tiendaProductoPrecioData: Partial<TiendaProductoPrecio>) => Promise<TiendaProductoPrecio>;
export declare const getTiendaProductoPrecioById: (id: string) => Promise<TiendaProductoPrecio | null>;
export declare const updateTiendaProductoPrecio: (id: string, tiendaProductoPrecioData: Partial<TiendaProductoPrecio>) => Promise<TiendaProductoPrecio | null>;
export declare const deleteTiendaProductoPrecio: (id: string) => Promise<boolean>;
export declare const getTiendaProductoPrecioByProductId: (id_producto: string) => Promise<TiendaProductoPrecio[]>;
export declare const getTiendaProductoPrecioByTiendaId: (id_tienda: string) => Promise<TiendaProductoPrecio[]>;
export declare const getTiendaProductoPrecioByTiendaIdOrdenados: (id_tienda: string) => Promise<TiendaProductoPrecio[]>;
