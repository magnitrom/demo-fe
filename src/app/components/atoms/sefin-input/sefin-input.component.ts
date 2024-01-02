import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';


/* Una funcion que se utiliza para definir los metadatos del componente. */

@Component({
  selector: 'sefin-input',
  templateUrl: './sefin-input.component.html',
  styleUrls: ['./sefin-input.component.scss'],
})

/* El decorador @Input() se usa para definir una propiedad que se puede pasar desde el componente principal. */
export class SefinInputComponent implements OnInit {
  @Input() control2?: AbstractControl = new FormControl();

  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }
}
