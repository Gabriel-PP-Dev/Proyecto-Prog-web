import { Tienda } from '../entities/Tienda';
export declare class TiendaServices {
    getAllTiendas(): Promise<Tienda[]>;
    static addTienda(nombre: string, direccion: string): Promise<Tienda>;
}
