import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

private apiUrl = 'http://localhost:4000/usuario';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  deleteUsuario(id: string) {
    return this.http.delete(`${this.apiUrl}/deleteUsuario/${id}`);
  }
  
  updateUsuario(id: string, ususario: Usuario) {
    return this.http.put(`${this.apiUrl}/updateUsuario/${id}`, ususario);
  }
}
