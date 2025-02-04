import { Producto_Precio } from "./precio";

export interface Producto{
    id_producto: string;
    nombre: string;
    costo: number;
    producto_precios: any[];
}