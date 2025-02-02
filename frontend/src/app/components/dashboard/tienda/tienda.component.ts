  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { Tienda } from 'src/app/interface/tienda'; // Cambia la interfaz a Tienda
  import { ActivatedRoute, Router } from '@angular/router';
import { TiendaService } from 'src/app/sevices/tienda.service';

  @Component({
    selector: 'app-tienda',
    templateUrl: './tienda.component.html',
    styleUrls: ['./tienda.component.css']
  })
  
  export class TiendaComponent{
    displayedColumns: string[] = ['nombre', 'direccion', 'acciones'];
    dataSource = new MatTableDataSource<Tienda>([]);
    constructor(private router : Router, private route: ActivatedRoute, private tiendaService: TiendaService){}
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngOnInit(): void {
      this.cargarTiendas();
    }
  
cargarTiendas() {
    this.tiendaService.getTiendas().subscribe((tiendas: Tienda[]) => {
      this.dataSource.data = tiendas;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarTienda(tienda: Tienda) {
    this.router.navigate(['/dashboard/tienda/crear-tienda'], { state: { tiendaId: tienda.id }});
  }

  eliminarVenta(tienda: Tienda) {
    this.tiendaService.deleteTienda(tienda.id as string).subscribe(() => {
      this.cargarTiendas();
    });
  }
  }
    