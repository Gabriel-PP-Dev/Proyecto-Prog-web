import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/sevices/usuario.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})

export class CrearUsuarioComponent implements OnInit {
  form_usuario: FormGroup; 
  roles: any[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'trabajador', viewValue: 'Trabajador'},
    {value: 'estudiante', viewValue: 'Estudiante'},
  ];
  estados: any[] = [
    {value: 'activo', viewValue: 'Activo'},
    {value: 'bloqueado', viewValue: 'Bloqueado'},
  ];
  
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar // Inyecta MatSnackBar aquí
  ) { 
    this.form_usuario = this.fb.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required], 
    });
  }
  
  ngOnInit(): void {
  }

  agregarUsuario() {   
 
  }
}

