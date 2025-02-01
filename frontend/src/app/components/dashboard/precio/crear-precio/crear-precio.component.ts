import { Component, OnInit } from '@angular/core';
import { Precio } from 'src/app/interface/precio';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { PrecioService } from 'src/app/sevices/precio.service';

@Component({
  selector: 'app-crear-precio',
  templateUrl: './crear-precio.component.html',
  styleUrls: ['./crear-precio.component.css']
})

export class CrearPrecioComponent implements OnInit {
  form_precio: FormGroup; 
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
    private _tiendaService: PrecioService,
    private _snackBar: MatSnackBar // Inyecta MatSnackBar aquí
  ) { 

    this.form_precio = this.fb.group({
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

  agregarPrecio() {   
    const precio: Precio = {
      precio: this.form_precio.value.precio,
      tienda: this.form_precio.value.tienda,
      producto: this.form_precio.value.producto,
      cantidad: this.form_precio.value.cantidad,
      id: this.form_precio.value.id
    };
  }
}

