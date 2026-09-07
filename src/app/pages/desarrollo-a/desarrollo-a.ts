import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-desarrollo-a',
  imports: [CommonModule],
  templateUrl: './desarrollo-a.html',
  styleUrl: './desarrollo-a.css',
})
export class DesarrolloA implements OnInit {

  private examenService = inject(ExamenService);

  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  // Estado inmutable usando Record en lugar de Map
  respuestas = signal<Record<number, number>>({});

  ngOnInit(): void {
    this.cargarExamen();
  }

  cargarExamen() {
    this.cargando.set(true);

    this.examenService.obtenerExamen('desarrollo-a').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);
        this.preguntas.set(resultado.preguntas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el examen de Desarrollo A', err);
        this.cargando.set(false);
      },
    });
  }

  responder(event: Event, globalId: number, indice: number) {
    // Detenemos cualquier comportamiento nativo del radio/label que mueva el foco o el scroll
    event.stopPropagation();

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