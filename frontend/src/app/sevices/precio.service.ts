import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Precio } from '../interface/precio';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

private apiUrl = 'http://localhost:4000/Producto_Precio';

  constructor(private http: HttpClient) { }

  getPrecios() {
    return this.http.get<Precio[]>(this.apiUrl);
  }

  deletePrecio(id: string) {
    return this.http.delete(`${this.apiUrl}/Producto_Precio/deleteProducto_Precio/${id}`);
  }

    updatePrecio(id: string, precio: Precio) {
      return this.http.put(`${this.apiUrl}/Producto_Precio/updateProducto_Precio/${id}`, precio);
    }
}
