import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto_Precio} from '../interface/precio';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

private apiUrl = 'http://localhost:4000/Producto_Precio';

  constructor(private http: HttpClient) { }

  getPrecios() {
    return this.http.get<Producto_Precio[]>(this.apiUrl);
  }

  deletePrecio(id: string) {
    return this.http.delete(`${this.apiUrl}/deleteProducto_Precio/${id}`);
  }

    updatePrecio(id: string, precio: Producto_Precio) {
      return this.http.put(`${this.apiUrl}updateProducto_Precio/${id}`, precio);
    }
}
