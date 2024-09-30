import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Esto lo hace standalone
})
export class FondoService {

  private apiUrl = 'http://localhost:8080/fondos'; 

  constructor(private http: HttpClient) {}

  suscribirAFondo(clienteId: string, fondoId: string): Observable<any> {
    console.log('Enviando solicitud de suscripción', { clienteId, fondoId });
    return this.http.post(`${this.apiUrl}/suscribir`, { clienteId, fondoId });
  }

  cancelarFondo(clienteId: string, fondoId: string): Observable<any> {
    console.log('Enviando solicitud de cancelación', { clienteId, fondoId });
    return this.http.post(`${this.apiUrl}/cancelar`, { clienteId, fondoId });
  }

  obtenerHistorial(clienteId: string): Observable<any> {
    console.log('Solicitando historial para cliente', clienteId);
    return this.http.get(`${this.apiUrl}/historial/${clienteId}`);
  }
}
