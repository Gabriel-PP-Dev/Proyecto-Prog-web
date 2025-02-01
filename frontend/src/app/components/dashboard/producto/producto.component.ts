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
  displayedColumns: string[] = ['nombre', 'costo', 'acciones']; // Agregamos 'acciones'
  dataSource = new MatTableDataSource<Producto>([]);

  constructor(private router: Router) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const productos: Producto[] = [
      { nombre: 'Producto 1', costo: '100',id:'kfkfkfkoooooooooo'},
      { nombre: 'Producto 2', costo: '200',id:'kfkfkfkfaaaaaaaaa'},
      { nombre: 'Producto 3', costo: '300', id:'kfkfkfkeeeeeeeee'},
    ];

    this.dataSource.data = productos;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarProducto(producto:Producto) {
    this.router.navigate(['/dashboard/productos/crear-producto'], { state: { productoId: producto.id }});
  }

  eliminarProducto(producto:Producto) {
    
  }

  venderProducto(producto: Producto) {
    this.router.navigate(['/dashboard/ventas/crear-venta'], { state: { productoId: producto.id }});
  }
}
