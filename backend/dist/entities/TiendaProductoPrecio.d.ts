import { Tienda } from "./Tienda";
import { Producto_Precio } from "./Producto_Precio";
import { Venta } from "./Venta";
export declare class TiendaProductoPrecio {
    id_tiendaProductoPrecio: string;
    tienda: Tienda;
    producto_precios: Producto_Precio[];
    cantidad_en_tienda: number;
    ventas: Venta[];
}
