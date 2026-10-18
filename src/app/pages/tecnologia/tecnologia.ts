import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-tecnologia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tecnologia.html',
  styleUrl: './tecnologia.css',
})
export class Tecnologia implements OnInit {

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

    this.examenService.obtenerExamen('tecnologia').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);

        // Reasignamos un globalId secuencial único (1, 2, 3...) solo para la memoria de este componente
        const preguntasUnicas = (resultado.preguntas || []).map((pregunta: Pregunta, index: number) => ({
          ...pregunta,
          globalId: index + 1 // Garantiza que no haya IDs colisionados
        }));

        this.preguntas.set(preguntasUnicas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el examen de tecnología', err);
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