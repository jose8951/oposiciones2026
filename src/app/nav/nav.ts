import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
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
  ];

  pdfs = [
    { titulo: 'Examen 2026', id: 'Tai_oposion_2026', suffix: '' },
    {
      titulo: 'Examen 2025 - Bloque A',
      id: 'Tai_oposion_A_2025',
      suffix: ' (A)',
    },
    {
      titulo: 'Examen 2025 - Bloque B',
      id: 'Tai_oposion_B_2025',
      suffix: ' (B)',
    },
    {
      titulo: 'Examen 2024 - Bloque A',
      id: 'Tai_oposion_A_2024',
      suffix: ' (A)',
    },
    {
      titulo: 'Examen 2024 - Bloque B',
      id: 'Tai_oposion_B_2024',
      suffix: ' (B)',
    },
    { titulo: 'Examen 2023', id: 'Tai_oposion_2023', suffix: '' },
    { titulo: 'Examen 2019', id: 'Tai_oposion_2019', suffix: '' },
    { titulo: 'Examen 2018', id: 'Tai_oposion_2018', suffix: '' },
  ];
}
