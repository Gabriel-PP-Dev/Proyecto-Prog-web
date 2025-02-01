import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Precio } from 'src/app/interface/precio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.css']
})

export class PrecioComponent implements OnInit{
  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'tienda', 'acciones'];
  dataSource = new MatTableDataSource<Precio>([]); // Inicializa con un array vacío

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const ventas: Precio[] = [
        {cantidad: 5, producto: 'Julio', precio:56, tienda:'tiendaName', id:'skjdkjd'},  
        {cantidad: 5, producto: 'Julio', precio:56, tienda:'tiendaName', id:'skjdkjd'},  
        {cantidad: 5, producto: 'Julio', precio:56, tienda:'tiendaName', id:'skjdkjd'},  
        {cantidad: 5, producto: 'Julio', precio:56, tienda:'tiendaName', id:'skjdkjd'},  
        {cantidad: 5, producto: 'Julio', precio:56, tienda:'tiendaName', id:'skjdkjd'},  
    ];
    
    this.dataSource.data = ventas;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarVenta(precio:Precio) {
    this.router.navigate(['/dashboard/precios/crear-precio'], { state: { precioId: precio.id }});
  }

  eliminarVenta(precio:Precio) {
  
  }
}
