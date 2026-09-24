import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenService } from '../../services/examen';

@Component({
  selector: 'app-normativa169',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './normativa169.html',
  styleUrl: './normativa169.css',
})
export class Normativa169 implements OnInit {
  private examenService = inject(ExamenService);

  cargando = signal<boolean>(false);
  tituloNormativa = signal<string>('');
  bloques = signal<any[]>([]);

  ngOnInit(): void {
    this.cargando.set(true);
    this.examenService.obtenerExamen('normativa169').subscribe({
      next: (resultado: any) => {
        this.tituloNormativa.set(resultado.titulo);
        this.bloques.set(resultado.bloques);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando la normativa', err);
        this.cargando.set(false);
      },
    });
  }
}