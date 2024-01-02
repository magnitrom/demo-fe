import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { BitacoraAccesoIns } from 'src/app/models/bitacora-acceso.model';
import { Respuesta } from 'src/app/models/respuesta.model';
import { ApiAutUsrService } from 'src/app/services/api-aut-usr.service';
import moment from 'moment';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { GeneradorPdfService } from 'src/app/services/generador-pdf.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { mostrarInfo } from 'src/app/utils/utils';
import { FiltroPorCampoPipe } from 'src/app/pipes/filtro-por-campo.pipe';
import { ApiInteroperabilidadService } from 'src/app/services/api-interoperabilidad.service';
import { MttoParametrosService } from 'src/app/services/mtto-parametros.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-bitacora-acceso-ins',
  templateUrl: './bitacora-acceso-ins.component.html',
  styleUrls: ['./bitacora-acceso-ins.component.scss']
})
export class BitacoraAccesoInsComponent implements OnInit {

  datosBitacoraIns: BitacoraAccesoIns[] = [];
  institucionId: string = '';
  arrayInstituciones: any[] = [];
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-dark-blue' }, { dateInputFormat: 'DD-MM-YYYY' }, { locale: 'es' }, { adaptivePosition: true });
  range: Date[] = [new Date(), new Date()];
  pagina = 1;
  searchUno = '';
  usuario!: string;
  fecha: string = new Date().toLocaleDateString();

  constructor(
    private readonly apiAutUsr: ApiAutUsrService,
    private readonly router: Router,
    private readonly generadorPdfSrv: GeneradorPdfService,
    private readonly filtroPipe: FilterPipe,
    private readonly filtroPorCampoPipe: FiltroPorCampoPipe,
    private readonly apiInteroperabilidad: ApiInteroperabilidadService,
    private readonly apiParametros: MttoParametrosService,
    private readonly keycloak: KeycloakService
  ) {
    defineLocale('es', esLocale);
  }

  async ngOnInit() {
    window.scroll(0, 0);
    this.usuario = 'bnunez'
    // this.usuario = (await this.keycloak.loadUserProfile()).username as string;
    this.obtenerInstituciones();
    this.actualizarInputsMaterialize();
  }

  obtenerInstituciones(): void {
    this.apiParametros.obtenerValorParametro('GESTION').subscribe((res) => {
      this.apiInteroperabilidad.obtenerClasificador('INSTITUCIONES', res.data[0]?.valorParametro).subscribe((res) => {
        this.arrayInstituciones = res.data?.sort((a: any, b: any) => +a.INSTITUCION - +b.INSTITUCION);
      });
    });
  }

  cambioDeFecha(dates: (Date | undefined)[] | undefined) {
    this.cargarDatos(moment(dates?.[0]).format('YYYY-MM-DD'), moment(dates?.[1]).format('YYYY-MM-DD'));
  }

  regresar(): void {
    this.router.navigate(['/home']);
  }

  imprimir(lista: BitacoraAccesoIns[], tipo: string = ''): void {
    const filtro = this.obtenerListaFiltrada(lista).map((l) => ({
      ...l,
      institucionId: l.institucionId + ' - ' + this.nombreInstitucion(l.institucionId),
    }));
    if (!filtro.length) {
      mostrarInfo({
        title: 'Información',
        text: 'No hay nada que imprimir',
        icon: 'info'
      });
      return;
    }

    this.generadorPdfSrv.pdf<BitacoraAccesoIns>(tipo, filtro, 'Bitácora de Acceso al Portal Institucional');
  }

  descargarLista(lista: BitacoraAccesoIns[], nombreArchivo: string) {
    const filtro = this.obtenerListaFiltrada(lista);
    if (filtro.length == 0) {
      mostrarInfo({
        title: 'Información',
        text: 'No hay nada que descargar',
        icon: 'info'
      });
      return
    }

    const listConcamposAMostrar = filtro.map((item: BitacoraAccesoIns) => ({
      'USUARIO': item.usuarioPI,
      'INSTITUCIÓN': item.institucionId + ' - ' + this.nombreInstitucion(item.institucionId),
      'FECHA Y HORA': item.fechaAcceso
    }));

    const csv = Papa.unparse(listConcamposAMostrar);
    const csvData = "\ufeff" + csv; // Agregar BOM al inicio del archivo

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    const fechaActual = moment();
    const stringFecha = fechaActual.format('DD-MM-YYYY-HHmmss');
    const formarNombre = `${nombreArchivo} ${stringFecha}.csv`

    saveAs(blob, formarNombre);
  }

  cambioInstitucion(): void {
    this.actualizarElementos();
    this.pagina = 1;
  }

  nombreInstitucion(id: any): string {
    return this.arrayInstituciones.find((i) => +i.INSTITUCION === +id).DESC_INSTITUCION as string;
  }

  private cargarDatos(fechaInicio = moment(this.range[0]).format('YYYY-MM-DD'), fechaFin = moment(this.range[1]).format('YYYY-MM-DD')): void {
    this.apiAutUsr.obtenerBitacoraIns({ fechaInicio, fechaFin }).subscribe((res: Respuesta<BitacoraAccesoIns[]>) => {
      this.datosBitacoraIns = res.data ?? [];
      this.actualizarElementos();
    });
  }

  private obtenerListaFiltrada(lista: BitacoraAccesoIns[]): BitacoraAccesoIns[] {
    const filtro1 = this.filtroPipe.transform(lista, this.searchUno);
    return this.filtroPorCampoPipe.transform(filtro1, 'institucionId', this.institucionId);
  }

  private actualizarInputsMaterialize() {
    $(document).ready(function () {
      M.updateTextFields();
    });
  }

  private selectHTML() {
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  private actualizarElementos(): void {
    this.actualizarInputsMaterialize();
    this.selectHTML();
  }
}
