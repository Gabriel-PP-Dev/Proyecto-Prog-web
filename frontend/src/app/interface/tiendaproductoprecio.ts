import { Tienda } from "./tienda";
import { Producto_Precio } from "./precio";
import { Venta } from "./venta";

export interface TiendaProductoPrecio{
    id_tiendaProductoPrecio: string;
    tienda: Tienda;
    producto_precios: Producto_Precio[];
    cantidad_en_tienda: number;
    ventas: Venta[];
}