import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Producto_Precio } from "./Producto_Precio";

@Entity()
export class Producto {

  @PrimaryGeneratedColumn("uuid")
  id_producto!: string;

  @Column()
  nombre!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  costo!: number;

  @OneToMany(() => Producto_Precio, producto_precio => producto_precio.producto, { cascade: true })
  @JoinColumn({ name: "id_producto" })
  producto_precios!: Producto_Precio[];
}