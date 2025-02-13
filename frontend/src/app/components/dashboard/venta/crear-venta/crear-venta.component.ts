import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Venta } from 'src/app/interface/venta';
import { ActivatedRoute } from '@angular/router';
import { Producto_Precio } from 'src/app/interface/precio';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})

export class CrearVentaComponent implements OnInit {
  form_venta: FormGroup;
  isEditMode = false;
  venta?: Venta | null;
  productos_precios: Producto_Precio[] = [];
  precioSeleccionado?:Producto_Precio | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
      private route: ActivatedRoute
  ) {
    this.form_venta = this.fb.group({
      producto_precio: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.obtenerProductosPrecios()
    this.route.queryParams.subscribe(params => {
      const ventaData = params['venta'];
      if (ventaData) {
        try {
          const parsedData = JSON.parse(ventaData);
          this.venta = parsedData;
          this.isEditMode = true;
          this.cargarVenta(); // Llenar el formulario con los datos del producto
        } catch (error) {
          console.error('Error al parsear datos JSON:', error);
        }
      }
    });
  }

  onPrecioChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedPrecio= this.productos_precios.find(p => p.id_producto_precio === selectElement.value); // Comparar como string
    if (selectedPrecio) {
      this.precioSeleccionado = selectedPrecio; // Almacena el objeto completo
    }
  }

  async obtenerProductosPrecios() {
    try {
      const response = await fetch('http://localhost:4000/Producto_Precio');
      if (!response.ok) {
        throw new Error('Error al obtener los precios');
       }
      const precios: Producto_Precio[] = await response.json();
      // Mapeamos las propiedades correctamente
      const mappedTiendas= precios.map(precio => ({
        id_producto_precio:precio.id_producto_precio,
        precio:precio.precio,
        producto:precio.producto,
        tiendaProductoPrecio:precio.tiendaProductoPrecio
      }));
      this.productos_precios= mappedTiendas;
    } catch (error) {
      console.error('Error al cargar tiendas:', error);
    }
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
      if(this.precioSeleccionado?.tiendaProductoPrecio!=null ){
        let ventaData
        if(this.isEditMode){
          ventaData = {
            tienda: this.precioSeleccionado?.tiendaProductoPrecio?.tienda.id_tienda,
            producto_precio: this.precioSeleccionado?.tiendaProductoPrecio?.id_tiendaProductoPrecio,
            cantidad: this.form_venta.value.cantidad,
            precio: this.form_venta.value.precio
          };  
        }else{
          ventaData = {
            cantidad: this.form_venta.value.cantidad,
            precio: this.form_venta.value.precio
          };  
        }
       
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
    }else{
      this._snackBar.open('El precio del producto seleccionado no pertenece a ninguna tienda. No se puede vender', 'Cerrar', {
        duration: 2000,
      });
    }
    } else {
      this._snackBar.open('Por favor completa todos los campos requeridos', 'Cerrar', {
        duration: 2000,
      });
    }
  }
}