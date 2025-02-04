import { Producto } from "./producto";
import { TiendaProductoPrecio } from "./tiendaproductoprecio";

export interface Producto_Precio{
    id_producto_precio: string;
    precio: number;
    producto: Producto;
    tiendaProductoPrecio?: TiendaProductoPrecio;
}