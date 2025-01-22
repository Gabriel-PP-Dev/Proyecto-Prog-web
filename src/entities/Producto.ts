import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto_Precio } from "./Producto_Precio";

@Entity()
export class Producto {

  @PrimaryGeneratedColumn()
  id_producto!: number;

  @Column()
  nombre!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  costo!: number;

  @OneToMany(() => Producto_Precio, producto_precio => producto_precio.producto, { cascade: true })
  producto_precios!: Producto_Precio[];
}