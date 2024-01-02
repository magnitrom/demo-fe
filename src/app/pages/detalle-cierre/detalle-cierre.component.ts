import { formatCurrency } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CierreDiarioBancario } from 'src/app/models/cierre-diario-bancario.model';
import { DetallesCierre } from 'src/app/models/detalles-cierre.model';
import Swal from 'sweetalert2';
import * as Papa from 'papaparse';
import moment from 'moment';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { saveAs } from 'file-saver';
import { GeneradorPdfService } from 'src/app/services/generador-pdf.service';
import { ApiCierreDiarioService } from 'src/app/services/api-cierre-diario.service';
import { Respuesta } from 'src/app/models/respuesta.model';
import { KeycloakService } from 'keycloak-angular';
import { ApiInformesService } from 'src/app/services/api-informes.service';

@Component({
  selector: 'app-detalle-cierre',
  templateUrl: './detalle-cierre.component.html',
  styleUrls: ['./detalle-cierre.component.scss']
})
export class DetalleCierreComponent implements OnInit {
  @Input() cierreBancario!: CierreDiarioBancario;
  @Input() calcularTotalFuncion!: (array: any[], campo: string) => number;
  @Output() nuevaScreen = new EventEmitter<string>();
  detallesCierre: DetallesCierre[] = [];
  pagina = 1;

  constructor(
    private readonly apiInformesService: ApiInformesService,
    private readonly generadorPdfSrv: GeneradorPdfService, 
    private readonly apiCierreDiario: ApiCierreDiarioService, 
    private readonly keycloak: KeycloakService) {
    defineLocale('es', esLocale);
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.obtenerDetalles();
    this.actualizarInputsMaterialize();
  }

  regresar(): void {
    this.nuevaScreen.emit('home');
  }

  imprimir(detallesCierre: DetallesCierre[], datoFiltro: string, tipo: string = ''): void {

    const filtro = this.obtenerListaFiltrada(detallesCierre, datoFiltro);
    if (!filtro.length) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      ).then((_) => { /** NO hace nada */ }).catch((_) => {/** Tampoco hace nada */ });
      return;
    }

    let datoFil = filtro.map((elemento) => ({
      ...elemento,
      montoTgr: formatCurrency(+elemento.montoTgr, 'es-HN', 'L', 'symbol', '1.0-2'),
      montoTgrBanco: formatCurrency(+elemento.montoTgrBanco, 'es-HN', 'L', 'symbol', '1.0-2'),
      diferencia: formatCurrency(+elemento.diferencia, 'es-HN', 'L', 'symbol', '1.0-2')
    }));

    this.generadorPdfSrv.pdf<DetallesCierre>(
      tipo,
      datoFil,
      'Detalle de Cierre Diario Bancario ' + filtro[0].nombreArchivo)
  }

  descargarLista(detallesCierre: DetallesCierre[], datoFiltro: string, nombreArchivo: string): void {
    const filtro = this.obtenerListaFiltrada(detallesCierre, datoFiltro);
    if (filtro.length == 0) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      )
      return
    }

    const listConcamposAMostrar = filtro.map(item => ({
      'NÚMERO TGR': item.numeroTgr,
      'MONTO TGR': item.montoTgr,
      'ESTADO TGR': item.estadoTgr,
      'FECHA': item.fechaPago,
      'BANCO': `${this.cierreBancario.banco}`,
      'AGENCIA': item.agencia,
      'CAJERO': item.cajero,
      'TRANSACCIÓN BANCARIA': item.transaccionBancaria,
      'MONTO BANCO': item.montoTgrBanco,
      'DIFERENCIA': item.diferencia,
      'ESTADO CONCILIACIÓN': item.estadoConciliacion
    }));

    const csv = Papa.unparse(listConcamposAMostrar);
    const csvData = "\ufeff" + csv; // Agregar BOM al inicio del archivo

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    const fechaActual = moment();
    const stringFecha = fechaActual.format('DD-MM-YYYY-HHmmss');
    const formarNombre = `${nombreArchivo} ${stringFecha}.csv`

    saveAs(blob, formarNombre);
  }

  obtenerDiferencias(): number {
    return this.detallesCierre.filter((detalle) => +detalle.diferencia > 0).length;
  }

  private obtenerDetalles(): void {
    this.apiCierreDiario.obtenerDetalleCierreBanco({ nombreArchivo: this.cierreBancario.nombreArchivo }).subscribe((response: Respuesta<DetallesCierre[]>) => {
      if (response.data) {
        response.data.sort((a, b) => {
          return a.estadoConciliacion === 'NO CONCILIADO' ? -1 : b.estadoConciliacion === 'NO CONCILIADO' ? 1 : 0;
        });

      }
      this.detallesCierre = response.data ?? [];
    })
  }

  private obtenerListaFiltrada(lista: DetallesCierre[], datoFiltro: string): DetallesCierre[] {
    const regexPattern = this.obtenerPatron(datoFiltro);
    return lista.filter((cierre: DetallesCierre) => regexPattern.test(cierre.numeroTgr));
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

  /**
   * Proceso para dar de baja a los tgr
   */
  darBajaTgr() {
    let body: any = {
      "numeroTgr": "TGR-1-00002115",
      "motivo": "Prueba para dar de baja un TGR",
      "aprobadoPor": "datum"
    };
    this.apiInformesService.bajaTGR(body).subscribe(resp => {
      if (resp.state == 'success') {
        Swal.fire({
          icon: 'success',
          title: '¡Acción realizada con éxito!',
          showConfirmButton: false,
        }).then(() => {

        });
      }
      else {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Ocurrio el siguiente error durante la operación',
          showConfirmButton: false,
        }).then(() => {

        });
      }
    });
  }
}
