import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Producto_Precio } from 'src/app/interface/precio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.css']
})

export class PrecioComponent implements OnInit{
  displayedColumns: string[] = ['precio', 'producto', 'tienda', 'acciones'];
  dataSource = new MatTableDataSource<Producto_Precio>([]); // Inicializa con un array vacío

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.cargarPrecios();
  }

async cargarPrecios() {
    try {
      const response = await fetch(`http://localhost:4000/producto_precio`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      
      const precios: Producto_Precio[] = await response.json();
      // Mapeamos las propiedades correctamente
      const mappedPrecios = precios.map(precio => ({
        id_producto_precio: precio.id_producto_precio,
        precio: precio.precio,
        producto: precio.producto,
        tiendaProductoPrecio: precio.tiendaProductoPrecio // Si necesitas mostrar esto también
      }));
      console.log(mappedPrecios);
      
      this.dataSource.data = mappedPrecios;
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editarPrecio(precio:Producto_Precio) {
    const precioData = { precio: precio.precio, id_producto_precio: precio.id_producto_precio, tiendaProductoPrecio: precio.tiendaProductoPrecio, producto: precio.producto};
    const queryParams = { precio: JSON.stringify(precioData) };
    this.router.navigate(['/dashboard/precios/crear-precio'], { queryParams });
  }

  moverPrecio(precio:Producto_Precio) {
    const precioData = { precio: precio.precio, id_producto_precio: precio.id_producto_precio, tiendaProductoPrecio: precio.tiendaProductoPrecio, producto: precio.producto};
    const queryParams = { precio: JSON.stringify(precioData) };
    this.router.navigate(['/dashboard/precios/mover-precio'], { queryParams });
  }

  async eliminarPrecio(precio: Producto_Precio) {
      try {
        const response = await fetch(`http://localhost:4000/Producto_Precio/deleteProducto_Precio/${precio.id_producto_precio}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el precio');
        }
        this.cargarPrecios(); // Recargar productos después de eliminar
      } catch (error) {
        console.error('Error al eliminar precio:', error);
      }
    }
}



