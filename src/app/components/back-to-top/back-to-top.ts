import { Component, HostListener, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  imports: [CommonModule],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.css',
  changeDetection: ChangeDetectionStrategy.OnPush, // 👈 Evita re-renderizar la vista principal
})
export class BackToTop {
  // Convertimos a Signal para aislar el estado
  isVisible = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Solo actualiza la Signal si el estado cambia realmente
    if ((scrollPos > 300) !== this.isVisible()) {
      this.isVisible.set(scrollPos > 300);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}