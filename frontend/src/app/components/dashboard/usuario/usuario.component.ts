import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from 'src/app/interface/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'nombre', 'apellidos', 'rol', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>([]); // Inicializa con un array vacío
  constructor(private router:Router){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const usuarios: Usuario[] = [
      { usuario: 'jdoe', nombre: 'John', apellidos: 'Doe', rol: 'Admin', estado: 'Activo', id:'kjfdkfdkfd' },
      { usuario: 'asmith', nombre: 'Alice', apellidos: 'Smith', rol: 'User', estado: 'Inactivo', id:'kfjfj' },
    ];
    
    this.dataSource.data = usuarios;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarUsuario(usuario:Usuario) {
    this.router.navigate(['/dashboard/usuarios/crear-usuario'], { state: { tiendaId: usuario.id }});
  }

  eliminarUsuario(usuario:Usuario) {
  }
}
