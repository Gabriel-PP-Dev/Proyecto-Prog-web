import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto_Precio } from "./Producto_Precio"; // Asegúrate de importar la entidad Producto_Precio

@Entity()
export class Producto {

  @PrimaryGeneratedColumn()
  id_producto!: number;

  @Column()
  nombre!: string;

  @Column()
  costo!: string;

  @OneToMany(() => Producto_Precio, producto_precio => producto_precio.producto)
  producto_precios!: Producto_Precio[]; // Relación con la entidad Producto_Precio
}