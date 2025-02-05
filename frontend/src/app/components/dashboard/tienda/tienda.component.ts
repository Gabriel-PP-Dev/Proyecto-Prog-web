  
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { Tienda } from 'src/app/interface/tienda';
  import { Router } from '@angular/router';
  import { MatSnackBar } from '@angular/material/snack-bar';
  
  
  @Component({
    selector: 'app-tienda',
    templateUrl: './tienda.component.html',
    styleUrls: ['./tienda.component.css']
  })
  
  export class TiendaComponent implements OnInit {
    displayedColumns: string[] = ['nombre', 'direccion', 'acciones'];
    dataSource = new MatTableDataSource<Tienda>([]); // Inicializa con un array vacío
  
    constructor(private router: Router,  private _snackBar: MatSnackBar ) {}
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngOnInit(): void {
      this.cargarTiendas();
    }
  
    async cargarTiendas() {
      try {
        const response = await fetch(`http://localhost:4000/tienda`);
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        
        const tiendas: Tienda[] = await response.json();
        // Mapeamos las propiedades correctamente
        const mappedTiendas= tiendas.map(tienda => ({
          id_tienda:tienda.id_tienda,
          nombre: tienda.nombre,
          direccion: tienda.direccion,
          tiendaProductoPrecios: tienda.tiendaProductoPrecios,
          usuarios:tienda.usuarios,
          ventas:tienda.ventas
        }));
        this.dataSource.data = mappedTiendas;
        this.dataSource.paginator = this.paginator;
      } catch (error) {
        console.error('Error al cargar tiendas:', error);
      }
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    editarTienda(tienda: Tienda) {
        this.router.navigate(['/dashboard/productos/crear-tienda'], { state: { tienda } });
    }
  
    async eliminarTienda(tienda: Tienda) {
      try {
        const response = await fetch(`http://localhost:4000/tienda/deleteTienda/${tienda.id_tienda}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          this._snackBar.open('Error al eliminar la tienda', 'Cerrar', {
            duration: 2000,
          });
        }else{
          this._snackBar.open('Tienda eliminada', 'Cerrar', {
            duration: 2000,
          });
        }
        this.cargarTiendas();
      } catch (error) {
        this._snackBar.open('Error al eliminar la tienda', 'Cerrar', {
          duration: 2000,
        });
      }
    }
  }
  