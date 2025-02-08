import { Usuario } from "../entities/Usuario";
export declare const getAllUsers: () => Promise<Usuario[]>;
export declare const addUser: (userData: Partial<Usuario>) => Promise<Usuario>;
export declare const getUserById: (id: number) => Promise<Usuario | null>;
export declare const updateUser: (id: number, userData: Partial<Usuario>) => Promise<Usuario | null>;
export declare const deleteUser: (id: number) => Promise<boolean>;
export declare const getUserByName: (name: string) => Promise<Usuario[]>;
