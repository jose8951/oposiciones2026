import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Pregunta } from '../../models/pregunta.model';
import { ExamenService } from '../../services/examen';

@Component({
  selector: 'app-examen2024b',
  imports: [CommonModule],
  templateUrl: './examen2024b.html',
  styleUrl: './examen2024b.css',
})
export class Examen2024B implements OnInit {

  private examenService = inject(ExamenService);

  @ViewChild('formularioExamen')
  formularioExamen?: ElementRef<HTMLFormElement>;

  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  respuestas = new Map<number, number>();

  ngOnInit(): void {
    this.cargando.set(true);

    this.examenService.obtenerExamen('2024b').subscribe({
      next: (resultado) => {
        this.nombreExamen.set(resultado.examen);
        this.preguntas.set(resultado.preguntas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando examen', err);
        this.cargando.set(false);
      },
    });
  }

  @HostListener('window:pageshow')
  limpiarRespuestasAlMostrar(): void {
    this.respuestas.clear();
    this.formularioExamen?.nativeElement.reset();
  }

  responder(globalId: number, indice: number): void {
    this.respuestas.set(globalId, indice);
  }

  esCorrecta(globalId: number): boolean | null {
    const pregunta = this.preguntas().find(
      (p) => p.globalId === globalId
    );

    if (!pregunta || !this.respuestas.has(globalId)) {
      return null;
    }

    return this.respuestas.get(globalId) === pregunta.respuestaCorrecta;
  }
}