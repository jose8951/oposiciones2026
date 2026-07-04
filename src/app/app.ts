import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";
import { BackToTop } from './components/back-to-top/back-to-top';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'oposicion2026';
}
