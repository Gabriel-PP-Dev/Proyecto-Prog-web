import { AppDataSource } from '../data-source';
import { Usuario } from '../entities/Usuario';

export const getAllUsers = async () => {
    const userRepository = AppDataSource.getRepository(Usuario);
    return await userRepository.find();
};

export const addUser = async (userData: Partial<Usuario>) => {
    const userRepository = AppDataSource.getRepository(Usuario);
    const newUser = userRepository.create(userData);
    return await userRepository.save(newUser);
};
