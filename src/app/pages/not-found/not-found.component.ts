import { Component, OnInit } from '@angular/core';
/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
/* Esta clase es un componente que se utiliza para mostrar un mensaje al usuario cuando el usuario navega a un
ruta que no existe. */
export class NotFoundComponent implements OnInit {

  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

}
