  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { Usuario } from 'src/app/interface/usuario';
  import { Tienda } from 'src/app/interface/tienda';
  import { Router } from '@angular/router';
  import { MatSnackBar } from '@angular/material/snack-bar';
  
  
  @Component({
    selector: 'app-usuarios',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css']
  })

  export class UsuarioComponent implements OnInit {
    displayedColumns: string[] = ['rol', 'tienda', 'nombre', 'usuario', 'acciones'];
    dataSource = new MatTableDataSource<Usuario>([]); // Inicializa con un array vacío
  
    constructor(private router: Router,  private _snackBar: MatSnackBar ) {}
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngOnInit(): void {
      this.cargarUsuarios();
    }
  
    async cargarUsuarios() {
      try {
        const response = await fetch(`http://localhost:4000/usuario`);
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        
        const usuarios: Usuario[] = await response.json();
        // Mapeamos las propiedades correctamente
        const mappedUsuarios= usuarios.map(usuario => ({
          id_usuario:usuario.id_usuario,
          nombre: usuario.nombre,
          nombre_usuario: usuario.nombre_usuario,
          tienda: usuario.tienda,
          contrasenna:usuario.contrasenna,
          rol:usuario.rol,
        }));
        this.dataSource.data = mappedUsuarios;
        this.dataSource.paginator = this.paginator;
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    editarUsuario(usuario: Usuario) {
      const usuarioData = { 
        id_usuario:usuario.id_usuario,
        nombre: usuario.nombre,
        nombre_usuario: usuario.nombre_usuario,
        tienda: usuario.tienda,
        contrasenna:usuario.contrasenna,
        rol:usuario.rol}
      const queryParams = { usuario: JSON.stringify(usuarioData) };
      this.router.navigate(['/dashboard/usuarios/crear-usuario'], { queryParams });
    }
  
    async eliminarUsuario(usuario: Usuario) {
      try {
        const response = await fetch(`http://localhost:4000/usuario/deleteUsuario/${usuario.id_usuario}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          this._snackBar.open('Error al eliminar el usuario', 'Cerrar', {
            duration: 2000,
          });
        }else{
          this._snackBar.open('Usuario eliminado', 'Cerrar', {
            duration: 2000,
          });
        }
        this.cargarUsuarios();
      } catch (error) {
        this._snackBar.open('Error al eliminar el usuario', 'Cerrar', {
          duration: 2000,
        });
      }
    }
  }
  