import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-desarrollo-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desarrollo-a.html',
  styleUrl: './desarrollo-a.css',
})
export class DesarrolloA implements OnInit {
  private examenService = inject(ExamenService);

  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  // Diccionario inmutable de respuestas seleccionadas (globalId -> indiceOpcion)
  respuestas = signal<Record<number, number>>({});

  ngOnInit(): void {
    this.cargarExamen();
  }

  cargarExamen() {
    this.cargando.set(true);

    this.examenService.obtenerExamen('desarrollo-a').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);

        // Mapeamos las preguntas para garantizar que cada una tenga un globalId 100% único
        const preguntasUnicas = (resultado.preguntas || []).map((pregunta: Pregunta, index: number) => ({
          ...pregunta,
          globalId: index + 1 // ID secuencial único (1, 2, 3...)
        }));

        this.preguntas.set(preguntasUnicas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el examen de Desarrollo A', err);
        this.cargando.set(false);
      },
    });
  }

  responder(globalId: number, indice: number) {
    this.respuestas.update((prev) => ({
      ...prev,
      [globalId]: indice,
    }));
  }

  esCorrecta(pregunta: Pregunta): boolean | null {
    const seleccion = this.respuestas()[pregunta.globalId];
    if (seleccion === undefined) return null;

    return seleccion === pregunta.respuestaCorrecta;
  }
}