export interface Pregunta {
  id?: number;
  globalId: number;
  seccion?: string;
  anio?: number; // <-- Cambiado 'año' por 'anio'
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  anulada?: boolean;
  explicacion: string;
}
export interface Examen {
  examen: string;
  preguntas: Pregunta[];
}