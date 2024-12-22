import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { TiendaProductoPrecio } from "./TiendaProductoPrecio"; // Asegúrate de importar la entidad TiendaProductoPrecio
import { Venta } from "./Venta"; // Asegúrate de importar la entidad Venta
import { Producto } from "./Producto";

@Entity()
export class Producto_Precio {

  @PrimaryGeneratedColumn()
  id_producto_precio!: number;

  @Column()
  precio!: number;

  @OneToMany(() => TiendaProductoPrecio, tiendaProductoPrecio => tiendaProductoPrecio.producto_precio)
  tiendaProductoPrecios!: TiendaProductoPrecio[]; // Relación con la tabla de unión

  @ManyToOne(() => Producto, producto => producto.producto_precios)
  producto!: Producto; // Relación con la entidad Producto
}