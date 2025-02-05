import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tienda } from 'src/app/interface/tienda';
import { ActivatedRoute } from '@angular/router';

interface NavigationState {
  tienda?: Tienda; 
}

@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.component.html',
  styleUrls: ['./crear-tienda.component.css']
})

export class CrearTiendaComponent implements OnInit {
  form_tienda: FormGroup; 
  isEditMode = false; // Variable para determinar si estamos en modo edición
  tienda?: Tienda; 

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { 
    this.form_tienda = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['',  Validators.required], 
    });
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tiendaData = JSON.parse(params['tienda']);
      if (tiendaData) {
        this.tienda = tiendaData;
        this.isEditMode = true;
        this.cargarTienda(); // Llenar el formulario con los datos del producto
    }
  });
 }

  cargarTienda() {
    if (this.tienda) {
      this.form_tienda.patchValue({
        nombre: this.tienda.nombre,
        direccion: this.tienda.direccion
      });
    }
  }

  agregarTienda() {   
    if (this.form_tienda.valid) {
      const tiendaData = {
        nombre: this.form_tienda.value.nombre,
        direccion: this.form_tienda.value.direccion,
      };
  
      let url: string;
      let method: string;
  
      if (this.isEditMode) {
        method = 'PUT';
        url = `http://localhost:4000/tienda/updateTienda/${this.tienda?.id_tienda}`; // URL para editar el producto
      } else {
        method = 'POST';
        url = 'http://localhost:4000/tienda/createTienda'; // URL para crear un nuevo producto
      }
  
      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tiendaData) // Envía los datos del formulario
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar el producto');
        }
        return response.json();
      })
      .then(data => {
        const message = this.isEditMode ? 'Tienda actualizada exitosamente!' : 'Tienda creada exitosamente!';
        this._snackBar.open(message, 'Cerrar', {
          duration: 2000,
        });
        this.router.navigate(['/dashboard/tiendas']); // Redirigir a la lista de productos
      })
      .catch(error => {
        console.error('Error:', error);
        this._snackBar.open('Error al guardar la tienda', 'Cerrar', {
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
