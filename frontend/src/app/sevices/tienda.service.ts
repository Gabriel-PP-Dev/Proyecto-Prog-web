import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tienda } from '../interface/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

private apiUrl = 'http://localhost:4000/tienda';

  constructor(private http: HttpClient) { }

  getTiendas() {
    return this.http.get<Tienda[]>(this.apiUrl);
  }

  deleteTienda(id: string) {
    return this.http.delete(`${this.apiUrl}/DeleteTienda/${id}`);
  }

    updateTienda(id: string, tienda: Tienda) {
      return this.http.put(`${this.apiUrl}/updateTienda/${id}`, tienda);
    }
}
