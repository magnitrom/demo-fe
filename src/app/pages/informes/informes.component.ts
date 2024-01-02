import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiInformesService } from 'src/app/services/api-informes.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe, formatCurrency } from '@angular/common';
import { mostrarInfo, obtenerTotalesDeArray, parseServicioAString } from 'src/app/utils/utils';
import { ConsolidadoInstitucion } from 'src/app/models/consolidadoInstitucion.interface';
import { Institucion } from 'src/app/models/Institucion.interface';
import { CanalDePago } from 'src/app/models/canalDePago.interface';
import { DetalleFondoPropio } from '../detalleInformes/interfaces/DetalleFondoPropio.interface';
import { OrigenPago } from 'src/app/models/TiposConsolidadoOriPagoBan/OrigenPago.interface';
import { CanalPago } from 'src/app/models/TiposConsolidadoOriPagoBan/CanalPago.interface';
import { Cajainstitucional } from 'src/app/models/TiposCajaInstitucional/Cajainstitucional.interface';
import { CajaInstitucionalConString } from 'src/app/models/TiposCajaInstitucional/CajaInstitucionalConString.interface';
import { Caja } from 'src/app/models/TiposCajaInstitucional/Caja.interface';
import { ReversionTgr } from 'src/app/models/ReversionTGR/ReversionTgr.interface';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


import * as M from 'materialize-css';
import * as moment from 'moment';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { ApiPdfComprobanteService } from 'src/app/services/api-pdf-comprobante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrigenPagoPipe } from 'src/app/pipes/origen-pago.pipe';
import { CanalPagoPipe } from 'src/app/pipes/canal-pago.pipe';
import { Subject } from 'rxjs';
import { GeneradorPdfService } from 'src/app/services/generador-pdf.service';
import { MttoParametrosService } from 'src/app/services/mtto-parametros.service';
import { ApiInteroperabilidadService } from 'src/app/services/api-interoperabilidad.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit, AfterViewInit {

  parametroPagina = ''
  private busquedaSubject = new Subject<string>();
  jsonConsolidadoOrigenCreacionInicial: any[] = [];
  jsonCajaInstitucionalFiltrados: any[] = [];
  jsonConsolidadoOrigenCreacionFiltrados: any[] = [];

  constructor(
    private apiInformes: ApiInformesService,
    private datePipe: DatePipe,
    private apiPdfComprobante: ApiPdfComprobanteService,
    private route: ActivatedRoute,
    private router: Router,
    private canalPagoPipe: CanalPagoPipe,
    private origenPagoPipe: OrigenPagoPipe,
    private readonly generadorPdfSrv: GeneradorPdfService,
    private readonly apiInteroperabilidad: ApiInteroperabilidadService,
    private readonly apiParametros: MttoParametrosService,
    private readonly keycloak: KeycloakService
  ) {
    defineLocale('es', esLocale);
  }

  //OPTIMIZE se usa desde el html para comparar y mostrar los perfiles
  noMostrar(roles: any[]) {
    let userRoles = this.keycloak.getUserRoles();
    if (roles && userRoles) {

      return roles.some((role: any) => userRoles.includes(role));
    }
    else {
      return false;
    }
  }

  ngOnInit(): void {
    this.obtenerInstituciones();
    this.obtenerTipoDocumentos();
    let user: any = sessionStorage.getItem('userProfile');
    user = JSON.parse(user);
    this.nombreUsuario = user.firstName + " " + user.lastName;
    this.auditoriaConsultaUsuario.usuario = user.firstName + " " + user.lastName;
    this.route.params.subscribe(params => {
      this.parametroPagina = params['tipo'];

      if (this.parametroPagina === "sol-reversion") {
        this.screen = '8'
        this.range = [new Date(), new Date()];
      }
      else {
        this.router.navigate(['informes', '']);
      }

      console.warn(this.parametroPagina)
    });
    this.actualizarInputsMaterialize();
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  obtenerInstituciones(): void {
    this.apiParametros.obtenerValorParametro('GESTION').subscribe((res) => {
      this.apiInteroperabilidad.obtenerClasificador('INSTITUCIONES', res.data[0]?.valorParametro).subscribe((res) => {
        this.arrayInstituciones = res.data;
        $(document).ready(function () {
          $('select').formSelect();
        });
      });
    });
  }

  obtenerTipoDocumentos(): void {
    this.apiParametros.obtenerValorParametro('GESTION').subscribe((res) => {
      this.apiInteroperabilidad.obtenerClasificador('TIPO_DOCUMENTOS', res.data[0]?.valorParametro).subscribe((res) => {
        this.arrayTipoDocumento = res.data;
        $(document).ready(function () {
          $('select').formSelect();
        });
      });
    });
  }

  // CAJAS INSTITUCINAL
  cajaSeleccionada = 0
  institucionCajaSeleccionada = 0

  nombreUsuario: string = '';
  pdfTGR = ''

  auditoriaConsultaUsuario = {
    usuario: '',
    fechaActual: moment().format('DD/MM/YYYY')
  }

  detalleFondoPropio: DetalleFondoPropio = {
    numeroTGR: '',
    institucion: '',
    origenCreacion: '',
    total: 0

  }

  detalleEnviarModal = {
    numeroTgr: '',
    nombreRazonSocial: '',
    numeroIdentificacion: '',
    institucion: '',
    estado: '',
    servicios: '',
    bitacoraTGR: '',

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

  // #region reversiones

  imprimirTgrsReversiones(lista: any[], datoFiltro: string, tipo: string = '') {
    const filtro = lista.filter(item => JSON.stringify(item).toLowerCase().indexOf(datoFiltro.toLowerCase()) !== -1)
    if (filtro.length == 0) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      ).then((_) => { /** NO hace nada */ }).catch((_) => {/** Tampoco hace nada */ });
      return;
    }

    this.generadorPdfSrv.pdf(
      'reversion',
      filtro.map(item => ({
        "NÚMERO REVERSIÓN": item.numeroReversion,
        "NOMBRE BANCO": item.nombreBanco,
        "NÚMERO TGR": item.numeroTgr,
        "MONTO": formatCurrency(item.monto, 'es-HN', 'L', 'symbol', '1.0-2'),
        "FECHA PAGO": item.fechaPago,
        "FECHA CREACIÓN": item.fechaCreacion,
        "ESTADO": item.estadoGestion
      })),
      `TGRS ${tipo}`
    );
  }

  descargarListaReversiones(lista: any[], datoFiltro: string, nombreArchivo: string) {

    if (lista.length == 0) {

      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      )

      return
    }

    const filtro = lista.filter(item => JSON.stringify(item).toLowerCase().indexOf(datoFiltro.toLowerCase()) !== -1)

    const listConcamposAMostrar = filtro.map(item => ({
      "NÚMERO REVERSIÓN": item.numeroReversion,
      "NOMBRE BANCO": item.nombreBanco,
      "NÚMERO TGR": item.numeroTgr,
      "MONTO": formatCurrency(item.monto, 'es-HN', 'L', 'symbol', '1.0-2'),
      "FECHA PAGO": item.fechaPago,
      "FECHA CREACIÓN": item.fechaCreacion,
      "ESTADO": item.estadoGestion

    }));

    const csv = Papa.unparse(listConcamposAMostrar);
    const csvData = "\ufeff" + csv; // Agregar BOM al inicio del archivo

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    const fechaActual = moment();
    const stringFecha = fechaActual.format('DD-MM-YYYY-HHmmss');
    const formarNombre = `${nombreArchivo} ${stringFecha}.csv`

    saveAs(blob, formarNombre);
  }


  // #endregion

  cadenaToJSON(cadena: string) {
    if (cadena.length > 0)
      return JSON.parse(cadena)
    return []
  }

  // #region Modal detalles

  verBitacora() {
    const modal = document.getElementById('detalleBitacora')!;
    M.Modal.getInstance(modal).open();
  }

  actualizarInputsMaterialize() {
    $(document).ready(function () {
      M.updateTextFields();
    });
  }


  verReportePDF() {
    const modal = document.getElementById('modalReporteTgrPDF')!;
    M.Modal.getInstance(modal).open();
  }


  // #endregion Modal detalles



  //#region Variables Angular
  screen: string = 'home';

  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-dark-blue' }, { dateInputFormat: 'DD-MM-YYYY' }, { locale: 'es' }, { adaptivePosition: true });
  range: any = '';

  searchUno: string = '';
  pagina: number = 1;



  formularioInformes: any = {
    fechaInicio: '',
    fechaFin: ''
  }


  arrayInstituciones: any[] = [];
  arrayTipoDocumento: any[] = [];
  jsonTGRCreados: any[] = [];
  jsonTGRPagados: any[] = [];
  jsonTGREliminados: any[] = [];
  jsonConsolidadoInstitucion: ConsolidadoInstitucion[] = [];
  jsonConsolidadoOrigenCreacion: any[] = [];



  catalogos: any = {
    instituciones: [],
    tiposDeDocumentos: []
  }

  listInstituciones: Institucion[] = []
  listCanalDePagos: CanalDePago[] = []
  selectedInstitucion: Institucion | undefined = {
    id: -1,
    nombre: 'Ninguna'
  };
  //#endregion


  /**  
     *Esta función toma una cadena y devuelve una cadena.
     * @param {ClasificadoresInteroperabilidadService} apiClasificadores -
     * ClasificadoresInteroperabilidadService
     * @param {ApiInformesService} apiInformes - ApiInformesService
     * @param {DatePipe} datePipe - DatePipe
     */


  ngAfterViewInit(): void {
    console.count('afterviewinit')
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals, { dismissible: false });
  }

  //#region Main 
  obtenerTotal(array: any[], campo: string) {
    return obtenerTotalesDeArray(array, campo);
  }


  verDetalle(idInforme: any) {
    if (+idInforme === 3) {
      mostrarInfo({
        title: 'Mantenimiento',
        text: 'Solicitud de fondos propios se encuentra en mantenimiento',
        icon: 'error'
      }).then((_) => { /* no hace nada */ });
      return;
    }
    this.screen = idInforme;
    this.range = [new Date(), new Date()];
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  regresar(numeroVista: string = 'home') {
    this.screen = numeroVista;
    this.pagina = 1;
    this.searchUno = '';
  }

  filtroPersonalizado(arreglo: any[], tipo: string, regexPattern: RegExp): any[] {
    switch (tipo) {
      case 'ins':
        if (this.selectedCaja) {
          if (+this.selectedCaja === -1 || this.selectedCaja === 'Ninguno') return arreglo.filter((ci) => regexPattern.test(ci.nombreCaja) || regexPattern.test(ci.numeroTgr) || regexPattern.test(ci.nombreCiudadano) || regexPattern.test(ci.numeroDocumento));
          else return arreglo.filter((ci) => regexPattern.test(ci.nombreCaja) || regexPattern.test(ci.numeroTgr) || regexPattern.test(ci.nombreCiudadano) || regexPattern.test(ci.numeroDocumento)).filter((ci) => ci.cajaId === this.selectedCaja);
        }
        return arreglo.filter((ci) => regexPattern.test(ci.nombreCaja) || regexPattern.test(ci.numeroTgr) || regexPattern.test(ci.nombreCiudadano) || regexPattern.test(ci.numeroDocumento));
      case 'banco':
        return this.transformarDataBanco(arreglo).filter((banco) => regexPattern.test(banco.numeroTgr) || regexPattern.test(banco.numeroDocumento) || regexPattern.test(banco.nombreCiudadano));
      default:
        return [];
    }
  }

  asignarValor(nuevoValor: any[], tipo: string): void {
    if (tipo === 'ins') {
      this.jsonCajaInstitucional = nuevoValor;
      this.jsonCajaInstitucionalFiltrados = this.jsonCajaInstitucional;
    } else {
      this.jsonConsolidadoOrigenCreacion = nuevoValor;
      this.jsonConsolidadoOrigenCreacionFiltrados = this.jsonConsolidadoOrigenCreacion;
    }
  }

  filtrarTgrs(event: Event, tipo: string, arreglo: any[]): void {
    const newValue = (event.target as HTMLInputElement).value;
    const escapedValue = newValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexPattern = new RegExp('.*' + escapedValue + '.*', 'i');
    this.busquedaSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((_) => {
          return this.filtroPersonalizado(arreglo, tipo, regexPattern)
        })
      )
      .subscribe((res) => {
        this.asignarValor(res, tipo);
      })
    this.busquedaSubject.next(newValue);
  }

  cambioDeFechaTgrCreados(dates: any) {
    let fechaInicio = this.datePipe.transform(dates[0], 'yyyy-MM-dd');
    let fechaFin = this.datePipe.transform(dates[1], 'yyyy-MM-dd');
    this.obtenerRegistrosTgrsCreados(fechaInicio, fechaFin);
  }


  cambioDeFechaTgrPagados(dates: any) {
    let fechaInicio = this.datePipe.transform(dates[0], 'yyyy-MM-dd');
    let fechaFin = this.datePipe.transform(dates[1], 'yyyy-MM-dd');
    this.obtenerRegistrosTgrsPagados(fechaInicio, fechaFin);
  }

  cambioDeFechaTgrSolicitados(dates: any) {
    let fechaInicio = this.datePipe.transform(dates[0], 'yyyy-MM-dd');
    let fechaFin = this.datePipe.transform(dates[1], 'yyyy-MM-dd');
    this.obtenerRegistrosTgrsSolicitados(fechaInicio, fechaFin);
  }

  cambioDeFechaTgrEliminados(dates: any) {
    let fechaInicio = this.datePipe.transform(dates[0], 'yyyy-MM-dd');
    let fechaFin = this.datePipe.transform(dates[1], 'yyyy-MM-dd');
    this.obtenerRegistrosTgrsEliminados(fechaInicio, fechaFin);
  }

  cambioDeFechaTgrFondosSolicitados(dates: any) {
    let fechaInicio = this.datePipe.transform(dates[0], 'yyyy-MM-dd');
    let fechaFin = this.datePipe.transform(dates[1], 'yyyy-MM-dd');
    this.obtenerRegistrosTgrFondosSolicitados(fechaInicio, fechaFin);
  }

  cambioDeFechaConsolidadoInst(dates: any) {
    let fechaInicio = this.datePipe.transform(dates[0], 'yyyy-MM-dd');
    let fechaFin = this.datePipe.transform(dates[1], 'yyyy-MM-dd');
    this.obtenerRegistrosConsolidadoInstitucion(fechaInicio, fechaFin);
  }

  cambioDeFechaConsolidadoOP(dates: any) {
    let fechaInicio = this.datePipe.transform(dates[0], 'yyyy-MM-dd');
    let fechaFin = this.datePipe.transform(dates[1], 'yyyy-MM-dd');
    this.obtenerRegistrosConsolidadoOrigenCreacion(fechaInicio, fechaFin);

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

  obtenerDescripcionDocumento(documentoId: any): string {
    let nombreDocumento = '';
    for (let doc of this.arrayTipoDocumento) {

      if (documentoId == doc.ID) {
        nombreDocumento = doc.NOMBRE;
      }

    }

    return nombreDocumento;
  }

  obtenerRegistrosTgrsCreados(fechaInicio: any, fechaFin: any) {
    let bodyTgrCreados = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin,
      'estado': '1'
    }

    this.apiInformes.informesTgrs(bodyTgrCreados).subscribe((response) => {
      response.data.forEach((item: { institucionId: any; nombreInstitucion: any; nombreTipoDocumento: any; tipoDocumento: any; }) => {
        item.nombreInstitucion = item.institucionId + ' - ' + this.obtenerNombreInstitucion(item.institucionId)
        item.nombreTipoDocumento = item.tipoDocumento + ' - ' + this.obtenerNombreDocumento(item.tipoDocumento);
      });
      this.jsonTGRCreados = response.data;
    });

  }

  abrirModal = false;

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

  cerrarModal() {
    this.abrirModal = false;
  }

  imprimirTGRSBanco(lista: any[], datoFiltro: string, tipo: string = ''): void {
    const filtro = lista.filter(item => JSON.stringify(item).toLowerCase().indexOf(datoFiltro.toLowerCase()) !== -1)
    if (filtro.length == 0) {
      this.mostrarModalInfo('descargar')
        .then((_) => { /* no hace nada */ })
        .catch((_) => { /* no hace nada */ });
      return;
    }

    this.generadorPdfSrv.pdf<any>(
      tipo,
      filtro.map(item => ({
        "NÚMERO TGR": item.numeroTgr,
        "INSTITUCIÓN": item.institucionId + ' - ' + this.obtenerDescripcionInstitucion(item.institucionId),
        "RAZÓN SOCIAL": item.nombreCiudadano,
        "TIPO DE DOCUMENTO": `${item.tipoDocumentoId} - ${this.obtenerDescripcionDocumento(item.tipoDocumentoId)}`,
        "NÚMERO IDENTIFICACIÓN": item.numeroDocumento,
        "SERVICIOS": parseServicioAString(item.servicios),
        "ORIGEN PAGO": item.nombreBanco,
        "CANAL PAGO": item.canalPago,
        "ORIGEN CREACIÓN": item.origenCreacion,
        "FECHA": item.fechaCreacion,
        "VALOR TGR": formatCurrency(+item.monto || 0, 'es-HN', 'L', 'symbol', '1.0-2'),
        "ESTADO": item.estadoTgr
      })),
      'TGRS BANCO'
    );
  }

  descargarListaBanco(lista: any[], datoFiltro: string, nombreArchivo: string): void {
    if (lista.length == 0) {
      this.mostrarModalInfo('descargar')
        .then((_) => { /* no hace nada */ })
        .catch((_) => { /* no hace nada */ });
      return;
    }

    const filtro = lista.filter(item => JSON.stringify(item).toLowerCase().indexOf(datoFiltro.toLowerCase()) !== -1)

    const listConcamposAMostrar = filtro.map(item => ({
      "NÚMERO TGR": item.numeroTgr,
      "INSTITUCIÓN": item.institucionId + ' - ' + this.obtenerDescripcionInstitucion(item.institucionId),
      "RAZÓN SOCIAL": item.nombreCiudadano,
      "TIPO DE DOCUMENTO": `${item.tipoDocumentoId} - ${this.obtenerDescripcionDocumento(item.tipoDocumentoId)}`,
      "NÚMERO IDENTIFICACIÓN": item.numeroDocumento,
      "SERVICIOS": parseServicioAString(item.servicios),
      "ORIGEN PAGO": item.nombreBanco || item.origenPago,
      "CANAL PAGO": item.canalPago,
      "ORIGEN CREACIÓN": item.origenCreacion,
      "FECHA": item.fechaGeneracionTgr,
      "VALOR TGR": formatCurrency(item.monto || 0, 'es-HN', 'L', 'symbol', '1.0-2'),
      "ESTADO": item.estadoTgr
    }));

    const csv = Papa.unparse(listConcamposAMostrar);
    const csvData = "\ufeff" + csv; // Agregar BOM al inicio del archivo

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    const fechaActual = moment();
    const stringFecha = fechaActual.format('DD-MM-YYYY-HHmmss');
    const formarNombre = `${nombreArchivo} ${stringFecha}.csv`

    saveAs(blob, formarNombre);
  }

  mostrarModalInfo(accion: string): Promise<SweetAlertResult<any>> {
    return mostrarInfo({
      title: 'Informacíón',
      text: `No hay nada que ${accion}`,
      icon: 'info'
    });
  }

  transformarDataBanco(data: any[]): any[] {
    const data1 = this.canalPagoPipe.transform(data, this.selectedCanalPago);
    return this.origenPagoPipe.transform(data1, this.selectedOrigenPago);
  }

  parsearServicios(servicios: string): string {
    return parseServicioAString(servicios);
  }

  obtenerNombreInstitucion(id: string | number): string {
    return this.arrayInstituciones.find((inst) => +inst.INSTITUCION === +id)?.DESC_INSTITUCION
  }

  obtenerNombreDocumento(id: string): string {
    return this.arrayTipoDocumento.find((doc) => +doc.ID === +id)?.NOMBRE;
  }

  obtenerRegistrosTgrsPagados(fechaInicio: any, fechaFin: any) {
    let bodyTgrCreados = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin,
      'estado': '2'
    }

    this.apiInformes.informesTgrs(bodyTgrCreados).subscribe((response) => {

      response.data.forEach((item: { institucionId: any; nombreInstitucion: any; nombreTipoDocumento: any; tipoDocumento: any; }) => {
        item.nombreInstitucion = item.institucionId + ' - ' + this.obtenerNombreInstitucion(item.institucionId)
        item.nombreTipoDocumento = item.tipoDocumento + ' - ' + this.obtenerNombreDocumento(item.tipoDocumento);
      });

      this.jsonTGRPagados = response.data;

      console.table(this.jsonTGRPagados)
    });
  }

  obtenerRegistrosTgrsSolicitados(fechaInicio: any, fechaFin: any) {
    let bodyTgrCreados = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin,
      'estado': '4'
    }

    this.apiInformes.informesTgrs(bodyTgrCreados).subscribe((response) => {

      response.data.forEach((item: { institucionId: any; nombreInstitucion: any; nombreTipoDocumento: any; tipoDocumento: any; }) => {
        item.nombreInstitucion = item.institucionId + ' - ' + this.obtenerNombreInstitucion(item.institucionId)
        item.nombreTipoDocumento = item.tipoDocumento + ' - ' + this.obtenerNombreDocumento(item.tipoDocumento);
      });

      this.jsonTGRPagados = response.data;
    });
  }

  obtenerRegistrosTgrsEliminados(fechaInicio: any, fechaFin: any) {
    let bodyTgrCreados = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin,
      'estado': '5'
    }

    this.apiInformes.informesTgrs(bodyTgrCreados).subscribe((response) => {

      response.data.forEach((item: { institucionId: any; nombreInstitucion: any; nombreTipoDocumento: any; tipoDocumento: any; }) => {
        item.nombreInstitucion = item.institucionId + ' - ' + this.obtenerNombreInstitucion(item.institucionId)
        item.nombreTipoDocumento = item.tipoDocumento + ' - ' + this.obtenerNombreDocumento(item.tipoDocumento);
      });

      this.jsonTGREliminados = response.data;
    });
  }

  obtenerRegistrosTgrFondosSolicitados(fechaInicio: any, fechaFin: any) {
    let bodyTgrCreados = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin,
      'estado': '7'
    }

    this.apiInformes.informesTgrs(bodyTgrCreados).subscribe((response) => {
      this.jsonTGRPagados = response.data;
    });
  }





  //#endregion

  VerDetalleFP(detalle: DetalleFondoPropio) {

    this.detalleFondoPropio = detalle

    this.screen = 'verDetalleFondoPropio'
  }

  //#region Solicitudes de Fondos Propios




  obtenerRegistrosConsolidadoInstitucion(fechaInicio: any, fechaFin: any) {
    let bodyTgrCreados = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin
    }

    this.apiInformes.informesConsolidadoInstitucion(bodyTgrCreados).subscribe((response) => {
      this.jsonConsolidadoInstitucion = response.data;

      console.table(response.data)

      this.listInstituciones = []
      response.data.forEach((element: ConsolidadoInstitucion) => {
        let institucion: Institucion = {
          id: element.institucionId,
          nombre: this.obtenerDescripcionInstitucion(element.institucionId)
        }

        const existe = this.listInstituciones.find(item => item.id === institucion.id);

        if (!existe) this.listInstituciones.push(institucion);
      });
    });
  }


  //#endregion

  //#region Consolidado origgen de pago - banco

  listOrigenPago: OrigenPago[] = []
  listCanalPago: CanalPago[] = []

  selectedOrigenPago: string = '';
  selectedCanalPago: string = '';

  onSelectOrigenPago(event: any) {

    const selectedId = String(event.target.value);

    this.selectedOrigenPago = 'Ninguno'
    if (selectedId !== 'Ninguno') {
      let nombre: any = this.listOrigenPago.find(item => item.origenPago === selectedId)?.origenPago;
      this.selectedOrigenPago = nombre;
    }
  }

  onSelectCanalPago(event: any) {
    const selectedId = String(event.target.value);

    this.selectedCanalPago = 'Ninguno'
    if (selectedId !== 'Ninguno') {
      let nombre: any = this.listCanalPago.find(item => item.canalPago === selectedId)?.canalPago;
      this.selectedCanalPago = nombre;
    }


  }


  /**Consolidado Origen de Pago TGR (Banco) */
  obtenerRegistrosConsolidadoOrigenCreacion(fechaInicio: any, fechaFin: any) {
    let bodyTgrCreados = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin
    }

    this.apiInformes.informesConsolidadoOrigenCreacion(bodyTgrCreados).subscribe((response) => {
      this.listOrigenPago = []
      this.listCanalPago = []
      let tempList: any[] = [];
      response.data.forEach((element: any) => {

        const existeOrigenPago = this.listOrigenPago.find(item => item.origenPago === element.nombreBanco);
        const existeCanalPago = this.listCanalPago.find(item => item.canalPago === element.canalPago);

        if (!existeOrigenPago) this.listOrigenPago.push({ origenPago: element.nombreBanco });
        if (!existeCanalPago) this.listCanalPago.push({ canalPago: element.canalPago });

        tempList.push(element);

        $(document).ready(function () {
          $('select').formSelect();
        });
      });

      this.jsonConsolidadoOrigenCreacion = tempList;
      this.jsonConsolidadoOrigenCreacionInicial = this.jsonConsolidadoOrigenCreacion;

      $(document).ready(function () {
        $('select').formSelect();
      });
    });
  }
  //#endregion


  //#region Caja Institucional

  jsonCajaInstitucional: Cajainstitucional[] = [];
  jsonCajaInsitucionalConString: CajaInstitucionalConString[] = [];
  cajaSeleccionadaString = ''
  listaCajas: Caja[] = [];
  selectedCaja: string | undefined

  descargarListaCajaInstitucional(lista: any[], datoFiltro: string, nombreArchivo: string) {

    if (lista.length == 0) {

      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      )
      return
    }

    const filtro = lista.filter(item => JSON.stringify(item).toLowerCase().indexOf(datoFiltro.toLowerCase()) !== -1)

    const listConcamposAMostrar = filtro.map(item => ({
      "NÚMERO TGR": item.numeroTgr,
      "INSTITUCIÓN": this.obtenerDescripcionInstitucion(item.institucionId),
      "CAJA": this.getNombreCaja(this.cajaSeleccionada),
      "TIPO DE DOCUMENTO": `${item.tipoDocumentoId} - ${this.obtenerDescripcionDocumento(item.tipoDocumentoId)}`,
      "NÚMERO IDENTIFICACIÓN": item.numeroDocumento,
      "RAZÓN SOCIAL": item.nombreCiudadano,
      "SERVICIOS": this.serviciosObtenerPrimerCampo(item.servicios),
      "VALOR TGR": formatCurrency(item.monto, 'es-HN', 'L', 'symbol', '1.0-2'),
      "ORIGEN CREACIÓN": item.origenCreacion,
      "FECHA": item.fechaCreacion,
      "ESTADO": item.estadoTgr
    }));

    const csv = Papa.unparse(listConcamposAMostrar);
    const csvData = "\ufeff" + csv; // Agregar BOM al inicio del archivo

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    const fechaActual = moment();
    const stringFecha = fechaActual.format('DD-MM-YYYY-HHmmss');
    const formarNombre = `${nombreArchivo} ${stringFecha}.csv`

    saveAs(blob, formarNombre);
  }


  imprimirTGRSCajaInstitucional(lista: any[], datoFiltro: string, tipo: string) {
    const listaFiltro = lista.filter(item => JSON.stringify(item).toLowerCase().indexOf(datoFiltro.toLowerCase()) !== -1)
    if (listaFiltro.length == 0) {
      Swal.fire(
        'Información',
        'No hay nada que imprimir',
        'info'
      )
      return
    }

    this.generadorPdfSrv.pdf(
      tipo,
      listaFiltro.map(item => ({
        "NÚMERO TGR": item.numeroTgr,
        "INSTITUCIÓN": this.obtenerDescripcionInstitucion(item.institucionId),
        "CAJA": this.getNombreCaja(this.cajaSeleccionada),
        "TIPO DE DOCUMENTO": `${item.tipoDocumentoId} - ${this.obtenerDescripcionDocumento(item.tipoDocumentoId)}`,
        "NÚMERO IDENTIFICACIÓN": item.numeroDocumento,
        "RAZÓN SOCIAL": item.nombreCiudadano,
        "SERVICIOS": this.serviciosObtenerPrimerCampo(item.servicios),
        "VALOR TGR": formatCurrency(item.monto, 'es-HN', 'L', 'symbol', '1.0-2'),
        "ORIGEN CREACIÓN": item.origenCreacion,
        "FECHA": item.fechaCreacion,
        "ESTADO": item.estadoTgr
      })),
      `TGRS ${tipo}`
    );
  }

  onSelectCaja(event: any) {
    this.jsonCajaInstitucional = []
    $(document).ready(function () {
      $('select').formSelect();
    });

  }

  onSelectInstitucion(event: any) {
    const selectedId = Number(event.target.value);

    this.jsonCajaInstitucional = []
    this.listaCajas = []
    this.cajaSeleccionada = 0

    this.apiInformes.consultaCajasPorInstitucion({ "institucionId": String(selectedId) }).subscribe((response) => {

      const data = response.data
      const nuevaLista = data.map((reg: any) => ({
        "id": reg.cajaId,
        "nombreCaja": reg.nombreCaja
      }))

      this.listaCajas = nuevaLista;

      $(document).ready(function () {
        $('select').formSelect();
      });

    });




  }

  getNombreCaja(id: any): string {
    const cajaEncontrada = this.listaCajas.find((caja) => Number(caja.id) === Number(id));
    return cajaEncontrada ? cajaEncontrada.nombreCaja : '';
  }

  serviciosObtenerPrimerCampo(cadena: string) {
    const str = cadena
    const sections = str.split(", ");

    const names = sections.map(section => {
      const parts = section.split(":");
      return parts[0];
    });

    return names.join(", ");
  }

  consultarCajaInstitucional() {

    let [fecha1, fecha2] = this.range
    const idInstitucion = this.institucionCajaSeleccionada
    const idCaja = this.cajaSeleccionada

    fecha1 = moment(fecha1).format('YYYY-MM-DD')
    fecha2 = moment(fecha2).format('YYYY-MM-DD')


    if (moment(fecha1, 'YYYY-MM-DD').isValid() && idInstitucion != 0 && idCaja != 0) {
      const payload = {
        fechaInicio: String(fecha1),
        fechaFin: String(fecha2),
        institucionId: String(idInstitucion),
        cajaId: String(idCaja)

      }


      this.apiInformes.consultaTgrsPorCaja(payload).subscribe((response) => {
        this.jsonCajaInstitucional = response.data
      });
    }
    else {
      Swal.fire(
        'Información',
        'Por favor verifica los datos de consulta',
        'info'
      )
    }




  }

  obtenerRegistrosCajaInsittucional(fechaInicio: any, fechaFin: any) {
    let bodyTgrCreados = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin
    }

    this.apiInformes.informesCajaInstitucional(bodyTgrCreados).subscribe((response) => {
      this.jsonCajaInstitucional = response.data;


      this.listaCajas = []
      this.listInstituciones = []

      response.data.forEach((item: Cajainstitucional) => {

        const exiteCaja = this.listaCajas.find(ca => ca.nombreCaja === item.nombreCaja);
        const exiteInstitucion = this.listInstituciones.find(ins => ins.id === item.institucionId);


        //llenado lista cajas
        const idCaja = (item.nombreCaja).replace(/\s/g, "")
        if (!exiteCaja) this.listaCajas.push({ id: idCaja, nombreCaja: item.nombreCaja });
        if (!exiteInstitucion) this.listInstituciones.push({ id: item.institucionId, nombre: this.obtenerDescripcionInstitucion(item.institucionId) });

      });
      $(document).ready(function () {
        $('select').formSelect();
      });


    });
  }

  //#endregion

  //#region Solcitudes reversion

  jsonSolicitudesReversiones: ReversionTgr[] = []
  reversionDetalle!: ReversionTgr;
  abrirReversion = false;

  tipoSolicitudRev = {
    APROBAR: 'Aprobar',
    RECHAZAR: 'Rechazar'
  }

  datosModal = {
    tipo: '',
    nTgr: '',
    nRev: '',
    fechaCreacion: '',
    fechaPago: '',
    observacionesAprobador: ''

  }

  asignarDetalleReversion(reversion: ReversionTgr): void {
    this.reversionDetalle = reversion;
    this.abrirReversion = true;
  }

  dates: any[] = [];

  cambioDeFechaSolReversion(dates: any) {
    let fechaInicio = this.datePipe.transform(dates[0], 'yyyy-MM-dd');
    let fechaFin = this.datePipe.transform(dates[1], 'yyyy-MM-dd');
    this.dates = [fechaInicio, fechaFin];
    this.obtenerRegistrosSolReversion(fechaInicio, fechaFin);
  }

  obtenerRegistrosSolReversion(fechaInicio: any, fechaFin: any) {
    let bodyTgrSoli = {
      'fechaInicio': fechaInicio,
      'fechaFin': fechaFin
    }

    this.apiInformes.informesReversionTGR(bodyTgrSoli).subscribe((response) => {
      this.jsonSolicitudesReversiones = response.data;
      // Utiliza la función sort para ordenar el array
      this.jsonSolicitudesReversiones  = this.jsonSolicitudesReversiones.sort((a, b) => {
        // Comparar el campo estadoGestion
        if (a.estadoGestion === 'INGRESADA' && b.estadoGestion !== 'INGRESADA') {
          return -1; // a va antes que b
        } else if (a.estadoGestion !== 'INGRESADA' && b.estadoGestion === 'INGRESADA') {
          return 1; // b va antes que a
        } else {
          return 0; // No se cambia el orden entre a y b
        }
      });

      this.actualizarInputsMaterialize();
    });
  }

  abrilModalAceptarRechazar(reversion: ReversionTgr, tipo: string): void {
    const modalElement = document.getElementById('modalAprobarRechazar')
    const instance = M.Modal.getInstance(modalElement!);
    instance.open();
    this.actualizarInputsMaterialize();
    this.datosModal = {
      tipo: tipo,
      nTgr: reversion.numeroTgr,
      nRev: reversion.numeroReversion,
      fechaCreacion: reversion.fechaCreacion,
      fechaPago: reversion.fechaPago,
      observacionesAprobador: ''
    }

  }


  validarFechaParaAprobar(reversion: ReversionTgr, tipo: string): void {

    const fecha1 = new Date();
    const fecha2 = moment(reversion.fechaPago, 'DD/MM/YYYY', true).toDate();
    const esLaMismaFecha = moment(fecha1).isSame(fecha2, 'day');

    if (!esLaMismaFecha) {
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'No se puede aprobar una reversión en fechas posteriores a la del pago',
        confirmButtonText: 'Aceptar'
      });
      return
    }

    this.abrilModalAceptarRechazar(reversion, tipo)

  }

  rechzarSoliReVersion(payloadRecApro: any): void {
    this.apiInformes.informesRechazarRevision(payloadRecApro).subscribe((response) => {
      const state = String(response.state)


      if (state === "success") {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se rechazó la solicitud correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.obtenerRegistrosSolReversion(this.datePipe.transform(this.dates[0], 'yyyy-MM-dd'), this.datePipe.transform(this.dates[1], 'yyyy-MM-dd'));
        return
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha podido completar la solicitud',
        confirmButtonText: 'Aceptar'
      });
    });

  }

  aprobarSoliReVersion(payloadRecApro: any): void {
    this.apiInformes.informesAprobarRevision(payloadRecApro).subscribe((response) => {
      const state = String(response.state)
      if (state === "success") {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se aprobó la solicitud correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.obtenerRegistrosSolReversion(this.datePipe.transform(this.dates[0], 'yyyy-MM-dd'), this.datePipe.transform(this.dates[1], 'yyyy-MM-dd'));
        return;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha podido completar la solicitud',
        confirmButtonText: 'Aceptar'
      });
    });

  }

  rechazarAprobarReversion(tipo: string) {
    const nombreUsuario = JSON.parse(sessionStorage.getItem('userProfile')!).username

    let payloadRecApro = {
      "numeroTgr": this.datosModal.nTgr,
      "numeroReversion": this.datosModal.nRev,
      "observaciones": this.datosModal.observacionesAprobador,
      "usuario": nombreUsuario
    }

    if (this.datosModal.observacionesAprobador.length < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Información',
        text: 'Por favor ingrese su observación',
        confirmButtonText: 'Aceptar'
      });
      return
    }


    if (tipo === this.tipoSolicitudRev.RECHAZAR) {
      this.rechzarSoliReVersion(payloadRecApro)
    }
    else if (tipo === this.tipoSolicitudRev.APROBAR) {
      this.aprobarSoliReVersion(payloadRecApro)
    }
  }


  //#endregion


}


