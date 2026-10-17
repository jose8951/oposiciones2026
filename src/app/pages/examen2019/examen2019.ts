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
  selector: 'app-examen2019',
  imports: [CommonModule],
  templateUrl: './examen2019.html',
  styleUrl: './examen2019.css',
})
export class Examen2019 implements OnInit {

  private examenService = inject(ExamenService);

  @ViewChild('formularioExamen')
  formularioExamen?: ElementRef<HTMLFormElement>;

  // Signals locales del componente (Garantizan la reactividad)
  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');

  respuestas = new Map<number, number>();

  ngOnInit(): void {
    this.cargando.set(true);

    // Le pedimos los datos al servicio y nos suscribimos desde el componente
    this.examenService.obtenerExamen('2019').subscribe({
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