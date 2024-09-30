import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { FondoService } from './services/fondo.service';
import { CommonModule } from '@angular/common';  // Para NgIf y NgFor
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule para formularios reactivos

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BTG Fondos';

  fondoForm = new FormGroup({
    clienteId: new FormControl(''),
    fondoId: new FormControl('')
  });

  historial: any[] = [];
  mensaje = '';

  constructor(private fondoService: FondoService) {
    console.log('Componente o servicio instanciado', this);
  }

  suscribirAFondo() {
    const clienteIdValue = this.fondoForm.get('clienteId')?.value ?? '';
    const fondoIdValue = this.fondoForm.get('fondoId')?.value ?? '';

    this.fondoService.suscribirAFondo(clienteIdValue, fondoIdValue).subscribe(
      response => {
        this.mensaje = 'Suscripción exitosa.';
        this.obtenerHistorial();
      },
      error => {
        this.mensaje = `Error: ${error.error}`;
      }
    );
  }

  cancelarFondo() {
    const clienteIdValue = this.fondoForm.get('clienteId')?.value ?? '';
    const fondoIdValue = this.fondoForm.get('fondoId')?.value ?? '';

    this.fondoService.cancelarFondo(clienteIdValue, fondoIdValue).subscribe(
      response => {
        this.mensaje = 'Cancelación exitosa.';
        this.obtenerHistorial();
      },
      error => {
        this.mensaje = `Error: ${error.error}`;
      }
    );
  }

  obtenerHistorial() {
    const clienteIdValue = this.fondoForm.get('clienteId')?.value ?? '';

    this.fondoService.obtenerHistorial(clienteIdValue).subscribe(
      data => {
        this.historial = data;
      },
      error => {
        this.mensaje = `Error al obtener el historial: ${error.error}`;
      }
    );
  }
}
