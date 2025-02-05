import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { VentaComponent } from './venta/venta.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearVentaComponent } from './venta/crear-venta/crear-venta.component';
import { CrearTiendaComponent } from './tienda/crear-tienda/crear-tienda.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { CrearPrecioComponent } from './precio/crear-precio/crear-precio.component';
import { PrecioComponent } from './precio/precio.component';

const routes: Routes = [  {path: '', component: DashboardComponent, children: [
  {path: '', component: InicioComponent},
  {path: 'usuarios', component: UsuarioComponent},
  {path: 'ventas', component: VentaComponent}, 
  {path: 'tiendas', component: TiendaComponent}, 
  {path: 'productos', component: ProductoComponent}, 
  {path: 'precios', component: PrecioComponent}, 
  {path: 'usuarios/crear-usuario', component: CrearUsuarioComponent}, 
  {path: 'ventas/crear-venta', component: CrearVentaComponent}, 
  {path: 'tiendas/crear-tienda', component: CrearTiendaComponent}, 
  {path: 'productos/crear-producto', component: CrearProductoComponent}, 
  {path: 'precios/crear-precio', component: CrearPrecioComponent},
  {path: 'precios/crear-precio', component: CrearUsuarioComponent}, 
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
