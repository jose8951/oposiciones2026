import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Examen } from '../models/pregunta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  private http = inject(HttpClient);

  // Dejamos las rutas mapeadas con una clave para identificarlas fácilmente
  private rutasExamenes: { [key: string]: string } = {
    '2025a': 'assets/data/examen2025a.json', // <-- Añadido
    '2025b': 'assets/data/examen2025b.json', // <-- Añadido
    '2024a': 'assets/data/examen2024a.json',
    '2024b': 'assets/data/examen2024b.json',
    '2023': 'assets/data/examen2023.json',
    '2019': 'assets/data/examen2019.json',
    '2018': 'assets/data/examen2018.json',
  };
  // Este método ahora devuelve un Observable directo para que el componente lo controle con seguridad
  obtenerExamen(tipo: string): Observable<Examen> {
    const ruta = this.rutasExamenes[tipo];
    if (!ruta) {
      throw new Error(`El examen ${tipo} no está configurado.`);
    }
    return this.http.get<Examen>(ruta);
  }
}
