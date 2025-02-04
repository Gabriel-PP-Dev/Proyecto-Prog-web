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
  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'tienda', 'acciones'];
  dataSource = new MatTableDataSource<Producto_Precio>([]); // Inicializa con un array vacío

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const ventas: Producto_Precio[] = [

    ];
    
    this.dataSource.data = ventas;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarVenta(precio:Producto_Precio) {
    this.router.navigate(['/dashboard/precios/crear-precio'], { state: { precioId: precio.id_producto_precio}});
  }

  eliminarVenta(precio:Producto_Precio) {
  
  }
}
