import { Tienda } from "./tienda";
import { TiendaProductoPrecio } from "./tiendaproductoprecio";

export interface Venta{
    id_venta: string;
    tienda: Tienda;
    producto_precio: TiendaProductoPrecio;
    cantidad: number;
    precio: number;
}