import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Venta } from 'src/app/interface/venta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})

export class CrearVentaComponent implements OnInit {
  form_venta: FormGroup;
  isEditMode = false;
  venta?: Venta;
  tiendas: any[] = [];
  productos_precios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
      private route: ActivatedRoute
  ) {
    this.form_venta = this.fb.group({
      tienda: ['', Validators.required],
      producto_precio: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.obtenerTiendas();
    this.obtenerProductosPrecios();
    this.route.queryParams.subscribe(params => {
      const ventaData = JSON.parse(params['usuario']);
      if (ventaData) {
        this.venta = ventaData;
        this.isEditMode = true;
        this.cargarVenta(); // Llenar el formulario con los datos del producto
    }
  });
  }

  obtenerTiendas() {
    fetch('http://localhost:4000/tienda')
      .then(response => response.json())
      .then(data => {
        this.tiendas = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  obtenerProductosPrecios() {
    fetch('http://localhost:4000/Producto_Precio')
      .then(response => response.json())
      .then(data => {
        this.productos_precios = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  cargarVenta() {
    if (this.venta) {
      this.form_venta.patchValue({
        tienda: this.venta.tienda,
        producto_precio: this.venta.producto_precio,
        precio: this.venta.precio,
        cantidad:  this.venta.cantidad
      });
    }
  }

  agregarVenta() {
    if (this.form_venta.valid) {
      
      const ventaData = {
        tienda: this.form_venta.value.tienda.id_tienda,
        producto_precio: this.form_venta.value.producto_precio.id_producto_precio,
        cantidad: this.form_venta.value.cantidad,
        precio: this.form_venta.value.precio
      };

      let url: string;
      let method: string;

      if (this.isEditMode) {
        method = 'PUT';
        url = `http://localhost:4000/venta/UpdateVenta/${this.venta?.id_venta}`;
      } else {
        method = 'POST';
        url = 'http://localhost:4000/venta/CreateVenta';
      }

      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ventaData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar la venta');
        }
        return response.json();
      })
      .then(data => {
        const message = this.isEditMode ? 'Venta actualizada exitosamente!' : 'Venta guardada exitosamente!';
        this._snackBar.open(message, 'Cerrar', {
          duration: 2000,
        });
        this.router.navigate(['/dashboard/ventas']);
      })
      .catch(error => {
        console.error('Error:', error);
        this._snackBar.open('Error al guardar la venta', 'Cerrar', {
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