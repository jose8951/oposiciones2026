import { Component, inject, OnInit, signal } from '@angular/core';
import { ExamenService } from '../../services/examen';
import { CommonModule } from '@angular/common';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-examenprofe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examenprofe.html',
  styleUrl: './examenprofe.css',
})
export class Examenprofe implements OnInit {
  private examenService = inject(ExamenService);

  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  // 1. Convertimos respuestas en un Signal usando Record para que sea 100% reactivo
  respuestas = signal<Record<number, number>>({});

  ngOnInit(): void {
    this.cargando.set(true);

    this.examenService.obtenerExamen('examenprofe').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen || 'Examen Profe');

        // 2. Asignamos un globalId secuencial único (1, 2, 3...) para evitar problemas de ID
        const preguntasUnicas = (resultado.preguntas || []).map((pregunta: Pregunta, index: number) => ({
          ...pregunta,
          globalId: pregunta.globalId || index + 1
        }));

        this.preguntas.set(preguntasUnicas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el examen del profesor', err);
        this.cargando.set(false);
      },
    });
  }

  responder(globalId: number, indice: number) {
    // 3. Actualizamos la señal de forma inmutable para que Angular detecte el cambio al instante
    this.respuestas.update((prev) => ({
      ...prev,
      [globalId]: indice,
    }));
  }

  esCorrecta(globalId: number): boolean | null {
    const seleccion = this.respuestas()[globalId];
    if (seleccion === undefined) return null;

    const pregunta = this.preguntas().find((p) => p.globalId === globalId);
    if (!pregunta) return null;

    return seleccion === pregunta.respuestaCorrecta;
  }
}