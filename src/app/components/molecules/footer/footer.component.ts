import { Component } from '@angular/core';

/* Funcin que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


/* Esta clase es un componente que se utiliza para mostrar el pie de página de la aplicación. */
export class FooterComponent  {

 

  yearCopyRight: number =  new Date().getFullYear()

  

}
