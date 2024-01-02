import { Component, Input, OnInit } from '@angular/core';
import { PreloaderModel } from 'src/app/models/preloader.model';


/* funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-sefin-preloader',
  templateUrl: './sefin-preloader.component.html',
  styleUrls: ['./sefin-preloader.component.scss']
})

/* La clase es un componente que se utiliza para mostrar un precargador. */
export class SefinPreloaderComponent implements OnInit {
  @Input() preloaderModel!: PreloaderModel;

  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

}
