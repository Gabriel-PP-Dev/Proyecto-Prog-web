import { AppDataSource } from '../data-source';
import { Tienda } from '../entities/Tienda';

export class TiendaServices {
    async getAllTiendas(): Promise<Tienda[]> {
        const tiendaRepository = AppDataSource.getRepository(Tienda);
        return await tiendaRepository.find();
    }
}