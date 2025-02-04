import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario"; // Asegúrate de importar la entidad Usuario
import { TiendaProductoPrecio } from "./TiendaProductoPrecio"; // Asegúrate de importar la entidad TiendaProductoPrecio
import { Venta } from "./Venta"; // Asegúrate de importar la entidad Venta

@Entity()
export class Tienda {

  @PrimaryGeneratedColumn("uuid")
  id_tienda!: string;

  @Column()
  nombre!: string;

  @Column()
  direccion!: string;

  @OneToMany(() => Usuario, usuario => usuario.tienda)
  @JoinColumn({ name: "id_tienda" })
  usuarios!: Usuario[]; // Relación con la entidad Usuario

  @OneToMany(() => TiendaProductoPrecio, tiendaProductoPrecio => tiendaProductoPrecio.tienda)
  @JoinColumn({ name: "id_tienda" })
  tiendaProductoPrecios!: TiendaProductoPrecio[]; // Relación con la tabla de unión

  @OneToMany(() => Venta, venta => venta.tienda)
  @JoinColumn({ name: "id_tienda" })
  ventas!: Venta[]; // Relación con la entidad Venta
  
}