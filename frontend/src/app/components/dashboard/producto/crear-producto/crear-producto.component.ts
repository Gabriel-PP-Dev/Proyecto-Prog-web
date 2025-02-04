import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interface/producto';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { ProductoService } from 'src/app/sevices/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})

export class CrearProductoComponent implements OnInit {
  form_producto: FormGroup; 
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
    private _usuarioService: ProductoService,
    private _snackBar: MatSnackBar // Inyecta MatSnackBar aquí
  ) { 
    this.form_producto = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required], 
    });
  }
  
  ngOnInit(): void {
  }

 agregarProducto() {   
    /*const producto: Producto = {
      nombre: this.form_producto.value.nombre,
      costo: this.form_producto.value.costo,
      id: this.form_producto.value.id
    };*/
  }
}

