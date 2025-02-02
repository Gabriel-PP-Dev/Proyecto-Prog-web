import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Precio } from 'src/app/interface/precio';
import { ActivatedRoute, Router } from '@angular/router';
import { PrecioService } from 'src/app/sevices/precio.service';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.css']
})

export class PrecioComponent implements OnInit{
  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'tienda', 'acciones'];
  dataSource = new MatTableDataSource<Precio>([]);

  constructor(private router: Router, private route: ActivatedRoute, private precioService: PrecioService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarPrecios();
  }

  cargarPrecios() {
    this.precioService.getPrecios().subscribe((precios: Precio[]) => {
      this.dataSource.data = precios;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarPrecio(precio: Precio) {
    this.router.navigate(['/dashboard/precio/crear-precio'], { state: { precioId: precio.id }});
  }

  eliminarPrecio(precio: Precio) {
    this.precioService.deletePrecio(precio.id as string).subscribe(() => {
      this.cargarPrecios();
    });
  }
}
