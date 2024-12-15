import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tienda } from "./Tienda";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id_usuario!:number

  @Column()
  nombre!: string;

  @Column()
  nombre_usuario!: string;

  @Column()
  contrasenna!: string;

  @Column()
  rol!: string;

  @ManyToOne(() => Tienda, tienda => tienda.usuarios)
  tienda!: Tienda; // Relación con la entidad Tienda
}