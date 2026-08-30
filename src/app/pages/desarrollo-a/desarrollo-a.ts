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

  // Signals locales del componente (Garantizan la reactividad)
  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  respuestas = new Map<number, number>();

  ngOnInit(): void {
    this.cargando.set(true);

    // Solicitamos el examen de Desarrollo (A) mapeado en el servicio
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

  responder(globalId: number, indice: number) {
    this.respuestas.set(globalId, indice);
  }

  esCorrecta(globalId: number): boolean | null {
    const pregunta = this.preguntas().find((p) => p.globalId === globalId);
    if (!pregunta || !this.respuestas.has(globalId)) return null;
    return this.respuestas.get(globalId) === pregunta.respuestaCorrecta;
  }
}