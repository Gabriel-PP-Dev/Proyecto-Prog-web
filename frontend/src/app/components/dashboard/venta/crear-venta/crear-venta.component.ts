import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/interface/venta';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VentaService } from 'src/app/sevices/venta.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})

export class CrearVentaComponent implements OnInit {
  form_venta: FormGroup; 
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
    private _ventaService: VentaService,
    private _snackBar: MatSnackBar // Inyecta MatSnackBar aquí
  ) { 

    this.form_venta = this.fb.group({
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

  agregarVenta() {   
    const venta: Venta = {
      cantidad: this.form_venta.value.cantidad,
      usuario: this.form_venta.value.usuario,
      precio: this.form_venta.value.precio,
      precio_en_tienda: this.form_venta.value.precio_en_tienda,
      tienda: this.form_venta.value.tienda,
      id: this.form_venta.value.id
    };
  }
}

