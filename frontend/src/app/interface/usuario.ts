import { Tienda } from "./tienda";
export interface Usuario{
    id_usuario: string;
    nombre: string;
    nombre_usuario: string;
    contrasenna: string;
    rol: string;
    tienda: Tienda;
}
