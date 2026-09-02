import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

// Tipo extendido para incluir el nombre del examen
export type PreguntaConOrigen = Pregunta & { examenOrigen?: string };


//
@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar.html',
  styleUrl: './buscar.css',
})
export class Buscar {
  private examenService = inject(ExamenService);

  textoBusqueda: string = '';
  resultados: PreguntaConOrigen[] = [];
  cargando: boolean = false;
  busquedaRealizada: boolean = false;

  buscar() {
    // Si el usuario borra el texto por completo, limpiamos los resultados al vuelo
    if (this.textoBusqueda.trim().length < 3) {
      this.resultados = [];
      this.busquedaRealizada = false;
      return;
    }
    
    this.cargando = true;
    this.busquedaRealizada = true;

    this.examenService.buscarPreguntas(this.textoBusqueda).subscribe({
      next: (res: PreguntaConOrigen[]) => {
        this.resultados = res;
        this.cargando = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }
}