import { Usuario } from "./Usuario";
import { TiendaProductoPrecio } from "./TiendaProductoPrecio";
import { Venta } from "./Venta";
export declare class Tienda {
    id_tienda: string;
    nombre: string;
    direccion: string;
    usuarios: Usuario[];
    tiendaProductoPrecios: TiendaProductoPrecio[];
    ventas: Venta[];
}
