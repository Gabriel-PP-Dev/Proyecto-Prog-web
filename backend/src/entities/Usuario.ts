import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Tienda } from "./Tienda";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn("uuid")
  id_usuario!:string

  @Column()
  nombre!: string;

  @Column()
  nombre_usuario!: string;

  @Column()
  contrasenna!: string;

  @Column()
  rol!: string;

  @ManyToOne(() => Tienda, tienda => tienda.usuarios)
  @JoinColumn({ name: "id_tienda" })
  tienda!: Tienda; // Relación con la entidad Tienda
}