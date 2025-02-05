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
  displayedColumns: string[] = ['cantidad', 'usuario', 'precio', 'tienda', 'precio_en_tienda', 'acciones'];
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
          id: venta.id,
          precio: venta.precio,
          cantidad: venta.cantidad,
          usuario: venta.usuario,
          tienda: venta.tienda,
          precio_en_tienda: venta.precio_en_tienda
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
    this.router.navigate(['/dashboard/ventas/crear-venta'], { state: { tiendaId: venta.id_venta }});
  }

  async eliminarVenta(venta:Venta) {
    try {
      const response = await fetch(`http://localhost:4000/venta/DeleteVenta/${venta.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el precio');
      }
      this.cargarVenta(); // Recargar productos después de eliminar
    } catch (error) {
      console.error('Error al eliminar precio:', error);
    }
  }
}
