import { Tienda } from "./Tienda";
import { TiendaProductoPrecio } from "./TiendaProductoPrecio";
export declare class Venta {
    id_venta: string;
    tienda: Tienda;
    producto_precio: TiendaProductoPrecio;
    cantidad: number;
    precio: number;
}
