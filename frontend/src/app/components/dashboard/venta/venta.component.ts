import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Venta } from 'src/app/interface/venta';
import { Router, ActivatedRoute } from '@angular/router';
import { VentaService } from 'src/app/sevices/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})

export class VentaComponent implements OnInit{
  displayedColumns: string[] = ['cantidad', 'usuario', 'precio', 'tienda', 'precioentienda', 'acciones'];
  dataSource = new MatTableDataSource<Venta>([]);
  constructor(private router:Router, private route: ActivatedRoute, private ventaService: VentaService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas() {
    this.ventaService.getVentas().subscribe((ventas: Venta[]) => {
      this.dataSource.data = ventas;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarVenta(venta:Venta) {
    this.router.navigate(['/dashboard/ventas/crear-venta'], { state: { tiendaId: venta.id }});
  }

  eliminarVenta(venta: Venta) {
    this.ventaService.deleteVenta(venta.id as string).subscribe(() => {
      this.cargarVentas();
    });
  }
}