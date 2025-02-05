import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/interface/producto';

interface NavigationState {
  producto?: Producto; // Define aquí la estructura del estado de navegación
}

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})

export class CrearProductoComponent implements OnInit {
  form_producto: FormGroup; 
  isEditMode = false; // Variable para determinar si estamos en modo edición
  producto?: Producto; // Almacena el objeto producto completo

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private _snackBar: MatSnackBar 
  ) { 
    this.form_producto = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(0)]], 
    });
  }
  
  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as NavigationState; // Usa la interfaz aquí
      this.producto = state.producto; // Accede a producto usando la interfaz
      if (this.producto) {
        this.isEditMode = true;
        this.cargarProducto(); // Llenar el formulario con los datos del producto
      }
    }
  }

  cargarProducto() {
    if (this.producto) {
      this.form_producto.patchValue({
        nombre: this.producto.nombre,
        costo: this.producto.costo
      });
    }
  }

  agregarProducto() {   
    if (this.form_producto.valid) {
      const productoData = {
        nombre: this.form_producto.value.nombre,
        costo: this.form_producto.value.costo,
      };
  
      let url: string;
      let method: string;
  
      if (this.isEditMode) {
        method = 'PUT';
        url = `http://localhost:4000/producto//updateProducto/${this.producto?.id_producto}`; // URL para editar el producto
      } else {
        method = 'POST';
        url = 'http://localhost:4000/producto/createProducto'; // URL para crear un nuevo producto
      }
  
      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoData) // Envía los datos del formulario
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar el producto');
        }
        return response.json();
      })
      .then(data => {
        const message = this.isEditMode ? 'Producto actualizado exitosamente!' : 'Producto creado exitosamente!';
        this._snackBar.open(message, 'Cerrar', {
          duration: 2000,
        });
        this.router.navigate(['/dashboard/productos']); // Redirigir a la lista de productos
      })
      .catch(error => {
        console.error('Error:', error);
        this._snackBar.open('Error al guardar el producto', 'Cerrar', {
          duration: 2000,
        });
      });
    } else {
      this._snackBar.open('Por favor completa todos los campos requeridos', 'Cerrar', {
        duration: 2000,
      });
    }
  }  
}
