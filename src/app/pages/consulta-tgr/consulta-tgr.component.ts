import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprobantePago } from 'src/app/models/comprobante-pago';
import { ClasificadoresInteroperabilidadService } from 'src/app/services/clasificadores-interoperabilidad.service';
import { ConsultaTgrServiceService } from 'src/app/services/consulta-tgr-service.service';
import { SeguridadApiService } from 'src/app/services/seguridad-api.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { cambiaridPorNombre, parsearCatalogosInteroperabilidad } from 'src/app/utils/utils';


@Component({
  selector: 'app-consulta-tgr',
  templateUrl: './consulta-tgr.component.html',
  styleUrls: ['./consulta-tgr.component.scss']
})

export class ConsultaTgrComponent implements OnInit {
  @Input() tgr!: ComprobantePago;

  @Output() clickAgregar = new EventEmitter();
  @Output() clickModificar = new EventEmitter();
  @Output() clickEliminar = new EventEmitter();

  formularioConsultaTgr: any = {
    'numeroTgrConsultaEstado': '',
    'numeroDocumentoConsultaEstado': '',
    'origenConsultaEstado': 'PORTAL-PUBLICO',
    'estadoConsulta': '',
  }

  catalogos: any = {
    instituciones: [],
    tiposDeDocumentos: []
  }

  estado: string = '';
  nombreUsuario: string = '';
  constructor(private apiClasificadores: ClasificadoresInteroperabilidadService, private apiComprobante: ConsultaTgrServiceService, private apiAuthToken: SeguridadApiService, private route: ActivatedRoute, private router: Router) {


    this.route.params.subscribe(params => {

      // haz algo con los parámetros
      this.estado = params['estado'];

      this.numeroDocumento = params['documento'];

      let formularioConsultaTgr: any = {
        'numeroTgrConsultaEstado': params['numeroTgr'],
        'numeroDocumentoConsultaEstado': params['documento'],
        'origenConsultaEstado': 'PORTAL-PUBLICO',
        'estadoConsulta': params['estado'],
      };

      forkJoin([
        this.apiClasificadores.obtenerRegistros({ clasificador: 'INSTITUCIONES', campos: ["INSTITUCION", "DESC_INSTITUCION"] }).pipe(catchError(err => of({ data: [] }))),
        this.apiClasificadores.obtenerRegistros({ clasificador: 'TIPO_DOCUMENTOS', campos: ["ID", "NOMBRE", "DESCRIPCION", "MASCARA_DOCUMENTO"] }).pipe(catchError(err => of({ data: [] })))
      ]).subscribe(([instituciones, tiposDeDocumentos]) => {
        this.catalogos.instituciones = parsearCatalogosInteroperabilidad(instituciones);
        this.catalogos.tiposDeDocumentos = parsearCatalogosInteroperabilidad(tiposDeDocumentos);
        let user: any = sessionStorage.getItem('userProfile');
        user = JSON.parse(user);
        this.nombreUsuario = user.firstName + " " + user.lastName;
        this.consultarTGR(formularioConsultaTgr);
      });
    });
  }



  ngOnInit(): void {
    //init
  }

  totalPagar: any;
  nombreCiudadano: any;
  origenCreacion: any;
  numeroComprobante: any;
  numeroDocumento: any;
 

  detalleTgr: any;
  consultarTGR(dta: any) {
    this.apiComprobante.consultaTGR(dta).subscribe((response) => {
      if (response.state == 'success') {

        response.data = [{ registroClasificador: response.data }];

        response.data = parsearCatalogosInteroperabilidad(response);

        response.data[0].forEach((item: { INSTITUCION_ID: any; nombreInstitucion: any; nombreTipoDocumento: any; TIPO_DOCUMENTO_ID: any; }) => {
          item.nombreInstitucion = cambiaridPorNombre(this.catalogos.instituciones, item.INSTITUCION_ID, 'INSTITUCION', "DESC_INSTITUCION");
          item.nombreTipoDocumento = cambiaridPorNombre(this.catalogos.tiposDeDocumentos, item.TIPO_DOCUMENTO_ID, 'ID', "DESCRIPCION");
        });



        this.detalleTgr = response.data[0];
        this.totalPagar = this.detalleTgr[0].TOTAL_PAGAR;
        this.nombreCiudadano = this.detalleTgr[0].NOMBRE_CIUDADANO;
        this.origenCreacion = this.detalleTgr[0].ORIGEN_CREACION;
        this.numeroComprobante = this.detalleTgr[0].NUMERO_TGR_FORMATEADO;
      }
    });
  }

}
