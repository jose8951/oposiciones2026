import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ce',
  imports: [],
  templateUrl: './ce.html',
  styleUrl: './ce.css',
})
export class CE implements OnInit{
  ngOnInit(): void {
    // Esto hace la función de un "target=_blank" automático al entrar a la página
    window.open('assets/data/cons_espa.pdf#zoom=125', '_blank');
  }

}
