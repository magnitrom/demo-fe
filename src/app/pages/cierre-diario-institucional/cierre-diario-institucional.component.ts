import { formatCurrency } from '@angular/common';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import moment from 'moment';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2';
import { GeneradorPdfService } from 'src/app/services/generador-pdf.service';
import { ApiCierreDiarioService } from 'src/app/services/api-cierre-diario.service';
import { Respuesta } from 'src/app/models/respuesta.model';
import { CierreDiarioCaja } from 'src/app/models/cierre-diario-caja.model';
import { MttoParametrosService } from 'src/app/services/mtto-parametros.service';
import { ApiInteroperabilidadService } from 'src/app/services/api-interoperabilidad.service';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-cierre-diario-institucional',
  templateUrl: './cierre-diario-institucional.component.html',
  styleUrls: ['./cierre-diario-institucional.component.scss']
})
export class CierreDiarioInstitucionalComponent implements OnInit {
  @Output() nuevaScreen = new EventEmitter<string>();
  @Output() nuevoSearchUno = new EventEmitter<string>();
  @Output() nuevoEstadoModalBitacora = new EventEmitter<[boolean, string]>();
  @Input() calcularTotalFuncion!: (array: any[], campo: string) => number;
  @Input() searchUno: string = '';
  @Input() fecha!: string;

  pagina = 1;
  cierresInstitucionales: CierreDiarioCaja[] = [];
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-dark-blue' }, { dateInputFormat: 'DD-MM-YYYY' }, { locale: 'es' }, { adaptivePosition: true });
  range: Date[] = [new Date(), new Date()];
  usuario = '';
  bancos: any[] = [];
  institucionSeleccionada = -1;
  screen = 'home';
  cierreInstitucional!: CierreDiarioCaja;
  instituciones: any[] = [];

  constructor(
    private readonly generadorPdfSrv: GeneradorPdfService,
    private readonly cierreDiarioSrv: ApiCierreDiarioService,
    private readonly apiInteroperabilidad: ApiInteroperabilidadService,
    private readonly apiParametros: MttoParametrosService,
    private readonly keycloak: KeycloakService
  ) {
    defineLocale('es', esLocale);
   }

  async ngOnInit() {
    window.scroll(0, 0);
    this.obtenerInstituciones();
    const logged = true
    // const logged = await this.keycloak.isLoggedIn();
    if (logged) this.usuario = 'bnunez'
    // if (logged) this.usuario = (await this.keycloak.loadUserProfile()).username ?? '';
    this.actualizarInputsMaterialize();
  }

  obtenerInstituciones(): void {
    this.apiParametros.obtenerValorParametro('GESTION').subscribe((res) => {
      this.apiInteroperabilidad.obtenerClasificador('INSTITUCIONES', res.data[0]?.valorParametro).subscribe((res) => {
        this.instituciones = res.data;
      });
    });
  }

  obtenerCierresDiariosCajas(fechaInicio = moment(this.range[0]).format('YYYY-MM-DD'), fechaFin = moment(this.range[1]).format('YYYY-MM-DD')): void {
    this.cierreDiarioSrv.obtenerArchivosCierresCajas({ fechaInicio, fechaFin }).subscribe((response: Respuesta<CierreDiarioCaja[]>) => {
      this.cierresInstitucionales = response.data ?? [];
    });
  }

  ngAfterViewInit(): void {
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals, { dismissible: false });
  }

  regresar(): void {
    this.nuevaScreen.emit('home');
    this.nuevoSearchUno.emit('');
    this.cerrarBitacora();
    this.actualizarInputsMaterialize();
  }

  cambioDeFecha(dates: (Date | undefined)[] | undefined) {
    this.obtenerCierresDiariosCajas(moment(dates?.[0]).format('YYYY-MM-DD'), moment(dates?.[1]).format('YYYY-MM-DD'));
  }
  
  onSelectCaja(event: Event): void {
    this.institucionSeleccionada = +(event.target as HTMLSelectElement).value;
    this.pagina = 1;
  }

  imprimir(lista: CierreDiarioCaja[], datoFiltro: string, tipo: string = ''): void {
    const filtro = this.obtenerListaFiltrada(lista, datoFiltro).map((elemento: CierreDiarioCaja) => ({
      ...elemento,
      institucionId: this.obtenerInstitucion(+elemento.institucionId) ?? ''
    }));
    if (!filtro.length) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      ).then((_) => { /** NO hace nada */ }).catch((_) => {/** Tampoco hace nada */});
      return;
    }

    this.generadorPdfSrv.pdf<CierreDiarioCaja>(tipo, filtro, 'Cierre Diario Institucional');
  }

  descargarLista(lista: CierreDiarioCaja[], datoFiltro: string, nombreArchivo: string) {
    const filtro = this.obtenerListaFiltrada(lista, datoFiltro);
    if (filtro.length == 0) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      )
      return
    }

    const listConcamposAMostrar = filtro.map(item => ({
      'CÓDIGO ARCHIVO': item.nombreArchivo,
      'CÓDIGO CAJA': item.codigoCaja,
      'NOMBRE CAJA': item.nombreCaja,
      'CANTIDAD TGR': item.cantidadTgrs,
      'RECAUDACIÓN': formatCurrency(+item.recaudacion, 'es-HN', 'L', 'symbol', '1.0-2'),
      'COMISIÓN DIARIA': formatCurrency(+item.recaudacion, 'es-HN', 'L', 'symbol', '1.0-2'),
      'INSTITUCIÓN': this.obtenerInstitucion(+item.institucionId),
      'FECHA': item.fecha
    }));

    const csv = Papa.unparse(listConcamposAMostrar);
    const csvData = "\ufeff" + csv; // Agregar BOM al inicio del archivo

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    const fechaActual = moment();
    const stringFecha = fechaActual.format('DD-MM-YYYY-HHmmss');
    const formarNombre = `${nombreArchivo} ${stringFecha}.csv`

    saveAs(blob, formarNombre);
  }

  cerrarBitacora(): void {
    this.nuevoEstadoModalBitacora.emit([false, '']);
  }

  verBitacora(nombreArchivo: string): void {
    this.nuevoEstadoModalBitacora.emit([true, nombreArchivo]);
  }

  obtenerInstitucion(id: number | string): string | undefined {   
    return this.instituciones.find((inst: any) => String(inst.INSTITUCION) === String(id))?.DESC_INSTITUCION;
  }

  verDetalle(cierreInstitucional: CierreDiarioCaja): void {
    this.cierreInstitucional = cierreInstitucional;
    this.screen = 'detalle';
  }

  mostrarPantallaPrincipal(pantalla: string): void {
    this.screen = pantalla;
    this.actualizarInputsMaterialize();
  }

  private obtenerListaFiltrada(lista: CierreDiarioCaja[], datoFiltro: string): CierreDiarioCaja[] {
    const listaPorInstitucion = lista.filter((cierre) => +cierre.institucionId === this.institucionSeleccionada);
    const regexPattern = this.obtenerPatron(datoFiltro);
    return this.institucionSeleccionada === -1 ? 
      lista.filter((cierre: CierreDiarioCaja) => regexPattern.test(cierre.nombreArchivo)):
      listaPorInstitucion.filter((cierre: CierreDiarioCaja) => regexPattern.test(cierre.nombreArchivo));
  }

  private obtenerPatron(datoFiltro: string): RegExp {
    const escapedDatoFiltro = datoFiltro.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('.*' + escapedDatoFiltro + '.*', 'i');
  }

  private actualizarInputsMaterialize() {
    $(document).ready(function () {
      M.updateTextFields();
    });
  }
}

