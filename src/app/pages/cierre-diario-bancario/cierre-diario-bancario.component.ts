import { formatCurrency } from '@angular/common';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import moment from 'moment';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CierreDiarioBancario } from 'src/app/models/cierre-diario-bancario.model';
import Swal from 'sweetalert2';
import { GeneradorPdfService } from 'src/app/services/generador-pdf.service';
import { ApiCierreDiarioService } from 'src/app/services/api-cierre-diario.service';
import { Respuesta } from 'src/app/models/respuesta.model';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-cierre-diario-bancario',
  templateUrl: './cierre-diario-bancario.component.html',
  styleUrls: ['./cierre-diario-bancario.component.scss']
})
export class CierreDiarioBancarioComponent implements OnInit {
  @Output() nuevaScreen = new EventEmitter<string>();
  @Output() nuevoSearchUno = new EventEmitter<string>();
  @Output() nuevoEstadoModalBitacora = new EventEmitter<[boolean, string]>();
  @Input() calcularTotalFuncion!: (array: any[], campo: string) => number;
  @Input() searchUno: string = '';
  @Input() fecha!: string;

  pagina = 1;
  cierresBancarios: CierreDiarioBancario[] = [];
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-dark-blue' }, { dateInputFormat: 'DD-MM-YYYY' }, { locale: 'es' }, { adaptivePosition: true });
  range: Date[] = [new Date(), new Date()];
  usuario = '';
  bancos: any[] = [];
  bancoSeleccionado = -1;
  screen = 'home';
  cierreBancario!: CierreDiarioBancario;

  constructor(
    private readonly generadorPdfSrv: GeneradorPdfService,
    private readonly cierreDiarioSrv: ApiCierreDiarioService,
    private readonly keycloak: KeycloakService
  ) {
    defineLocale('es', esLocale);
   }

  async ngOnInit() {
    window.scroll(0, 0);
    const logged = true
    // const logged = await this.keycloak.isLoggedIn();
    if (logged) this.usuario = 'bnunez'
    // if (logged) this.usuario = (await this.keycloak.loadUserProfile()).username ?? '';
    this.actualizarInputsMaterialize();
  }

  obtenerCierresDiariosBancarios(fechaInicio = moment(this.range[0]).format('YYYY-MM-DD'), fechaFin = moment(this.range[1]).format('YYYY-MM-DD')): void {
    this.cierreDiarioSrv.obtenerArchivosCierreBancos({ fechaInicio, fechaFin }).subscribe((response: Respuesta<CierreDiarioBancario[]>) => {
      this.cierresBancarios = response.data?.sort((a, b) => {
        if (a.estado === 'NO CONCILIADO' && b.estado !== 'NO CONCILIADO') {
          return -1;
        }
        if (a.estado !== 'NO CONCILIADO' && b.estado === 'NO CONCILIADO') {
          return 1;
        }
        return 0;
      }) ?? [];
      this.llenarBancos();
    })
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
    this.obtenerCierresDiariosBancarios(moment(dates?.[0]).format('YYYY-MM-DD'), moment(dates?.[1]).format('YYYY-MM-DD'));
  }
  
  onSelectBanco(event: Event): void {
    this.bancoSeleccionado = +(event.target as HTMLSelectElement).value;
    this.pagina = 1;
  }

  imprimir(lista: CierreDiarioBancario[], datoFiltro: string, tipo: string = ''): void {
    const filtro = this.obtenerListaFiltrada(lista, datoFiltro);
    if (!filtro.length) {
      Swal.fire(
        'Información',
        'No hay nada que descargar',
        'info'
      ).then((_) => { /** NO hace nada */ }).catch((_) => {/** Tampoco hace nada */});
      return;
    }

    this.generadorPdfSrv.pdf<CierreDiarioBancario>(tipo, filtro, 'Cierre Diario Bancario');
  }

  descargarLista(lista: CierreDiarioBancario[], datoFiltro: string, nombreArchivo: string) {
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
      'NOMBRE ARCHIVO': item.nombreArchivo,
      'BANCO': item.banco,
      'CANTIDAD TGR': item.cantidadTgrs,
      'RECAUDACIÓN': formatCurrency(+item.recaudacion, 'es-HN', 'L', 'symbol', '1.0-2'),
      'COMISIÓN DIARIA': formatCurrency(+item.comisionDiaria, 'es-HN', 'L', 'symbol', '1.0-2'),
      'ESTADO': item.estado,
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

  verDetalle(cierreBancario: CierreDiarioBancario): void {
    this.cierreBancario = cierreBancario;
    this.screen = 'detalle';
  }

  mostrarPantallaPrincipal(pantalla: string): void {
    this.screen = pantalla;
    this.actualizarInputsMaterialize();
  }

  private obtenerListaFiltrada(lista: CierreDiarioBancario[], datoFiltro: string): CierreDiarioBancario[] {
    const listaPorBanco = lista.filter((cierre) => +cierre.banco.split(' - ')[0] === this.bancoSeleccionado);
    const regexPattern = this.obtenerPatron(datoFiltro);
    return this.bancoSeleccionado === -1 ? 
      lista.filter((cierre: CierreDiarioBancario) => regexPattern.test(cierre.nombreArchivo)):
      listaPorBanco.filter((cierre: CierreDiarioBancario) => regexPattern.test(cierre.nombreArchivo));
  }

  private obtenerPatron(datoFiltro: string): RegExp {
    const escapedDatoFiltro = datoFiltro.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('.*' + escapedDatoFiltro + '.*', 'i');
  }

  private llenarBancos(): void {
    this.bancos = [];
    this.cierresBancarios.forEach((cierre) => {
      if (!this.bancos.includes(cierre.banco)) this.bancos.push(cierre.banco);
    })
  }

  private actualizarInputsMaterialize() {
    $(document).ready(function () {
      M.updateTextFields();
    });
  }

   //OPTIMIZE se usa desde el html para comparar y mostrar los perfiles
   noMostrar(roles: any[]) {
    let userRoles = this.keycloak.getUserRoles();
     if (roles && userRoles) return roles.some((role: any) => userRoles.includes(role));
     else return false;
   }
}
