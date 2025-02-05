import { Usuario } from "./usuario";
import { TiendaProductoPrecio } from "./tiendaproductoprecio";
import { Venta } from "./venta";

export interface Tienda{
    id_tienda: string;
    nombre: string;
    direccion: string;
    usuarios: Usuario[];
    tiendaProductoPrecios: TiendaProductoPrecio[];
    ventas: Venta[];
}