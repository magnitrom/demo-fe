import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DetalleFondoPropio } from '../interfaces/DetalleFondoPropio.interface';

import M from 'materialize-css';
import { ApiPdfComprobanteService } from 'src/app/services/api-pdf-comprobante.service';

@Component({
  selector: 'app-detalle-fondos-propios',
  templateUrl: './detalle-fondos-propios.component.html',
  styleUrls: ['./detalle-fondos-propios.component.scss']
})
export class DetalleFondosPropiosComponent implements AfterViewInit, OnInit {
  
  @Output() regresarM: EventEmitter<string> = new EventEmitter<string>();
  @Input()  detalleFondo : DetalleFondoPropio = {
    numeroTGR: '',
    institucion: '',
    origenCreacion: '', 
    total: 0

  }

  pdfTGR: any

  constructor( private apiPdfComprobante: ApiPdfComprobanteService){  }

  ngOnInit(): void {
    this.obtenerPdfComprobante(this.detalleFondo.numeroTGR)    
  }

  regresarMain(){  
    this.regresarM.emit('3');
  }

  ngAfterViewInit() {
    M.updateTextFields();
  }

  obtenerPdfComprobante(numeroTgr: any) {
    let bodyPdf = { 'numeroTgr': numeroTgr };

    this.apiPdfComprobante.getPdf(bodyPdf).subscribe((response) => {
      this.pdfTGR = 'data:application/pdf;base64,' + response.data[0];
    });

  }

}
