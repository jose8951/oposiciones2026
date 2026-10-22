import { Component, inject, OnInit, signal } from '@angular/core';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ayala-1-con',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ayala-1-con.html',
  styleUrl: './ayala-1-con.css',
})
export class Ayala1Con implements OnInit {
  private examenService = inject(ExamenService);

  // Signals para la reactividad
  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  respuestas = new Map<number, number>();

  ngOnInit(): void {
    this.cargando.set(true);

    // Carga las preguntas llamando a la clave 'ayala_1_con' (o la identificativa en tu JSON/servicio)
    this.examenService.obtenerExamen('ayala_1_con').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);
        this.preguntas.set(resultado.preguntas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el test de Ayala 1 Constitución', err);
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