import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto_Precio } from 'src/app/interface/precio';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-precio',
  templateUrl: './crear-precio.component.html',
  styleUrls: ['./crear-precio.component.css']
})
export class CrearPrecioComponent implements OnInit {
  form_precio: FormGroup;
  isEditMode = false;
  precio?: Producto_Precio;
  productos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form_precio = this.fb.group({
      producto: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.obtenerProductos()
    this.route.queryParams.subscribe(params => {
      const precioData = JSON.parse(params['precio']);
      if (precioData) {
        this.precio = precioData;
        this.isEditMode = true;
        this.cargarPrecio(); // Llenar el formulario con los datos del producto
    }
  });
  }

  cargarPrecio() {
    if (this.precio) {
      this.form_precio.patchValue({
        producto: this.precio.producto,
        precio: this.precio.precio,
      });
    }
  }

  obtenerProductos() {
    fetch('http://localhost:4000/producto')
      .then(response => response.json())
      .then(data => {
        this.productos = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  agregarPrecio() {
    if (this.form_precio.valid) {
      let productoData;
      if(this.isEditMode){
       productoData = {
        producto: this.form_precio.value.producto.id_producto,
        precio: this.form_precio.value.precio,
      };
    }else{
      productoData = {
        producto: { id_producto: this.form_precio.value.producto.id_producto},
        precio: this.form_precio.value.precio,
      };
    }
      let url: string;
      let method: string;

      if (this.isEditMode) {
        method = 'PUT';
        url = `http://localhost:4000/Producto_Precio/updateProducto_Precio/${this.precio?.id_producto_precio}`;
      } else {
        method = 'POST';
        url = 'http://localhost:4000/Producto_Precio/createProducto_Precio';
      }

      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar el precio');
        }
        return response.json();
      })
      .then(data => {
        const message = this.isEditMode ? 'Precio actualizado exitosamente!' : 'Precio creado exitosamente!';
        this._snackBar.open(message, 'Cerrar', {
          duration: 200,
        });
        this.router.navigate(['/dashboard/precios']);
      })
      .catch(error => {
        console.error('Error:', error);
        this._snackBar.open('Error al guardar el precio', 'Cerrar', {
          duration: 200,
        });
      });
    } else {
      this._snackBar.open('Por favor completa todos los campos requeridos', 'Cerrar', {
        duration: 200,
      });
    }
  }
}