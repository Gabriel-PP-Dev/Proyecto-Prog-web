import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import {
  addUser,
  checkUniqueUsername,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByName,
  updateUser,
} from "../services/usuarioServices";

// Obtener todos los usuarios
export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// Agregar un nuevo usuario
export const addUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombre, nombre_usuario, contrasenna, rol, tienda, email } =
      req.body;

    // Verificar que se estén pasando todos los campos requeridos
    if (
      !nombre ||
      !nombre_usuario ||
      !contrasenna ||
      !rol ||
      !tienda ||
      email === undefined
    ) {
      res
        .status(400)
        .json({ message: "Debes proporcionar todos los campos requeridos" });
      return;
    }

    // Validar que el rol sea "Administrador" o "Trabajador"
    if (rol !== "Administrador" && rol !== "Trabajador") {
      res.status(400).json({ message: "El rol debe ser 'Administrador' o 'Trabajador'" });
      return;
    }

    // Verificar que el nombre de usuario sea único
    const isUnique = await checkUniqueUsername(nombre_usuario);
    if (!isUnique) {
      res
        .status(400)
        .json({ message: "El nombre de usuario ya existe en el sistema" });
      return;
    }

    // Validar formato de correo electrónico si se proporciona
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ message: "El correo electrónico no es válido" });
      return;
    }

    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

// Obtener un usuario por ID
export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// Actualizar un usuario
export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const { nombre, nombre_usuario, contrasenna, rol, tienda, email } = req.body;

    // Validar que se proporcione al menos un campo para actualizar
    if (
      !nombre &&
      !nombre_usuario &&
      !contrasenna &&
      !rol &&
      !tienda &&
      !email
    ) {
      res.status(400).json({
        message: "Se debe proporcionar al menos un campo para actualizar.",
      });
      return;
    }

    // Validar formato de correo electrónico si se proporciona
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ message: "El correo electrónico no es válido" });
      return;
    }

    // Validar que el rol sea "Trabajador" o "Administrador" si se proporciona
    if (rol && rol !== "Trabajador" && rol !== "Administrador") {
      res.status(400).json({ message: "El rol debe ser 'Trabajador' o 'Administrador'" });
      return;
    }

    // Crear un objeto con solo los campos proporcionados
    const fieldsToUpdate: any = {};
    if (nombre) fieldsToUpdate.nombre = nombre;
    if (nombre_usuario) fieldsToUpdate.nombre_usuario = nombre_usuario;
    if (contrasenna) fieldsToUpdate.contrasenna = contrasenna;
    if (rol) fieldsToUpdate.rol = rol;
    if (tienda) fieldsToUpdate.tienda = tienda;
    if (email) fieldsToUpdate.email = email;

    const updatedUser = await updateUser(id, fieldsToUpdate);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// Eliminar un usuario
export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await deleteUser(id);
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

// Obtener un usuario por nombre
export const getUserByNameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.params;
  try {
    const users = await getUserByName(name);
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el usuario por nombre:", error);
    res
      .status(500)
      .json({ message: "Error al obtener el usuario por nombre", error });
  }
};
