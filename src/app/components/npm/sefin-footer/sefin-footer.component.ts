import { Component, Input, OnInit } from '@angular/core';
import { FooterModel } from 'src/app/models/footer.model';


/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-sefin-footer',
  templateUrl: './sefin-footer.component.html',
  styleUrls: ['./sefin-footer.component.scss']
})

/* Es un componente que toma un FooterModel como entrada y lo muestra. */
export class SefinFooterComponent implements OnInit {
  @Input() footerModel!: FooterModel;

  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

}
