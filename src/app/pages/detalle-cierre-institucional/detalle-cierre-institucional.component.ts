import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DetallesCierreIns } from 'src/app/models/detalles-cierre.model';
import Swal from 'sweetalert2';
import * as Papa from 'papaparse';
import moment from 'moment';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { saveAs } from 'file-saver';
import { GeneradorPdfService } from 'src/app/services/generador-pdf.service';
import { ApiCierreDiarioService } from 'src/app/services/api-cierre-diario.service';
import { Respuesta } from 'src/app/models/respuesta.model';
import { CierreDiarioCaja } from 'src/app/models/cierre-diario-caja.model';
import { MttoParametrosService } from 'src/app/services/mtto-parametros.service';
import { ApiInteroperabilidadService } from 'src/app/services/api-interoperabilidad.service';

@Component({
  selector: 'app-detalle-cierre-institucional',
  templateUrl: './detalle-cierre-institucional.component.html',
  styleUrls: ['./detalle-cierre-institucional.component.scss']
})
export class DetalleCierreInstitucionalComponent implements OnInit {
  @Input() cierreInstitucional!: CierreDiarioCaja;
  @Input() calcularTotalFuncion!: (array: any[], campo: string) => number;
  @Output() nuevaScreen = new EventEmitter<string>();
  detallesCierre: DetallesCierreIns[] = [];
  pagina = 1;
  instituciones: any[] = [];

  constructor(
    private readonly generadorPdfSrv: GeneradorPdfService, 
    private readonly apiCierreDiario: ApiCierreDiarioService,
    private readonly apiInteroperabilidad: ApiInteroperabilidadService,
    private readonly apiParametros: MttoParametrosService
  ) {
    defineLocale('es', esLocale);
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.obtenerDetalles();
    this.obtenerInstituciones();
  }

  obtenerInstituciones(): void {
    this.apiParametros.obtenerValorParametro('GESTION').subscribe((res) => {
      this.apiInteroperabilidad.obtenerClasificador('INSTITUCIONES', res.data[0]?.valorParametro).subscribe((res) => {
        this.instituciones = res.data;
      });
    });
  }

  regresar(): void {
    this.nuevaScreen.emit('home');
  }

  imprimir(detallesCierre: DetallesCierreIns[], datoFiltro: string, tipo: string = ''): void {
    const filtro = this.obtenerListaFiltrada(detallesCierre, datoFiltro);
    if (!filtro.length) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      ).then((_) => { /** NO hace nada */ }).catch((_) => {/** Tampoco hace nada */});
      return;
    }

    this.generadorPdfSrv.pdf<DetallesCierreIns>(
      tipo, 
      filtro, 
      'Detalle de Cierre Diario Caja Institucional ' + filtro[0].nombreArchivo)
  }

  descargarLista(detallesCierre: DetallesCierreIns[], datoFiltro: string, nombreArchivo: string): void {
    const filtro = this.obtenerListaFiltrada(detallesCierre, datoFiltro);
    if (filtro.length == 0) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      )
      return
    }

    const listConcamposAMostrar = filtro.map((item: DetallesCierreIns) => ({
      'NOMBRE ARCHIVO': item.nombreArchivo,
      'NÚMERO TGR': item.numeroTgr,
      'MONTO TGR': item.montoTgr,
      'ESTADO TGR': item.estadoTgr,
      'FECHA': item.fechaPago
    }));

    const csv = Papa.unparse(listConcamposAMostrar);
    const csvData = "\ufeff" + csv; // Agregar BOM al inicio del archivo

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    const fechaActual = moment();
    const stringFecha = fechaActual.format('DD-MM-YYYY-HHmmss');
    const formarNombre = `${nombreArchivo} ${stringFecha}.csv`

    saveAs(blob, formarNombre);
  }

  obtenerInstitucion(id: number| string): string | undefined {
    return this.instituciones.find((inst) =>String( inst.INSTITUCION) === String(id))?.DESC_INSTITUCION;
  }

  private obtenerDetalles(): void {
    this.apiCierreDiario.obtenerDetalleCierreCaja({ nombreArchivo: this.cierreInstitucional.nombreArchivo }).subscribe((response: Respuesta<DetallesCierreIns[]>) => {
      this.detallesCierre = response.data ?? [];
    });
  }

  private obtenerListaFiltrada(lista: DetallesCierreIns[], datoFiltro: string): DetallesCierreIns[] {
    const regexPattern = this.obtenerPatron(datoFiltro);
    return lista.filter((cierre: DetallesCierreIns) => regexPattern.test(cierre.numeroTgr));
  }

  private obtenerPatron(datoFiltro: string): RegExp {
    const escapedDatoFiltro = datoFiltro.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('.*' + escapedDatoFiltro + '.*', 'i');
  }
}

