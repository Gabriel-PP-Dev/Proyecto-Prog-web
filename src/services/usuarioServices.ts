import { AppDataSource } from '../data-source';
import { Usuario } from '../entities/Usuario';

// Obtener todos los usuarios
export const getAllUsers = async (): Promise<Usuario[]> => {
    const userRepository = AppDataSource.getRepository(Usuario);
    return await userRepository.find();
};

// Agregar un nuevo usuario
export const addUser  = async (userData: Partial<Usuario>): Promise<Usuario> => {
    const userRepository = AppDataSource.getRepository(Usuario);
    const newUser  = userRepository.create(userData);
    return await userRepository.save(newUser );
};

// Obtener un usuario por ID
export const getUserById = async (id: number): Promise<Usuario | null> => {
    const userRepository = AppDataSource.getRepository(Usuario);
    return await userRepository.findOneBy({ id_usuario: id });
};

// Actualizar un usuario
export const updateUser  = async (id: number, userData: Partial<Usuario>): Promise<Usuario | null> => {
    const userRepository = AppDataSource.getRepository(Usuario);
    await userRepository.update(id, userData);
    return await userRepository.findOneBy({ id_usuario: id });
};

// Eliminar un usuario
export const deleteUser  = async (id: number): Promise<boolean> => {
    const userRepository = AppDataSource.getRepository(Usuario);
    const result = await userRepository.delete(id);
    
    // Verifica que result.affected no sea null o undefined
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};