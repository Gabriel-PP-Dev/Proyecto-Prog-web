import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tienda } from "./Tienda"; // Asegúrate de importar la entidad Tienda
import { TiendaProductoPrecio } from "./TiendaProductoPrecio"; 

@Entity()
export class Venta {

  @PrimaryGeneratedColumn()
  id_venta!: number; // ID de la venta

  @ManyToOne(() => Tienda, tienda => tienda.ventas)
  tienda!: Tienda; // Relación con la entidad Tienda

  @ManyToOne(() => TiendaProductoPrecio, producto_precio => producto_precio.ventas)
  producto_precio!: TiendaProductoPrecio; // Relación con la entidad Producto_Precio

  @Column()
  cantidad!: number; // Cantidad del producto vendido

  @Column("decimal", { precision: 10, scale: 2 })
  precio!: number; // Precio al que se vendió el producto
}