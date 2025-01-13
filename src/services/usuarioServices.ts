import { AppDataSource } from "../data-source";
import { Tienda } from "../entities/Tienda";
import { Usuario } from "../entities/Usuario";
import { removeAccents } from "../helpers/AuxiliarFunctions";
import { comparePassword, encryptPassword } from "../helpers/passwordService";

// Obtener todos los usuarios con su tienda asociada
export const getAllUsers = async (): Promise<Usuario[]> => {
  const userRepository = AppDataSource.getRepository(Usuario);
  return await userRepository.find({
    relations: {
      tienda: true,
    },
  });
};

// Agregar un nuevo usuario con su tienda asociada
export const addUser = async (userData: Partial<Usuario>): Promise<Usuario> => {
  const userRepository = AppDataSource.getRepository(Usuario);

  // Verifica si userData.tienda está definido
  if (!userData.tienda || !userData.tienda.id_tienda) {
    throw new Error("ID de tienda no proporcionado");
  }

  const newTienda = await AppDataSource.getRepository(Tienda).findOne({
    where: { id_tienda: userData.tienda.id_tienda },
  });

  if (!newTienda) {
    throw new Error("Tienda no encontrada");
  }

  if (userData.contrasenna) {
    const hashedPassword = await encryptPassword(userData.contrasenna);
    const newUser = userRepository.create({ ...userData, contrasenna: hashedPassword });
    newUser.tienda = newTienda;
    await userRepository.save(newUser);
    return newUser;
  }else{
    throw new Error("La contraseña es null o undefine")
  }
};

// Obtener un usuario por ID con su tienda asociada
export const getUserById = async (id: number): Promise<Usuario | null> => {
  const userRepository = AppDataSource.getRepository(Usuario);
  return await userRepository.findOne({
    where: { id_usuario: id },
    relations: {
      tienda: true,
    },
  });
};

// Actualizar un usuario con su tienda asociada
export const updateUser = async (id: number, userData: Partial<Usuario>): Promise<Usuario | null> => {
  const userRepository = AppDataSource.getRepository(Usuario);
  const user = await userRepository.findOne({
    where: { id_usuario: id },
    relations: {
      tienda: true,
    },
  });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  if (userData.tienda) {
    const newTienda = await AppDataSource.getRepository(Tienda).findOne({
      where: { id_tienda: userData.tienda.id_tienda },
    });
    if (!newTienda) {
      throw new Error("Tienda no encontrada");
    }
    user.tienda = newTienda;
  }
  if (userData.contrasenna) {
    const hashedPassword = await encryptPassword(userData.contrasenna);
    user.contrasenna = hashedPassword;
  }
  await userRepository.update(id, userData);
  return await userRepository.findOne({
    where: { id_usuario: id },
    relations: {
      tienda: true,
    },
  });
};

// Eliminar un usuario
export const deleteUser = async (id: number): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(Usuario);
  const result = await userRepository.delete(id);

  // Verifica que result.affected no sea null o undefined
  return (
    result.affected !== null &&
    result.affected !== undefined &&
    result.affected > 0
  );
};

export const checkUniqueUsername = async (nombre_usuario: string): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(Usuario);
  const existingUser   = await userRepository.findOneBy({ nombre_usuario });
  return existingUser  === null;
};

// Obtener usuarios cuyo nombre contenga la cadena proporcionada
export const getUserByName = async (name: string): Promise<Usuario[]> => {
  if (!name) {
      throw new Error("El nombre no puede ser vacío");
  }
  
  const userRepository = AppDataSource.getRepository(Usuario);
  const normalizedName = removeAccents(name.toLowerCase()); // Normalizar el nombre buscado

  // Obtener todos los usuarios y filtrar en memoria
  const users = await userRepository.find({
      relations: {
          tienda: true, // Asegúrate de incluir la relación si es necesario
      }
  });

  // Filtrar usuarios que contengan el nombre normalizado
  return users.filter(user => 
      removeAccents(user.nombre.toLowerCase()).includes(normalizedName)
  );
};

export const authenticateUser  = async (nombre_usuario: string, contrasenna: string): Promise<Usuario | null> => {
  const userRepository = AppDataSource.getRepository(Usuario);
  const user = await userRepository.findOneBy({ nombre_usuario });
  if (user) {
    const isValidPassword = await comparePassword(contrasenna, user.contrasenna);
    if (isValidPassword) {
      return user;
    }
  }
  return null;
};
