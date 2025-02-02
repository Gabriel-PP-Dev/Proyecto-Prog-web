import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../interface/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

 private apiUrl = 'http://localhost:4000/ventas';

  constructor(private http: HttpClient) { }

  getVentas() {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  deleteVenta(id: string) {
    return this.http.delete(`${this.apiUrl}/venta/DeleteVenta/${id}`);
  }
  
  updateVenta(id: string, venta: Venta) {
    return this.http.put(`${this.apiUrl}/venta/UpdateVenta/${id}`, venta);
  }
}
