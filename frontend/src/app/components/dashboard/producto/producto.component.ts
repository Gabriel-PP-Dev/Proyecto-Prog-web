import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Producto } from 'src/app/interface/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/sevices/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'costo', 'acciones'];
  dataSource = new MatTableDataSource<Producto>([]);

  constructor(private router: Router, private route: ActivatedRoute, private productoService: ProductoService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe((productos: Producto[]) => {
      this.dataSource.data = productos;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarProducto(producto: Producto) {
    this.router.navigate(['/dashboard/producto/crear-producto'], { state: { productoId: producto.id }});
  }

  eliminarProducto(producto: Producto) {
    this.productoService.deleteProducto(producto.id as string).subscribe(() => {
      this.cargarProductos();
    });
  }

  venderProducto(producto: Producto) {
    this.router.navigate(['/dashboard/ventas/crear-venta'], { state: { productoId: producto.id }});
  }
}
