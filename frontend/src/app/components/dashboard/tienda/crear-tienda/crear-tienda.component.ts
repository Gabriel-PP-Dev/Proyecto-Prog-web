import { Component, OnInit } from '@angular/core';
import { Tienda } from 'src/app/interface/tienda';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/sevices/tienda.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar

@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.component.html',
  styleUrls: ['./crear-tienda.component.css']
})

export class CrearTiendaComponent implements OnInit {
  form_tienda: FormGroup; 
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
    private _tiendaService: TiendaService,
    private _snackBar: MatSnackBar // Inyecta MatSnackBar aquí
  ) { 

    this.form_tienda = this.fb.group({
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

  agregarTienda() {   
    const tienda: Tienda = {
      nombre: this.form_tienda.value.usuario,
      direccion: this.form_tienda.value.nombre,
      id: this.form_tienda.value.id
    };
  }
}

