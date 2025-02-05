import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, JoinColumn } from "typeorm";
import { Tienda } from "./Tienda"; // Asegúrate de importar la entidad Tienda
import { Producto_Precio } from "./Producto_Precio"; // Asegúrate de importar la entidad Producto_Precio
import { Venta } from "./Venta";

@Entity()
export class TiendaProductoPrecio {

  @PrimaryGeneratedColumn("uuid")
  id_tiendaProductoPrecio!: string;

  @ManyToOne(() => Tienda, tienda => tienda.tiendaProductoPrecios)
  @JoinColumn({ name: "id_tienda" })
  tienda!: Tienda;

  @OneToMany(() => Producto_Precio, producto_precio => producto_precio.tiendaProductoPrecio)
  @JoinColumn({ name: "id_tiendaProductoPrecio" })
  producto_precios!: Producto_Precio[]; // Relación con la entidad Producto_Precio

  @Column()
  cantidad_en_tienda!: number;

  @OneToMany(() => Venta, venta => venta.producto_precio)
  @JoinColumn({ name: "id_tiendaProductoPrecio" })
  ventas!: Venta[]; // Relación con la entidad Venta
}