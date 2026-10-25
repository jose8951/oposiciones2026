import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private router = inject(Router);
  searchTerm: string = '';

  // Estados independientes para cada desplegable
  isExamenesOpen = false;
  isTemariosOpen = false;
  isAyalaOpen = false;

  toggleExamenes() {
    this.isExamenesOpen = !this.isExamenesOpen;
    this.isTemariosOpen = false; // Cierra el otro si está abierto
    this.isAyalaOpen = false;
  }

  toggleTemarios() {
    this.isTemariosOpen = !this.isTemariosOpen;
    this.isExamenesOpen = false; // Cierra el otro si está abierto
    this.isAyalaOpen = false;
  }
  toggleAyala() {
    // 👈 Nuevo toggle
    this.isAyalaOpen = !this.isAyalaOpen;
    this.isExamenesOpen = false;
    this.isTemariosOpen = false;
  }

  examenesAnios = [
    { label: '2026', route: '/examen2026' },
    { label: '2025A', route: '/examen2025a' },
    { label: '2025B', route: '/examen2025b' },
    { label: '2024A', route: '/examen2024a' },
    { label: '2024B', route: '/examen2024b' },
    { label: '2023', route: '/examen2023' },
    { label: '2019', route: '/examen2019' },
    { label: '2018', route: '/examen2018' },
  ];

  temariosBloques = [
    { label: 'Desarrollo', route: '/desarrollo-a' },
    { label: 'Sistemas', route: '/sistemas-b' },
    { label: 'Tecnología', route: '/tecnologia' },
    { label: 'Bloque3', route: '/bloque3' },
    { label: 'Normativa', route: '/normativa169' },
    { label: 'Administración', route: '/banco-fichas-boe' },
    { label: 'Examen Profe', route: '/examenprofe' },
  ];

  // 👈 Nuevo array para los enlaces de la academia Ayala
  ayalaLinks = [
    { label: 'Ayala 1 Constitución', route: '/ayala-1-con' },
    { label: 'Ayala 2 Cortes Generales', route: '/ayala-2-con' },
    { label: 'Ayala 3 El Gobierno', route: '/ayala-3-con' },
    { label: 'Ayala 4 EBEP y Transparencia', route: '/ayala-4-con' },
    { label: 'Ayala 5 Igualdad y Dependencia', route: '/ayala-5-con' },
    { label: 'Ayala 6 Protección de Datos', route: '/ayala-6-con' },
  ];

  pdfs = [
    { titulo: 'Examen 2026', id: 'Tai_oposion_2026', label: '' },
    {
      titulo: 'Examen 2025 - Bloque A',
      id: 'Tai_oposion_A_2025',
      label: ' (A)',
    },
    {
      titulo: 'Examen 2025 - Bloque B',
      id: 'Tai_oposion_B_2025',
      label: ' (B)',
    },
    {
      titulo: 'Examen 2024 - Bloque A',
      id: 'Tai_oposion_A_2024',
      label: ' (A)',
    },
    {
      titulo: 'Examen 2024 - Bloque B',
      id: 'Tai_oposion_B_2024',
      label: ' (B)',
    },
    { titulo: 'Examen 2023', id: 'Tai_oposion_2023', label: '' },
    { titulo: 'Examen 2019', id: 'Tai_oposion_2019', label: '' },
    { titulo: 'Examen 2018', id: 'Tai_oposion_2018', label: '' },
    // {
    //   titulo: 'Bloque 3',
    //   id: 'pregunta_generales_bloque3_buscable',
    //   label: ' (Bloque 3)',
    // },
    { titulo: 'Examen Profe', id: 'Tai_oposion_profe', label: ' (Profe)' },
  ];

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/buscar'], {
        queryParams: { q: this.searchTerm.trim() },
      });
    }
  }
}
