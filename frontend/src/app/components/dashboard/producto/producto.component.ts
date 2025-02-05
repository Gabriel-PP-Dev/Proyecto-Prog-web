import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Producto } from 'src/app/interface/producto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'costo', 'acciones'];
  dataSource = new MatTableDataSource<Producto>([]);

  constructor(private router: Router) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarProductos();
  }

  async cargarProductos() {
    try {
      const response = await fetch(`http://localhost:4000/producto`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      
      const productos: Producto[] = await response.json();
      // Mapeamos las propiedades correctamente
      const mappedProductos = productos.map(producto => ({
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        costo: producto.costo,
        producto_precios: producto.producto_precios // Si necesitas mostrar esto también
      }));
      this.dataSource.data = mappedProductos;
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarProducto(producto: Producto) {
      this.router.navigate(['/dashboard/productos/crear-producto'], { state: { producto } });
  }

  async eliminarProducto(producto: Producto) {
    try {
      const response = await fetch(`http://localhost:4000/producto/deleteProducto/${producto.id_producto}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      this.cargarProductos(); // Recargar productos después de eliminar
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  }

  venderProducto(producto: Producto) {
    this.router.navigate(['/dashboard/ventas/crear-venta'], { state: { productoId: producto.id_producto }});
  }
}
