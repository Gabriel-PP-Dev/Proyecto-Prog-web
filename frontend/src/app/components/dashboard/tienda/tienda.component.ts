  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { Tienda } from 'src/app/interface/tienda'; // Cambia la interfaz a Tienda
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-tienda',
    templateUrl: './tienda.component.html',
    styleUrls: ['./tienda.component.css']
  })
  
  export class TiendaComponent{
    displayedColumns: string[] = ['nombre', 'direccion', 'acciones'];
    dataSource = new MatTableDataSource<Tienda>([]); // Inicializa con un array vacío
    constructor(private router : Router){}
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngOnInit(): void {
      this.loadData();
    }
  
    loadData() {
      const tiendas: Tienda[] = [
          {nombre: 'jcmartinez', direccion: 'Julio', id:'kdjdjd'},  
          {nombre: 'jcmartinez', direccion: 'Julio', id:'kdjdjd'},  
          {nombre: 'jcmartinez', direccion: 'Julio', id:'kdjdjd'},  
      ];
      
      this.dataSource.data = tiendas;
      this.dataSource.paginator = this.paginator;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    editarTienda(tienda: Tienda) {
      this.router.navigate(['/dashboard/tiendas/crear-tienda'], { state: { tiendaId: tienda.id }});
    }
  
    eliminarTienda(tienda: Tienda) {
     
    }
  }
    