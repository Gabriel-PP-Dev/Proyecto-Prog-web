import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Producto } from "./Producto";
import { TiendaProductoPrecio } from "./TiendaProductoPrecio";

@Entity()
export class Producto_Precio {

  @PrimaryGeneratedColumn()
  id_producto_precio!: number;

  @Column()
  precio!: number;

  @ManyToOne(() => Producto, producto => producto.producto_precios)
  producto!: Producto;

  @ManyToOne(() => TiendaProductoPrecio, tiendaProductoPrecio => tiendaProductoPrecio.producto_precios)
  tiendaProductoPrecio!: TiendaProductoPrecio;
}