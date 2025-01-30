import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Producto } from "./Producto";
import { TiendaProductoPrecio } from "./TiendaProductoPrecio";

@Entity()
export class Producto_Precio {
  @PrimaryGeneratedColumn("uuid")
  id_producto_precio!: string;

  @Column("decimal", { precision: 10, scale: 2 })
precio!: number;

  @ManyToOne(() => Producto, (producto) => producto.producto_precios)
  producto!: Producto;
  @JoinColumn({ name: "id_producto"})

  @ManyToOne(
    () => TiendaProductoPrecio,
    (tiendaProductoPrecio) => tiendaProductoPrecio.producto_precios,
    { nullable: true }
  )
  @JoinColumn({ name: "id_tiendaProductoPrecio" })
  tiendaProductoPrecio?: TiendaProductoPrecio;
}
