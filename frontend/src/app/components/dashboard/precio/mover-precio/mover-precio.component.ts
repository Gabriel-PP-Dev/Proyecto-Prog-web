import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interface/usuario';
import { ActivatedRoute } from '@angular/router';
import { Tienda } from 'src/app/interface/tienda';
import { Producto_Precio } from 'src/app/interface/precio';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-mover-precio',
  templateUrl: './mover-precio.component.html',
  styleUrls: ['./mover-precio.component.css']
})

export class MoverPrecioComponent implements OnInit {
  isEditMode = false;
  form_mover_precio: FormGroup; 
  precio?:Producto_Precio
  tiendas: Tienda[] = []; // Array para almacenar las tiendas
  tiendaSeleccionada?:Tienda | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form_mover_precio = this.fb.group({
      tienda: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.cargarTiendas()
    this.route.queryParams.subscribe(params => {
      const precioData = JSON.parse(params['precio']);
      if (precioData) {
        this.precio = precioData;
        if(this.precio?.tiendaProductoPrecio?.id_tiendaProductoPrecio!=null || this.precio?.tiendaProductoPrecio?.id_tiendaProductoPrecio!=undefined)
           this.isEditMode = true;
       this.cargarPrecio(); // Llenar el formulario con los datos del producto
    }
  });
  }

  cargarPrecio() {
    if (this.precio) {
      this.form_mover_precio.patchValue({
        tienda: this.precio.tiendaProductoPrecio?.tienda,
      });
    }
  }

  
 async cargarTiendas() {
  try {
    const response = await fetch(`http://localhost:4000/tienda`);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    
    const tiendas: Tienda[] = await response.json();
    // Mapeamos las propiedades correctamente
    const mappedTiendas= tiendas.map(tienda => ({
      id_tienda:tienda.id_tienda,
      nombre: tienda.nombre,
      direccion: tienda.direccion,
      tiendaProductoPrecios: tienda.tiendaProductoPrecios,
      usuarios:tienda.usuarios,
      ventas:tienda.ventas
    }));
    this.tiendas = mappedTiendas;
  } catch (error) {
    console.error('Error al cargar tiendas:', error);
  }
}

  onTiendaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTienda = this.tiendas.find(t => t.id_tienda === selectElement.value); // Comparar como string
    
    if (selectedTienda) {
      this.tiendaSeleccionada = selectedTienda; // Almacena el objeto completo
    }
  }

  moverPrecio() {
    if (this.form_mover_precio.valid) {
      let precioData;
    if(this.isEditMode){
       precioData = {
        producto: this.form_mover_precio.value.producto.id_producto,
        precio: this.form_mover_precio.value.precio,
      };
    }else{
      precioData = {
        id_producto_precio: this.precio?.id_producto_precio,
        id_tienda: this.form_mover_precio.value.tienda.id_tienda,
        cantidad_en_tienda: this.form_mover_precio.value.cantidad
      };  
    }
      let url: string;
      let method: string;

      if (this.isEditMode) {
        console.log("editar")
        console.log(precioData)
        method = 'PUT';
        url = `http://localhost:4000'/tiendaProductoPrecio/updateTiendaProductoPrecio/${this.precio?.tiendaProductoPrecio?.id_tiendaProductoPrecio}`;
      } else {
        console.log("Agregar")
        console.log(precioData)
        method = 'POST';
        url = 'http://localhost:4000/tiendaProductoPrecio/createTiendaProductoPrecio'; // URL para crear un nuevo producto
      }

      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(precioData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar el precio');
        }
        return response.json();
      })
      .then(data => {
        const message = this.isEditMode ? 'Precio en tienda actualizado exitosamente!' : 'Precio en tienda creado exitosamente!';
        this._snackBar.open(message, 'Cerrar', {
          duration: 2000,
        });
        this.router.navigate(['/dashboard/precios']);
      })
      .catch(error => {
        console.error('Error:', error);
        this._snackBar.open('Error al guardar el precio', 'Cerrar', {
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