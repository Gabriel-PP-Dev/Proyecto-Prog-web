import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid") // Usamos UUID como ejemplo
  id!: string; // Cambiamos el tipo a string para que sea una secuencia de caracteres

  // Puedes agregar otros campos comunes aquí si es necesario
}