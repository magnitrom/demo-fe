import { Component, Input, OnInit } from '@angular/core';

/* Un decorador. Es una función que modifica la clase que le sigue. */
@Component({
  selector: 'app-sefin-avatarbar',
  templateUrl: './sefin-avatarbar.component.html',
  styleUrls: ['./sefin-avatarbar.component.scss']
})
/* La clase es un componente que se utiliza para mostrar el avatar y el nombre del usuario. */
export class SefinAvatarbarComponent implements OnInit {
  @Input()  datosUsuario !: any;
  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

}
