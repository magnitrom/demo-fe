import { Component, Input, OnInit } from '@angular/core';

/* funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-sefin-navbar',
  templateUrl: './sefin-navbar.component.html',
  styleUrls: ['./sefin-navbar.component.scss']
})


/* La clase es un componente que se utiliza para mostrar un menú. */
export class SefinNavbarComponent implements OnInit {
  @Input()  menu !: any;
  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

}
