import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visor-pdf',
  imports: [CommonModule],
  templateUrl: './visor-pdf.html',
  styleUrl: './visor-pdf.css',
})
export class VisorPdf implements OnInit{

  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  // Signal para almacenar la URL segura que procesará el iframe
  pdfUrl = signal<SafeResourceUrl | null>(null);
  ngOnInit(): void {
   // Nos suscribimos al paramMap por si el usuario cambia de PDF sin salir de la página
    this.route.paramMap.subscribe(params => {
      const carpeta = params.get('carpeta');
      const archivo = params.get('archivo');

      if (carpeta && archivo) {
        // Mapeamos el parámetro 'archivo' al nombre real de tus PDFs físicos
        // Si el archivo es 'preguntas', cargará tu cuestionario. Si es 'resultados', la plantilla.
        const nombreRealPdf = archivo === 'preguntas' ? 'cuestionario' : 'plantilla';

        // Construimos la ruta dinámica apuntando a tus subcarpetas en assets
        const rutaCompleta = `assets/data/${carpeta}/${nombreRealPdf}.pdf`;

        // Sanitizamos la URL para que Angular permita renderizarla en el iframe
        this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(rutaCompleta));
      }
    });
  }
}