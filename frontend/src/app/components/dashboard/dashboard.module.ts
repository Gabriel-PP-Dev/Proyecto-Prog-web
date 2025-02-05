import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NatbarComponent } from './natbar/natbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { TiendaComponent } from './tienda/tienda.component';
import { VentaComponent } from './venta/venta.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearVentaComponent } from './venta/crear-venta/crear-venta.component';
import { CrearTiendaComponent } from './tienda/crear-tienda/crear-tienda.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { CrearPrecioComponent } from './precio/crear-precio/crear-precio.component';
import { PrecioComponent } from './precio/precio.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NatbarComponent,
    InicioComponent,
    UsuarioComponent,
    CrearUsuarioComponent,
    TiendaComponent,
    VentaComponent,
    ProductoComponent,
    CrearVentaComponent,
    CrearTiendaComponent,
    CrearProductoComponent,
    CrearPrecioComponent,
    PrecioComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
