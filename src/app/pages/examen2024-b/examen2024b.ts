import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ExamenService } from '../../services/examen';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-examen2024-b',
  imports: [CommonModule],
  templateUrl: './examen2024b.html',
  styleUrl: './examen2024b.css',
})
export class Examen2024B implements OnInit {
  private examenService = inject(ExamenService);
  // Signals locales del componente (Garantizan la reactividad en F5)
  preguntas = signal<Pregunta[]>([]);
  cargando = signal<boolean>(false);
  nombreExamen = signal<string>('');
  respuestas = new Map<number, number>();

  ngOnInit(): void {
    this.cargando.set(true)

    // Le pedimos los datos al servicio y nos suscribimos desde el componente
    this.examenService.obtenerExamen('2024b').subscribe({
      next: (resultado)=>{
        this.nombreExamen.set(resultado.examen)
        this.preguntas.set(resultado.preguntas)
        this.cargando.set(false)
      },
      error:(err)=>{
        console.error('Error cargando el examen ', err)
        this.cargando.set(false)
      },
    })
  }

  responder(globalId:number, indice:number){
    this.respuestas.set(globalId,indice);
  }

  esCorrecta(globaId:number):boolean | null{
    const pregunta=this.preguntas().find((p)=>p.globalId===globaId);
    if(!pregunta || !this.respuestas.has(globaId)) return null;
    return this.respuestas.get(globaId) === pregunta.respuestaCorrecta;
  }
}
