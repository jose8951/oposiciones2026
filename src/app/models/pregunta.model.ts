export interface Pregunta {
  id: number;
  globalId: number;
  seccion: string;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number | null;
  anulada: boolean;
  explicacion: string;
}

export interface Examen {
  examen: string;
  preguntas: Pregunta[];
}