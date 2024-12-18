import { AppDataSource } from '../data-source';
import { Tienda } from '../entities/Tienda';

export class TiendaServices {
    async getAllTiendas(): Promise<Tienda[]> {
        const tiendaRepository = AppDataSource.getRepository(Tienda);
        return await tiendaRepository.find();
    }

    static async addTienda(nombre: string, direccion: string): Promise<Tienda> {
        const tienda = new Tienda();
        tienda.nombre = nombre;
        tienda.direccion = direccion;

        try {
            const tiendaRepository = AppDataSource.getRepository(Tienda);
            const nuevaTienda = await tiendaRepository.save(tienda);
            return nuevaTienda;
        } catch (error) {
            throw new Error("Error al crear la tienda.");
        }
    }
}