import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Nav } from "./nav/nav";
import { BackToTop } from './components/back-to-top/back-to-top';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'oposicion2026';
  private router = inject(Router);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (typeof gtag === 'function') {
        gtag('config', 'G-C5QZR3C46C', {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }
}