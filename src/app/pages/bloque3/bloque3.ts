import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-bloque3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bloque3.html',
  styleUrl: './bloque3.css',
})
export class Bloque3 implements OnInit {
  private examenService = inject(ExamenService);

  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  // Usamos el índice de la pregunta (posición en el array) como clave del Map
  respuestas = signal<Map<number, number>>(new Map());

  ngOnInit(): void {
    this.cargando.set(true);
    this.examenService.obtenerExamen('bloque3').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);
        this.preguntas.set(resultado.preguntas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el Bloque 3', err);
        this.cargando.set(false);
      },
    });
  }

  // Guardamos la respuesta usando el índice de la pregunta en la lista
  responder(preguntaIndex: number, indiceOpcion: number) {
    const nuevoMapa = new Map(this.respuestas());
    nuevoMapa.set(preguntaIndex, indiceOpcion);
    this.respuestas.set(nuevoMapa);
  }

  // Comprobamos el acierto basándonos en el índice de la pregunta
  esCorrecta(preguntaIndex: number): boolean | null {
    const pregunta = this.preguntas()[preguntaIndex];
    const mapaActual = this.respuestas();
    if (!pregunta || !mapaActual.has(preguntaIndex)) return null;
    return mapaActual.get(preguntaIndex) === pregunta.respuestaCorrecta;
  }
}