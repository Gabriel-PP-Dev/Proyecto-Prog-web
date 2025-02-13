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
  displayedColumns: string[] = ['cantidad', 'precio', 'tienda', 'producto_precio', 'acciones'];
  dataSource = new MatTableDataSource<Venta>([]); // Inicializa con un array vacío
  constructor(private router:Router){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarVenta();
  }

  async cargarVenta() {
      try {
        const response = await fetch(`http://localhost:4000/venta`);
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        
        const ventas: Venta[] = await response.json();
        // Mapeamos las propiedades correctamente
        const mappedVentas = ventas.map(venta => ({
          id_venta: venta.id_venta,
          precio: venta.precio,
          cantidad: venta.cantidad,
          producto_precio: venta.producto_precio,
          tienda: venta.tienda
        }));
        console.log(mappedVentas);
        
        this.dataSource.data = mappedVentas;
        this.dataSource.paginator = this.paginator;
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarVenta(venta:Venta) {
    const ventaData = { 
      id_venta: venta.id_venta,
      precio: venta.precio,
      cantidad: venta.cantidad,
      producto_precio: venta.producto_precio,
      tienda: venta.tienda}
    const queryParams = { venta: JSON.stringify(ventaData) };
    this.router.navigate(['/dashboard/ventas/crear-venta'], { queryParams });
  }

  async eliminarVenta(venta:Venta) {
    try {
      const response = await fetch(`http://localhost:4000/venta/DeleteVenta/${venta.id_venta}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la venta');
      }
      this.cargarVenta(); // Recargar productos después de eliminar
    } catch (error) {
      console.error('Error al eliminar la venta', error);
    }
  }

  exportarVentasExcel(): void {
    fetch('http://localhost:4000/venta_exportar-excel')
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ventas.xlsx';
        a.click();
      })
      .catch(error => {
        console.error('Error al exportar ventas a Excel:', error);
      });
  }

}