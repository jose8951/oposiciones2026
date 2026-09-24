import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Examen, Pregunta } from '../models/pregunta.model';
import { Observable, forkJoin, map, shareReplay, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  private http = inject(HttpClient);

  private rutasExamenes: { [key: string]: string } = {
    '2026': 'assets/data/examen2026.json',
    '2025a': 'assets/data/examen2025a.json',
    '2025b': 'assets/data/examen2025b.json',
    '2024a': 'assets/data/examen2024a.json',
    '2024b': 'assets/data/examen2024b.json',
    '2023': 'assets/data/examen2023.json',
    '2019': 'assets/data/examen2019.json',
    '2018': 'assets/data/examen2018.json',
    'desarrollo-a': 'assets/data/desarrollo-a.json',
    'sistemas-b': 'assets/data/sistemas-b.json',
    'tecnologia': 'assets/data/tecnologia.json',
    'bloque3': 'assets/data/examen-tai-bloque3.json',
    'normativa169': 'assets/data/normativa_tai-v2.json',
  };

  // 🗄️ Caché para exámenes individuales y para la búsqueda general
  private cacheExamenes = new Map<string, Observable<any>>();
  private cache$?: Observable<(Pregunta & { examenOrigen?: string })[]>;

  obtenerExamen(tipo: string): Observable<any> {
    const ruta = this.rutasExamenes[tipo];
    if (!ruta) {
      throw new Error(`El examen ${tipo} no está configurado.`);
    }

    // Si el examen no está en caché, lo descargamos y lo guardamos en memoria
    if (!this.cacheExamenes.has(tipo)) {
      const peticion$ = this.http.get<any>(ruta).pipe(
        shareReplay(1) // Mantiene la respuesta guardada para futuras suscripciones
      );
      this.cacheExamenes.set(tipo, peticion$);
    }

    return this.cacheExamenes.get(tipo)!;
  }

  private getAllPreguntas(): Observable<(Pregunta & { examenOrigen?: string })[]> {
    if (!this.cache$) {
      const peticiones = Object.values(this.rutasExamenes).map((ruta) =>
        this.http.get<any>(ruta).pipe(
          map((data) => {
            if (data.preguntas && Array.isArray(data.preguntas)) {
              return data.preguntas.map((p: any) => ({
                ...p,
                examenOrigen: data.examen || 'Examen TAI',
              }));
            }

            if (data.bloques && Array.isArray(data.bloques)) {
              const preguntasNormativa: (Pregunta & { examenOrigen?: string })[] = [];
              data.bloques.forEach((b: any) => {
                if (b.preguntas && Array.isArray(b.preguntas)) {
                  b.preguntas.forEach((p: any) => {
                    preguntasNormativa.push({
                      globalId: p.numeroPregunta,
                      pregunta: p.pregunta,
                      opciones: [],
                      respuestaCorrecta: -1,
                      explicacion: p.explicacion,
                      examenOrigen: data.titulo || 'Normativa 169',
                    });
                  });
                }
              });
              return preguntasNormativa;
            }

            return [];
          }),
          catchError((err) => {
            console.error(`Error procesando preguntas desde ${ruta}:`, err);
            return of([]);
          })
        )
      );

      this.cache$ = forkJoin(peticiones).pipe(
        map((res) => res.flat()),
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  buscarPreguntas(query: string): Observable<(Pregunta & { examenOrigen?: string })[]> {
    const term = query.toLowerCase().trim();
    if (!term) return new Observable((obs) => obs.next([]));

    return this.getAllPreguntas().pipe(
      map((lista) =>
        lista.filter(
          (p) =>
            p.pregunta?.toLowerCase().includes(term) ||
            p.opciones?.some((o) => o.toLowerCase().includes(term)) ||
            p.explicacion?.toLowerCase().includes(term)
        )
      )
    );
  }
}