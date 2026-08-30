import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private router = inject(Router);
  searchTerm: string = '';

  // Lista de exámenes para el menú principal
  examenes = [
    { label: '2026', route: '/examen2026' },
    { label: '2025A', route: '/examen2025a' },
    { label: '2025B', route: '/examen2025b' },
    { label: '2024A', route: '/examen2024a' },
    { label: '2024B', route: '/examen2024b' },
    { label: '2023', route: '/examen2023' },
    { label: '2019', route: '/examen2019' },
    { label: '2018', route: '/examen2018' },
    { label: 'Desarrollo (A)', route: '/desarrollo-a' },
    { label: 'Sistemas (B)', route: '/sistemas-b' },
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
  ];
  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/buscar'], {
        queryParams: { q: this.searchTerm.trim() },
      });
    }
  }
}
