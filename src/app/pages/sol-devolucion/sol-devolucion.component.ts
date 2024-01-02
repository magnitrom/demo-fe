import { Component, OnInit } from '@angular/core';
import { ApiSolDevolucionService } from 'src/app/services/api-sol-devolucion.service';
import { DatePipe, formatCurrency } from '@angular/common';
import { SolicitudDevolucion } from './models/solicitud-devolucion.model';
import * as moment from 'moment';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { GeneradorPdfService } from 'src/app/services/generador-pdf.service';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import { mostrarInfo, obtenerTotalesDeArray, parseServicioAString } from 'src/app/utils/utils';
import { ApiInformesService } from 'src/app/services/api-informes.service';
import { ApiPdfComprobanteService } from 'src/app/services/api-pdf-comprobante.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-sol-devolucion',
  templateUrl: './sol-devolucion.component.html',
  styleUrls: ['./sol-devolucion.component.scss']
})
export class SolDevolucionComponent implements OnInit {

  jsonSolicitudesDevolucion: SolicitudDevolucion[] = [];
  range: Date[] = [];
  searchUno = '';
  pagina = 1;
  auditoriaConsultaUsuario = {
    usuario: '',
    fechaActual: moment().format('DD/MM/YYYY')
  }
  nombreUsuario: string = '';
  pdfTGR = '';
  abrirModal = false;
  screen: string = 'home';

  detalleEnviarModal = {
    numeroTgr: '',
    nombreRazonSocial: '',
    numeroIdentificacion: '',
    institucion: '',
    estado: '',
    servicios: '',
    bitacoraTGR: '',

  }
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-dark-blue' }, { dateInputFormat: 'DD-MM-YYYY' }, { locale: 'es' }, { adaptivePosition: true });

  arrayInstituciones: any[] = [];

  constructor(
    private apiPdfComprobante: ApiPdfComprobanteService,
    private apiInformes: ApiInformesService,
    private apiSolDevolucion: ApiSolDevolucionService,
    private datePipe: DatePipe,
    private readonly generadorPdfSrv: GeneradorPdfService
  ) {
    defineLocale('es', esLocale);
  }

  ngOnInit(): void {
    console.log("sssss");
    this.range = [new Date(), new Date()];
    //let user: any = sessionStorage.getItem('userProfile');
    //user = JSON.parse(user);
    let user = { username: 'bnunez', firstName: 'Bryan', lastName: 'Nunez' }
    this.nombreUsuario = user.firstName + " " + user.lastName;
    this.auditoriaConsultaUsuario.usuario = user.firstName + " " + user.lastName;
    this.obtenerRegistrosSolicitudes(this.range[0].toISOString(), this.range[1].toISOString());
  }

  cambioDeFechaSolicitudes(dates: any) {
    let fechaInicio = this.datePipe.transform(dates![0], 'yyyy-MM-dd');
    let fechaFin = this.datePipe.transform(dates![1], 'yyyy-MM-dd');
    this.obtenerRegistrosSolicitudes(fechaInicio as string, fechaFin as string);
  }

  obtenerRegistrosSolicitudes(fechaInicio: string, fechaFin: string) {
    let bodyTgrSolicitudesDevolucion = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin
    }
console.log("antes getSolicitudes");
    this.apiSolDevolucion.getSolicitudes(bodyTgrSolicitudesDevolucion).subscribe((response) => {
      console.log("despues getSolicitudes");
      this.jsonSolicitudesDevolucion = response.data ?? [];
      console.log("response.data "+response.data);
      console.table(this.jsonSolicitudesDevolucion);
    });
  }

  imprimirTGRSCreados(lista: any[], datoFiltro: string, tipo: string = '') {
    const filtro = lista.filter(item => JSON.stringify(item).toLowerCase().indexOf(datoFiltro.toLowerCase()) !== -1);
    if (filtro.length == 0) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      ).then((_) => { /** NO hace nada */ }).catch((_) => {/** Tampoco hace nada */ });
      return;
    }

    this.generadorPdfSrv.pdf<unknown>(
      'tgrs',
      filtro.map(item => ({
        "NÚMERO TGR": item.numeroTgr,
        "INSTITUCIÓN": item.nombreInstitucion, //nombreInstitucion
        "NOMBRE O RAZÓN SOCIAL": item.nombreCiudadano,
        "TIPO DE DOCUMENTO": item.nombreTipoDocumento,
        "NÚMERO DE IDENTIFICACIÓN": item.numeroDocumento,
        "SERVICIO": item.servicios,
        "ORIGEN DE CREACIÓN": item.origenCreacion,
        "FECHA": item.fechaGeneracionTgr,
        "VALOR TGR": formatCurrency(item.totalPagarTgr, 'es-HN', 'L', 'symbol', '1.0-2'),
        "ESTADO DEL TGR": item.estadoTgr
      })),
      `TGRS ${tipo}`
    );
  }

  

  descargarLista(lista: any[], datoFiltro: string, nombreArchivo: string) {
    const filtro = lista.filter(item => JSON.stringify(item).toLowerCase().indexOf(datoFiltro.toLowerCase()) !== -1)
    if (filtro.length == 0) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      )
      return
    }


    const listConcamposAMostrar = filtro.map(item => ({
      "NÚMERO TGR": item.numeroTgr,
      "INSTITUCIÓN": item.nombreInstitucion, //nombreInstitucion
      "NOMBRE O RAZÓN SOCIAL": item.nombreCiudadano,
      "TIPO DE DOCUMENTO": item.nombreTipoDocumento,
      "NÚMERO DE IDENTIFICACIÓN": item.numeroDocumento,
      "SERVICIO": item.servicios,
      "ORIGEN DE CREACIÓN": item.origenCreacion,
      "FECHA": item.fechaGeneracionTgr,
      "VALOR TGR": formatCurrency(item.totalPagarTgr, 'es-HN', 'L', 'symbol', '1.0-2'),
      "ESTADO DEL TGR": item.estadoTgr
    }));

    const csv = Papa.unparse(listConcamposAMostrar);
    const csvData = "\ufeff" + csv; // Agregar BOM al inicio del archivo

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    const fechaActual = moment();
    const stringFecha = fechaActual.format('DD-MM-YYYY-HHmmss');
    const formarNombre = `${nombreArchivo} ${stringFecha}.csv`

    saveAs(blob, formarNombre);
  }
  
  obtenerTotal(array: any[], campo: string) {
    return obtenerTotalesDeArray(array, campo);
  }

  abrirModalDetalles(detalle: any) {
    this.detalleEnviarModal = {
      numeroTgr: detalle.numeroTgr,
      nombreRazonSocial: detalle.nombreCiudadano,
      numeroIdentificacion: detalle.numeroDocumento,
      institucion: `${detalle.institucionId} - ${this.obtenerDescripcionInstitucion(detalle.institucionId)}`,
      estado: detalle.estadoTgr,
      servicios: detalle.servicios,
      bitacoraTGR: ''
    }

    this.apiInformes.consultarBitacoraTGR({ numeroTgr: this.detalleEnviarModal.numeroTgr }).subscribe(response => {
      const bitacora = JSON.stringify(response.data)
      this.detalleEnviarModal.bitacoraTGR = (bitacora)
    })


    this.apiPdfComprobante.getPdf({ numeroTgr: this.detalleEnviarModal.numeroTgr }).subscribe((response) => {
      this.pdfTGR = 'data:application/pdf;base64,' + response.data[0];
    });
    this.abrirModal = true;
    const modal = document.getElementById('modalDetalleTGR')!;
    M.Modal.getInstance(modal).open();

    this.actualizarInputsMaterialize();
  }

  obtenerDescripcionInstitucion(institucionId: any): string {
    let nombreInstitucion = '';

    for (let ins of this.arrayInstituciones) {

      if (institucionId == ins.INSTITUCION) {
        nombreInstitucion = ins.DESC_INSTITUCION;
      }

    }

    return nombreInstitucion;
  }
  
  actualizarInputsMaterialize() {
    $(document).ready(function () {
      M.updateTextFields();
    });
  }
  
  regresar(numeroVista: string = 'home') {
    this.screen = numeroVista;
    this.pagina = 1;
    this.searchUno = '';
  }

}
