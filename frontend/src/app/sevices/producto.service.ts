import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:4000/producto';
  
    constructor(private http: HttpClient) { }

    getProductos() {
      return this.http.get<Producto[]>(this.apiUrl);
    }
  
    deleteProducto(id: string) {
      return this.http.delete(`${this.apiUrl}/producto/deleteProducto/${id}`);
    }
  
      updateProducto(id: string, producto: Producto) {
        return this.http.put(`${this.apiUrl}/producto/updateProducto/${id}`, producto);
      }
}
