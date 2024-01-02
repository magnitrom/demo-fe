import { Component, Input, OnInit } from '@angular/core';
import { serviciosStringParse } from 'src/app/utils/helpers';

@Component({
  selector: 'app-detalle-tgrs',
  templateUrl: './detalle-tgrs.component.html',
  styles: [
  ]
})
export class DetalleTGRSComponent implements OnInit {
  @Input() detalle = {
    numeroTgr: '',
    nombreRazonSocial: '',
    numeroIdentificacion: '',
    institucion: '',
    estado: '',
    servicios: '',
    bitacoraTGR: ''
  };
  servicios!: any[];

  constructor() {
    //constructor
  }

  ngOnInit(): void {
    this.servicios = serviciosStringParse(this.detalle.servicios);
  }

  calcularSumatoria(): number {
    return this.servicios.reduce((total, servicio) => total + servicio.valor, 0);
  }
}
