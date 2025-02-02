import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from 'src/app/interface/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/sevices/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'nombre', 'apellidos', 'rol', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>([]); // Inicializa con un array vacío
  constructor(private router:Router, private route: ActivatedRoute, private usuarioService: UsuarioService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      this.dataSource.data = usuarios;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarUsuario(usuarios:Usuario) {
    this.router.navigate(['/dashboard/usuario/crear-usuario'], { state: { usuarioId: usuarios.id }});
  }

  eliminarVenta(usuarios:Usuario) {
    this.usuarioService.deleteUsuario(usuarios.id as string).subscribe(() => {
      this.cargarUsuarios();
    });
  }
}