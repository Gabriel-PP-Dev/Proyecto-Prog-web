import { Producto } from "./Producto";
import { TiendaProductoPrecio } from "./TiendaProductoPrecio";
export declare class Producto_Precio {
    id_producto_precio: string;
    precio: number;
    producto: Producto;
    tiendaProductoPrecio?: TiendaProductoPrecio;
}
