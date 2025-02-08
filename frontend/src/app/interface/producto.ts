import { Producto_Precio } from "./precio";

export interface Producto{
    id_producto: string;
    nombre: string;
    producto_precios: any[];
}