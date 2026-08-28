import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-examen2026',
  imports: [],
  templateUrl: './examen2026.html',
  styleUrl: './examen2026.css',
})
export class Examen2026 implements OnInit {

  private examenService = inject(ExamenService);

  // Signals locales del componente (Garantizan la reactividad)
  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  respuestas = new Map<number, number>();

  ngOnInit(): void {
    this.cargando.set(true);

    // Le pedimos los datos del examen del 2026 al servicio
    this.examenService.obtenerExamen('2026').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);
        this.preguntas.set(resultado.preguntas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el examen 2026', err);
        this.cargando.set(false);
      },
    });
  }

  responder(globalId: number, indice: number) {
    this.respuestas.set(globalId, indice);
  }

  esCorrecta(globalId: number): boolean | null {
    const pregunta = this.preguntas().find((p) => p.globalId === globalId);
    if (!pregunta || !this.respuestas.has(globalId)) return null;
    return this.respuestas.get(globalId) === pregunta.respuestaCorrecta;
  }
}
