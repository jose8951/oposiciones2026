import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

// Tipo extendido para incluir el nombre del examen
export type PreguntaConOrigen = Pregunta & { examenOrigen?: string };

@Component({
  selector: 'app-buscar',
  standalone: true, // <-- Añadido
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar.html',
  styleUrl: './buscar.css',
})
export class Buscar { // <-- Asegurada exportación de la clase
  private examenService = inject(ExamenService);

  textoBusqueda: string = '';
  // Usamos el tipo extendido para resolver el error del HTML
  resultados: PreguntaConOrigen[] = [];
  cargando: boolean = false;
  busquedaRealizada: boolean = false;

  buscar() {
    if (!this.textoBusqueda.trim()) return;
    
    this.cargando = true;
    this.busquedaRealizada = true;

    this.examenService.buscarPreguntas(this.textoBusqueda).subscribe({
      next: (res: PreguntaConOrigen[]) => { // <-- Tipado actualizado a PreguntaConOrigen[]
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