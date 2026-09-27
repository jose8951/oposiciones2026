import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenService } from '../../services/examen';

@Component({
  selector: 'app-banco-fichas-boe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banco-fichas-boe.html',
  styleUrl: './banco-fichas-boe.css',
})
export class BancoFichasBoe implements OnInit {
  private examenService = inject(ExamenService);

  cargando = signal<boolean>(false);
  tituloNormativa = signal<string>('');
  bloques = signal<any[]>([]);

  ngOnInit(): void {
    this.cargando.set(true);
    this.examenService.obtenerExamen('banco-fichas-boe').subscribe({
      next: (resultado: any) => {
        if (resultado) {
          this.tituloNormativa.set(resultado.titulo || 'Banco de Fichas');
          
          // Mapeamos 'apartados' del nuevo JSON a la estructura de bloques que espera la vista
          const listaApartados = resultado.apartados || [];

       const gruposMapeados = listaApartados.map((apartado: any) => ({
            bloqueId: apartado.apartadoId,
            nombreBloque: apartado.nombreApartado,
            normativaRef: apartado.referenciaNormativa,
            preguntas: (apartado.preguntas || []).map((p: any) => ({
              numeroPregunta: p.globalId || p.id,
              pregunta: p.pregunta,
              respuestaCorrecta: p.respuestaCorrecta,
              explicacion: p.explicacion || ''
            }))
          }));

          this.bloques.set(gruposMapeados);
        }
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando el banco de fichas', err);
        this.cargando.set(false);
      },
    });
  }
}