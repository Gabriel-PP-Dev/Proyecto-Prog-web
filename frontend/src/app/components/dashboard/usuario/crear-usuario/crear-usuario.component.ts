import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interface/usuario';
import { ActivatedRoute } from '@angular/router';
import { Tienda } from 'src/app/interface/tienda';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})

export class CrearUsuarioComponent implements OnInit {
  form_usuario: FormGroup; 
  isEditMode: boolean = false; // Variable para determinar si estamos en modo edición
  usuario?: Usuario; 
  tiendas: Tienda[] = []; // Array para almacenar las tiendas
  roles: String[] = ["Administrador", "Trabajador"]; // Array para almacenar los roles
  tiendaSeleccionada?:Tienda | null;
  rolSeleccionado?:String | null;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) 
  
  { 
    this.form_usuario = 
    this.fb.group({
      nombre: ['', Validators.required],
      nombre_usuario: ['', Validators.required],
      contrasenna: ['', Validators.required],
      rol: ['', Validators.required],
      tienda: ['', Validators.required],
      email: ['', this.getEmailValidators()],
    });
  }

  getEmailValidators() {
    return this.isEditMode ? null : [Validators.required];
  }
  
  
  ngOnInit(): void {
  this.cargarTiendas()
    this.route.queryParams.subscribe(params => {
      const usuarioData = JSON.parse(params['usuario']);
      if (usuarioData) {
        this.usuario = usuarioData;
        this.isEditMode = true;
        this.cargarUsuario(); // Llenar el formulario con los datos del producto
    }
  });
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

  cargarUsuario() {
    if (this.usuario) {
      this.form_usuario.patchValue({
        nombre: this.usuario.nombre,
        nombre_usuario: this.usuario.nombre_usuario,
        contrasenna: this.usuario?.contrasenna,
        rol: this.usuario.rol,
        tienda:  this.usuario.tienda.id_tienda
      });
      this.tiendaSeleccionada = this.usuario.tienda
    }
  }

  onTiendaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTienda = this.tiendas.find(t => t.id_tienda === selectElement.value); // Comparar como string
    
    if (selectedTienda) {
      this.tiendaSeleccionada = selectedTienda; // Almacena el objeto completo
    }
  }

  onRolChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedRol = this.roles.find(r => r === selectElement.value); // Comparar como string
    
    if (selectedRol) {
      this.rolSeleccionado = selectedRol; // Almacena el objeto completo
    }
  }

  agregarUsuario() {   
    if (this.form_usuario.valid) {
      let usuarioData;
      let url: string;
      let method: string;
  
      if (this.isEditMode) {
        usuarioData = {
          nombre: this.form_usuario.value.nombre,
          nombre_usuario: this.form_usuario.value.nombre_usuario,
          contrasenna: this.form_usuario.value.contrasenna,
          rol: this.form_usuario.value.rol,
          tienda: {id_tienda: this.tiendaSeleccionada?.id_tienda}
        };  
        method = 'PUT';
        url = `http://localhost:4000/usuario/updateUsuari/${this.usuario?.id_usuario}`; // URL para editar el producto
      } else {
        usuarioData = {
          nombre: this.form_usuario.value.nombre,
          nombre_usuario: this.form_usuario.value.nombre_usuario,
          contrasenna: this.form_usuario.value.contrasenna,
          rol: this.form_usuario.value.rol,
          email: this.form_usuario.value.email,
          tienda: {id_tienda: this.tiendaSeleccionada?.id_tienda}
        };  
        method = 'POST';
        url = 'http://localhost:4000/usuario/createUsuario'; // URL para crear un nuevo producto
      }
  
      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData) // Envía los datos del formulario
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar ususario');
        }
        return response.json();
      })
      .then(data => {
        const message = this.isEditMode ? 'Usuario actualizado exitosamente!' : 'Usuario creado exitosamente!';
        this._snackBar.open(message, 'Cerrar', {
          duration: 2000,
        });
        this.router.navigate(['/dashboard/usuarios']); // Redirigir a la lista de productos
      })
      .catch(error => {
        console.error('Error:', error);
        this._snackBar.open('El email debe tener incluido @gmail.com ', 'Cerrar', {
          duration: 4000,
        });
      });
    } else {
      this._snackBar.open('Por favor completa todos los campos requeridos', 'Cerrar', {
        duration: 2000,
      });
    }
  }  
}

