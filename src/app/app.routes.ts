import { CanActivateFn, Router, Routes } from '@angular/router';
import { Examen2018 } from './pages/examen2018/examen2018';
import { Examen2019 } from './pages/examen2019/examen2019';
import { Examen2023 } from './pages/examen2023/examen2023';
import { Examen2024A } from './pages/examen2024-a/examen2024a';
import { Examen2024B } from './pages/examen2024-b/examen2024b';
import { Examen2025A } from './pages/examen2025-a/examen2025-a';
import { Examen2025B } from './pages/examen2025-b/examen2025-b';
import { CE } from './pages/CE/ce';
import { inject } from '@angular/core';
import { VisorPdf } from './pages/visor-pdf/visor-pdf';

// 🔒 GUARD DE SEGURIDAD (Simulado para el futuro Login)
const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // TODO: En el futuro, aquí comprobarás si existe el token JWT de Spring Boot
  // const isAuthenticated = !!localStorage.getItem('token');
  const isAuthenticated = true; // De momento lo dejamos en true para que puedas programar

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']); // Si no está logueado, lo mandas al login
    return false;
  }
};

export const routes: Routes = [
  { path: 'examen2018', component: Examen2018, canActivate: [authGuard] },
  { path: 'examen2019', component: Examen2019, canActivate: [authGuard] },
  { path: 'examen2023', component: Examen2023, canActivate: [authGuard] },
  { path: 'examen2024a', component: Examen2024A, canActivate: [authGuard] },
  { path: 'examen2024b', component: Examen2024B, canActivate: [authGuard] },
  { path: 'examen2025a', component: Examen2025A, canActivate: [authGuard] },
  { path: 'examen2025b', component: Examen2025B, canActivate: [authGuard] },
  { path: 'ce', component: CE, canActivate: [authGuard] },

  // 📄 NUEVA RUTA DINÁMICA: Acepta la carpeta y el nombre del PDF, protegida por tu Guard
  {
    path: 'pdf/:carpeta/:archivo',
    component: VisorPdf,
    canActivate: [authGuard],
  },

  // Ruta inicial por defecto
  { path: '', redirectTo: 'examen2024a', pathMatch: 'full' },
  // 🛡️ CONTROL DE ERRORES: Si ponen cualquier URL inventada, redirige a la página principal
  { path: '**', redirectTo: 'examen2024a' },
];
