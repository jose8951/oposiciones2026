import { CanActivateFn, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { Examen2018 } from './pages/examen2018/examen2018';
import { Examen2019 } from './pages/examen2019/examen2019';
import { Examen2023 } from './pages/examen2023/examen2023';
import { Examen2024A } from './pages/examen2024-a/examen2024a';
import { Examen2024B } from './pages/examen2024-b/examen2024b';
import { Examen2025A } from './pages/examen2025-a/examen2025-a';
import { Examen2025B } from './pages/examen2025-b/examen2025-b';
import { Examen2026 } from './pages/examen2026/examen2026';
import { DesarrolloA } from './pages/desarrollo-a/desarrollo-a';
import { SistemasB } from './pages/sistemas-b/sistemas-b';
import { CE } from './pages/CE/ce';
import { VisorPdf } from './pages/visor-pdf/visor-pdf';
import { Buscar } from './pages/buscar/buscar';
import { Tecnologia } from './pages/tecnologia/tecnologia';

// 🔒 GUARD DE SEGURIDAD (Simulado para el futuro Login)
const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // TODO: En el futuro, aquí comprobarás si existe el token JWT de Spring Boot
  const isAuthenticated = true; // De momento lo dejamos en true para que puedas programar

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']); // Si no está logueado, lo mandas al login
    return false;
  }
};

export const routes: Routes = [
  // 🚀 REDIRECCIÓN INICIAL: Siempre primero para obligar la entrada a examen2026
  { path: '', redirectTo: 'examen2026', pathMatch: 'full' },

  // 📝 RUTAS DE LOS EXÁMENES
  { path: 'examen2018', component: Examen2018, canActivate: [authGuard] },
  { path: 'examen2019', component: Examen2019, canActivate: [authGuard] },
  { path: 'examen2023', component: Examen2023, canActivate: [authGuard] },
  { path: 'examen2024a', component: Examen2024A, canActivate: [authGuard] },
  { path: 'examen2024b', component: Examen2024B, canActivate: [authGuard] },
  { path: 'examen2025a', component: Examen2025A, canActivate: [authGuard] },
  { path: 'examen2025b', component: Examen2025B, canActivate: [authGuard] },
  { path: 'examen2026', component: Examen2026, canActivate: [authGuard] },
  { path: 'desarrollo-a', component: DesarrolloA, canActivate: [authGuard] },
  { path: 'sistemas-b', component: SistemasB, canActivate: [authGuard] },
  { path: 'tecnologia', component: Tecnologia, canActivate: [authGuard] },

  { path: 'ce', component: CE, canActivate: [authGuard] },

  // 🔍 BUSCADOR GENERAL DE PREGUNTAS
  { path: 'buscar', component: Buscar, canActivate: [authGuard] },

  // 📄 VISOR PDF DINÁMICO
  {
    path: 'pdf/:carpeta/:archivo',
    component: VisorPdf,
    canActivate: [authGuard],
  },

  // 🛡️ CONTROL DE ERRORES: Si ponen cualquier URL inventada, redirige a examen2026
  { path: '**', redirectTo: 'examen2026' },
];
