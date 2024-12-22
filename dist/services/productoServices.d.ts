import { Producto } from '../entities/Producto';
import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';
export declare const getAllProductos: () => Promise<Producto[]>;
export declare const addProducto: (productoData: Partial<Producto> & {
    precio: number;
}) => Promise<Producto | null>;
export declare const getProductoById: (id: number) => Promise<Producto | null>;
export declare const getProductoByName: (name: string) => Promise<Producto | null>;
export declare const updateProducto: (id: number, productoData: Partial<Producto>) => Promise<Producto | null>;
export declare const moveProducto: (idTiendaProductoPrecio: number, idTienda: number) => Promise<TiendaProductoPrecio | null>;
export declare const deleteProducto: (id: number) => Promise<boolean>;
export declare const getProductosByName: (name: string) => Promise<Producto[]>;
export declare const getProductosByTiendaSortedByQuantity: (id: number) => Promise<TiendaProductoPrecio[]>;
