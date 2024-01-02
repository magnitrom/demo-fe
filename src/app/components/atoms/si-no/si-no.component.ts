/* Importación de los módulos necesarios de la biblioteca central de Angular. */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AlertModel } from 'src/app/models/alert.model';
declare let $: any;

/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-si-no',
  templateUrl: './si-no.component.html',
  styleUrls: ['./si-no.component.scss'],
})


/* La clase es un componente que recibe un objeto de tipo AlertModel como entrada y emite un objeto de
escriba AlertModel como salida. */

export class SiNoComponent implements OnInit, AfterViewInit {
  @Input() alerta!: AlertModel;

  @Output() OK = new EventEmitter();
  @Output() CANCELAR = new EventEmitter();

  constructor() { /* constructor */ }

/* Abriendo el modal. */
  ngOnInit(): void { /* oninit */ }

  ngAfterViewInit() {
    $('.modal').modal();   
    $('.modal').modal({'dismissible':false});
    $('.modal').modal('open');
  }

/**
 *
* La función se llama cuando el usuario hace clic en el botón Aceptar en el modal. Cierra el modal, establece
 * el objeto de alerta a sus valores predeterminados y emite el evento OK.
 */
  ok() {
    $('.modal').modal('close');
    this.alerta={...this.alerta, estado:false, titulo:'', mensaje:'', metodoCancelar:''};
    this.OK.emit(this.alerta);
  }

/**
 * This.alerta={...this.alerta, estado:false, titulo:'', mensaje:'', metodoOK:''};
 */
  cancelar() {
    $('.modal').modal('close');
    this.alerta={...this.alerta, estado:false, titulo:'', mensaje:'', metodoOK:''};
    this.CANCELAR.emit(this.alerta);
  }

 
}
