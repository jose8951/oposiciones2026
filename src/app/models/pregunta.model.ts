export interface Pregunta {
  id?: number;
  globalId: number;
  seccion?: string;
  anio?: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  anulada?: boolean;
  explicacion: string;

  // Nuevas propiedades para poder insertar imágenes entre preguntas
  tipo?: string;
  descripcion?: string;
  imagen?: string;
}

export interface Examen {
  examen: string;
  preguntas: Pregunta[];
}