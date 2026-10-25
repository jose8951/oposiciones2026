
import { Component, inject, OnInit, signal } from '@angular/core';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ayala-6-con',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ayala-6-con.html',
  styleUrl: './ayala-6-con.css',
})
export class Ayala6Con implements OnInit {
  private examenService = inject(ExamenService);

  // Signals para la reactividad
  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  respuestas = new Map<number, number>();

  ngOnInit(): void {
    this.cargando.set(true);

    // Carga las preguntas llamando a la clave 'ayala_6_con' del servicio
    this.examenService.obtenerExamen('ayala_6_con').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);
        this.preguntas.set(resultado.preguntas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el test de Ayala 6', err);
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