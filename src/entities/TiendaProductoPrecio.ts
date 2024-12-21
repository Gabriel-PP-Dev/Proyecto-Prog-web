import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from "typeorm";
import { Tienda } from "./Tienda"; // Asegúrate de importar la entidad Tienda
import { Producto_Precio } from "./Producto_Precio"; // Asegúrate de importar la entidad Producto_Precio
import { Venta } from "./Venta";

@Entity()
export class TiendaProductoPrecio {

  @PrimaryGeneratedColumn()
  id_tiendaProductoPrecio!: number;

  @ManyToOne(() => Tienda, tienda => tienda.tiendaProductoPrecios)
  tienda!: Tienda;

  @ManyToOne(() => Producto_Precio, producto_precio => producto_precio.tiendaProductoPrecios)
  producto_precio!: Producto_Precio;

  @Column()
  cantidad_en_tienda!: string;

  @OneToMany(() => Venta, venta => venta.producto_precio)
  ventas!: Venta[]; // Relación con la entidad Venta
}