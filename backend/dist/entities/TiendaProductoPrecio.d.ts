import { Tienda } from "./Tienda";
import { Producto_Precio } from "./Producto_Precio";
import { Venta } from "./Venta";
export declare class TiendaProductoPrecio {
    id_tiendaProductoPrecio: number;
    tienda: Tienda;
    producto_precio: Producto_Precio;
    cantidad_en_tienda: string;
    ventas: Venta[];
}
