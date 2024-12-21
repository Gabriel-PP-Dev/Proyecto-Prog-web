import { Producto } from '../entities/Producto';
import { Producto_Precio } from '../entities/Producto_Precio';
export declare const getAllProductos: () => Promise<Producto[]>;
export declare const addProducto: (productoData: Partial<Producto> & {
    precio: number;
}) => Promise<Producto>;
export declare const getIdByName: (name: string) => Promise<number | null>;
export declare const addPrecio: (productoPrecio: Partial<Producto_Precio>) => Promise<Producto_Precio>;
export declare const getProductoById: (id: number) => Promise<Producto | null>;
export declare const updateProducto: (id: number, productoData: Partial<Producto>) => Promise<Producto | null>;
export declare const deleteProducto: (id: number) => Promise<boolean>;
export declare const deleteProductoPrecio: (id: number) => Promise<boolean>;
export declare const getProductosByName: (name: string) => Promise<Producto[]>;
