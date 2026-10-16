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

  // Signals locales del componente (Garantizan la reactividad en F5)
  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  respuestas = new Map<number, number>();

  ngOnInit(): void {
    this.cargando.set(true);

    // Solicitamos los datos específicos del examen del profesor al servicio
    this.examenService.obtenerExamen('examenprofe').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen || 'Examen Profe');
        this.preguntas.set(resultado.preguntas || []);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el examen del profesor', err);
        this.cargando.set(false);
      },
    });
  }

  responder(globalId: number, indice: number) {
    this.respuestas.set(globalId, indice);
  }

  esCorrecta(globaId: number): boolean | null {
    const pregunta = this.preguntas().find((p) => p.globalId === globaId);
    if (!pregunta || !this.respuestas.has(globaId)) return null;
    return this.respuestas.get(globaId) === pregunta.respuestaCorrecta;
  }
}