import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Examen, Pregunta } from '../models/pregunta.model'; // Asegúrate de importar también Pregunta
import { Observable, forkJoin, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  private http = inject(HttpClient);

  // Dejamos las rutas mapeadas con una clave para identificarlas fácilmente
  private rutasExamenes: { [key: string]: string } = {
    '2026':'assets/data/examen2026.json',
    '2025a': 'assets/data/examen2025a.json', // <-- Añadido
    '2025b': 'assets/data/examen2025b.json', // <-- Añadido
    '2024a': 'assets/data/examen2024a.json',
    '2024b': 'assets/data/examen2024b.json',
    '2023': 'assets/data/examen2023.json',
    '2019': 'assets/data/examen2019.json',
    '2018': 'assets/data/examen2018.json',
    'desarrollo-a': 'assets/data/desarrollo-a.json',
    'sistemas-b': 'assets/data/sistemas-b.json',
    'tecnologia':'assets/data/tecnologia.json',
  };
// Cache para no recargar todos los JSON en cada pulsación de búsqueda
  private cache$?: Observable<(Pregunta & { examenOrigen?: string })[]>;

  // Este método ahora devuelve un Observable directo para que el componente lo controle con seguridad
  obtenerExamen(tipo: string): Observable<Examen> {
    const ruta = this.rutasExamenes[tipo];
    if (!ruta) {
      throw new Error(`El examen ${tipo} no está configurado.`);
    }
    return this.http.get<Examen>(ruta);
  }

  // --- NUEVO MÉTODO AÑADIDO (Sin modificar nada de lo anterior) ---
  
  private getAllPreguntas(): Observable<(Pregunta & { examenOrigen?: string })[]> {
    if (!this.cache$) {
      // Obtenemos todas las rutas del objeto rutasExamenes
      const peticiones = Object.values(this.rutasExamenes).map(ruta =>
        this.http.get<Examen>(ruta).pipe(
          map(data => data.preguntas.map(p => ({ ...p, examenOrigen: data.examen })))
        )
      );

      this.cache$ = forkJoin(peticiones).pipe(
        map(res => res.flat()),
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  buscarPreguntas(query: string): Observable<(Pregunta & { examenOrigen?: string })[]> {
    const term = query.toLowerCase().trim();
    if (!term) return new Observable(obs => obs.next([]));

    return this.getAllPreguntas().pipe(
      map(lista => lista.filter(p => 
        p.pregunta?.toLowerCase().includes(term) ||
        p.opciones?.some(o => o.toLowerCase().includes(term)) ||
        p.explicacion?.toLowerCase().includes(term)
      ))
    );
  }
}