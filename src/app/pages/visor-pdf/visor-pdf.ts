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
export class VisorPdf implements OnInit {

  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  pdfUrl = signal<SafeResourceUrl | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const carpeta = params.get('carpeta');
      const archivo = params.get('archivo');

      if (carpeta && archivo) {
        const nombreRealPdf = archivo === 'preguntas' ? 'cuestionario' : 'plantilla';
        const rutaCompleta = `assets/data/${carpeta}/${nombreRealPdf}.pdf`;

        this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(rutaCompleta));
      }
    });
  }
}