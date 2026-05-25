import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Pregunta } from '../../models/pregunta.model';
import { ExamenService } from '../../services/examen';

@Component({
  selector: 'app-examen2023',
  imports: [CommonModule],
  templateUrl: './examen2023.html',
  styleUrl: './examen2023.css',
})
export class Examen2023 implements OnInit {
   private examenService = inject(ExamenService);

  // Signals locales del componente (Garantizan la reactividad en F5)
  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  respuestas = new Map<number, number>();
  ngOnInit(): void {
      this.cargando.set(true);

    // Le pedimos los datos al servicio y nos suscribimos desde el componente
    this.examenService.obtenerExamen('2023').subscribe({
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

  responder(globalId: number, indice: number) {
    this.respuestas.set(globalId, indice);
  }

  esCorrecta(globaId: number): boolean | null {
    const pregunta = this.preguntas().find((p) => p.globalId === globaId);
    if (!pregunta || !this.respuestas.has(globaId)) return null;
    return this.respuestas.get(globaId) === pregunta.respuestaCorrecta;
  }
}
