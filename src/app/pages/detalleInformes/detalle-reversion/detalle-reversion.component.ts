import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import M from 'materialize-css';
import { ReversionTgr } from 'src/app/models/ReversionTGR/ReversionTgr.interface';
import { ApiInformesService } from 'src/app/services/api-informes.service';

@Component({
  selector: 'app-detalle-reversion',
  templateUrl: './detalle-reversion.component.html',
  styleUrls: ['./detalle-reversion.component.scss']
})
export class DetalleReversionComponent implements AfterViewInit, OnInit {

  
  @Input()  reversionTgr : ReversionTgr = {
    numeroReversion: '',
    institucionId: '',
    codigoBanco: '',
    nombreBanco: '',
    numeroTgr: '',
    monto: '',
    fechaPago: '',
    estadoGestion: '',
    motivo: '',
    observacionesAprobador: 'Ninguna',
    fechaCreacion: '',
    transaccionBancaria: '',
    cajero: '',
    aprobadoPor: '',
    nombreAgencia: '',
    fechaHoraAprobacion: '',
    estadoTGR: '',
    nombreRazonSocial: '',
    numeroId: 0
  }

  detalleReversion: any = null

  constructor(
    private apiInformes: ApiInformesService){

  }

  ngOnInit() {
   
    console.log("se inicio")
  }
  
  ngAfterViewInit() {
    M.updateTextFields();
  }

  



}
