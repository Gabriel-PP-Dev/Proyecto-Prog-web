import { Usuario } from '../entities/Usuario';
export declare const getAllUsers: () => Promise<Usuario[]>;
export declare const addUser: (userData: Partial<Usuario>) => Promise<Usuario>;
