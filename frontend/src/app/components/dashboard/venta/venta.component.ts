import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Venta } from 'src/app/interface/venta'; // Cambia la interfaz a Venta
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})

export class VentaComponent implements OnInit{
  displayedColumns: string[] = ['cantidad', 'usuario', 'precio', 'tienda', 'precioentienda', 'acciones'];
  dataSource = new MatTableDataSource<Venta>([]); // Inicializa con un array vacío
  constructor(private router:Router){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const ventas: Venta[] = [
        {cantidad: 5, usuario: 'Julio', precio:56, tienda:'tiendaName', precio_en_tienda:3883, id:'kdkdkd'},  
        {cantidad: 5, usuario: 'Julio', precio:56, tienda:'tiendaName', precio_en_tienda:3883, id:'kdkdkd'},  
        {cantidad: 5, usuario: 'Julio', precio:56, tienda:'tiendaName', precio_en_tienda:3883, id:'kdkdkd'},  
        {cantidad: 5, usuario: 'Julio', precio:56, tienda:'tiendaName', precio_en_tienda:3883, id:'kdkdkd'},  
        {cantidad: 5, usuario: 'Julio', precio:56, tienda:'tiendaName', precio_en_tienda:3883, id:'kdkdkd'},  
    ];
    
    this.dataSource.data = ventas;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarVenta(venta:Venta) {
    this.router.navigate(['/dashboard/ventas/crear-venta'], { state: { tiendaId: venta.id }});
  }

  eliminarVenta(venta:Venta) {
  }
}
