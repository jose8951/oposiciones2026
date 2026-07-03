import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-examen2025-b',
  imports: [CommonModule],
  templateUrl: './examen2025-b.html',
  styleUrl: './examen2025-b.css',
})
export class Examen2025B implements OnInit {

    private examenService = inject(ExamenService);
  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');
  respuestas = new Map<number, number>();

  
  ngOnInit(): void {
 this.cargando.set(true);
    // Cambiamos el identificador a '2025b'
    this.examenService.obtenerExamen('2025b').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);
        this.preguntas.set(resultado.preguntas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el examen 2025B', err);
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
