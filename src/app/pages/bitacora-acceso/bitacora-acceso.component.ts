import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { BitacoraAcceso } from 'src/app/models/bitacora-acceso.model';
import { Respuesta } from 'src/app/models/respuesta.model';
import { ApiAutUsrService } from 'src/app/services/api-aut-usr.service';
import moment from 'moment';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { GeneradorPdfService } from 'src/app/services/generador-pdf.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { mostrarInfo } from 'src/app/utils/utils';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-bitacora-acceso',
  templateUrl: './bitacora-acceso.component.html',
  styleUrls: ['./bitacora-acceso.component.scss']
})
export class BitacoraAccesoComponent implements OnInit {

  datosBitacora: BitacoraAcceso[] = [];
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-dark-blue' }, { dateInputFormat: 'DD-MM-YYYY' }, { locale: 'es' }, { adaptivePosition: true });
  range: Date[] = [new Date(), new Date()];
  pagina = 1;
  searchUno = '';
  usuario!: string;
  fecha: string = new Date().toISOString();

  constructor(
    private readonly apiAutUsr: ApiAutUsrService,
    private readonly router: Router,
    private readonly generadorPdfSrv: GeneradorPdfService,
    private readonly filtroPipe: FilterPipe,
    private readonly keycloak: KeycloakService
  ) {
    defineLocale('es', esLocale);
  }

  async ngOnInit() {
    window.scroll(0, 0);
    // this.usuario = (await this.keycloak.loadUserProfile()).username as string;
    this.usuario = 'bnunez'
    this.actualizarInputsMaterialize();
  }

  cambioDeFecha(dates: (Date | undefined)[] | undefined) {
    this.cargarDatos(moment(dates?.[0]).format('YYYY-MM-DD'), moment(dates?.[1]).format('YYYY-MM-DD'));
  }

  regresar(): void {
    this.router.navigate(['/home']);
  }

  imprimir(lista: BitacoraAcceso[], tipo: string = ''): void {
    const filtro = this.obtenerListaFiltrada(lista);
    if (!filtro.length) {
      mostrarInfo({
        title: 'Información',
        text: 'No hay nada que imprimir',
        icon: 'info'
      });
      return;
    }

    this.generadorPdfSrv.pdf<BitacoraAcceso>(tipo, filtro, 'Bitácora de Acceso al Portal Administrativo');
  }

  descargarLista(lista: BitacoraAcceso[], nombreArchivo: string) {
    const filtro = this.obtenerListaFiltrada(lista);
    if (filtro.length == 0) {
      mostrarInfo({
        title: 'Información',
        text: 'No hay nada que descargar',
        icon: 'info'
      });
      return
    }

    const listConcamposAMostrar = filtro.map((item: BitacoraAcceso) => ({
      'USUARIO': item.usuarioPA,
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

  private cargarDatos(fechaInicio = moment(this.range[0]).format('YYYY-MM-DD'), fechaFin = moment(this.range[1]).format('YYYY-MM-DD')): void {
    this.apiAutUsr.obtenerBitacora({ fechaInicio, fechaFin }).subscribe((res: Respuesta<BitacoraAcceso[]>) => {
      this.datosBitacora = res.data ?? [];
      this.actualizarInputsMaterialize();
    });
  }

  private obtenerListaFiltrada(lista: BitacoraAcceso[]): BitacoraAcceso[] {
    return this.filtroPipe.transform(lista, this.searchUno);
  }

  private actualizarInputsMaterialize() {
    $(document).ready(function () {
      M.updateTextFields();
    });
  }
}
