import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario';
import { AuthService } from 'src/app/sevices/auth';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  form_login: FormGroup;
  cargando = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private authService: AuthService) {
    this.form_login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async Ingresar() {
    const nombre_usuario = this.form_login.value.usuario;
    const contrasenna = this.form_login.value.password;

    try {
      const data = {nombre_usuario: nombre_usuario, contrasenna: contrasenna}
      const response = await fetch('http://localhost:4000/usuario/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        this.authService.login()
        this.face_cargando();
      } else {
        this.error();
        this.form_login.reset();
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      this.error();
    }
  }

  error() {
    this._snackBar.open('Usuario o contraseña incorrecto', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  face_cargando() {
    this.cargando = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']); // Navegar a la página deseada
    }, 1500);
  }
}

