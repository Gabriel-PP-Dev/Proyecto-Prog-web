import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { TiendaProductoPrecio } from "./TiendaProductoPrecio"; // Asegúrate de importar la entidad TiendaProductoPrecio
import { Venta } from "./Venta"; // Asegúrate de importar la entidad Venta
import { Producto } from "./Producto";

@Entity()
export class Producto_Precio {

  @PrimaryGeneratedColumn()
  id_producto_precio!: number;

  @Column()
  precio!: number;

  @Column()
  productoId!: number; // ID del producto (puedes usar una relación si tienes una entidad Producto)

  @OneToMany(() => TiendaProductoPrecio, tiendaProductoPrecio => tiendaProductoPrecio.producto_precio)
  tiendaProductoPrecios!: TiendaProductoPrecio[]; // Relación con la tabla de unión

  @ManyToOne(() => Producto, producto => producto.producto_precios)

  @ManyToOne(() => Producto, producto => producto.producto_precios)
  @JoinColumn({ name: 'productoId', referencedColumnName: 'id_producto' })
  producto!: Producto;
}