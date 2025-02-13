import { Usuario } from "../entities/Usuario";
export declare const getAllUsers: () => Promise<Usuario[]>;
export declare const addUser: (userData: Partial<Usuario>) => Promise<Usuario>;
export declare const getUserById: (id: string) => Promise<Usuario | null>;
export declare const updateUser: (id: string, userData: Partial<Usuario>) => Promise<Usuario | null>;
export declare const deleteUser: (id: string) => Promise<boolean>;
export declare const checkUniqueUsername: (nombre_usuario: string) => Promise<boolean>;
export declare const getUserByName: (name: string) => Promise<Usuario[]>;
export declare const authenticateUser: (nombre_usuario: string, contrasenna: string) => Promise<Usuario | null>;
