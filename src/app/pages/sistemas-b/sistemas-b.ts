import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-sistemas-b',
  imports: [CommonModule],
  templateUrl: './sistemas-b.html',
  styleUrl: './sistemas-b.css',
})
export class SistemasB implements OnInit {

  private examenService = inject(ExamenService);

  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  // Reemplazamos el Map por una Signal con un Record plano
  respuestas = signal<Record<number, number>>({});

  ngOnInit(): void {
    this.cargando.set(true);

    this.examenService.obtenerExamen('sistemas-b').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);
        this.preguntas.set(resultado.preguntas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el examen', err);
        this.cargando.set(false);
      },
    });
  }

  responder(event: Event, globalId: number, indice: number) {
    // Detiene el comportamiento por defecto y la propagación de eventos que alteran el scroll
    event.stopPropagation();

    // Actualización inmutable para notificar cambios precisos a la vista
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