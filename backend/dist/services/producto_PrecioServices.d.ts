import { Producto_Precio } from '../entities/Producto_Precio';
export declare const getAllProducto_Precio: () => Promise<Producto_Precio[]>;
export declare const addProducto_Precio: (producto_PrecioData: Partial<Producto_Precio>) => Promise<Producto_Precio>;
export declare const getProducto_PrecioById: (id: string) => Promise<Producto_Precio | null>;
export declare const updateProducto_Precio: (id: string, tiendaData: Partial<Producto_Precio>) => Promise<Producto_Precio | null>;
export declare const deleteProducto_Precio: (id: string) => Promise<boolean>;
export declare const getProducto_PrecioByProductId: (id_producto: string) => Promise<Producto_Precio[]>;
