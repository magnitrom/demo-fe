import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import moment from 'moment';
import { BitacoraCierreDiario } from 'src/app/models/bitacora-cierre-diario.model';
import { Respuesta } from 'src/app/models/respuesta.model';
import { ApiCierreDiarioService } from 'src/app/services/api-cierre-diario.service';
import { ApiInteroperabilidadService } from 'src/app/services/api-interoperabilidad.service';
import { MttoParametrosService } from 'src/app/services/mtto-parametros.service';
import { obtenerTotalesDeArray } from 'src/app/utils/utils';

@Component({
  selector: 'app-cierre-diario',
  templateUrl: './cierre-diario.component.html',
  styleUrls: ['./cierre-diario.component.scss']
})
export class CierreDiarioComponent implements OnInit {
  screen = 'home';
  searchUno = '';
  fecha = moment().format('DD/MM/YYYY');
  instituciones = [];
  bitacoraCierreDiario: BitacoraCierreDiario[] = [];
  abrirModalBitacora = false;
  codigoArchivoBitacora: string = '';

  constructor(
    private readonly apiCierreDiario: ApiCierreDiarioService,
    private readonly apiInteroperabilidad: ApiInteroperabilidadService,
    private readonly apiParametros: MttoParametrosService,
    private readonly keycloak: KeycloakService
  ) {}

  ngOnInit(): void {
      this.obtenerInstituciones();
  }

  obtenerInstituciones(): void {
    this.apiParametros.obtenerValorParametro('GESTION').subscribe((res) => {
      this.apiInteroperabilidad.obtenerClasificador('INSTITUCIONES', res.data[0]?.valorParametro).subscribe((res) => {
        this.instituciones = res.data;
      });
    });
  }

  verDetalle(detalle: string): void {
    this.screen = detalle;
  }

  regresar(): void {
    this.screen = 'home';
  }

  actualizarScreen(screen: string): void {
    this.screen = screen;
  }

  obtenerTotal(array: any[], campo: string) {
    return obtenerTotalesDeArray(array, campo);
  }

  actualizarSearchUno(valor: string): void {
    this.searchUno = valor;
  }

  obtenerBitacora(nombreArchivoCierreBanco: string, modal: HTMLElement): void {
    this.codigoArchivoBitacora = nombreArchivoCierreBanco;
    this.apiCierreDiario.obtenerBitacora({ nombreArchivoCierreBanco }).subscribe((response: Respuesta<BitacoraCierreDiario[]>) => {
      this.bitacoraCierreDiario = response.data;
      M.Modal.getInstance(modal).open();
    });
  }

  cambiarEstadoModalBitacora(evento: [boolean, string]): void {
    this.abrirModalBitacora = evento[0];
    const modal = document.getElementById('detalleBitacora')!;
    if (this.abrirModalBitacora) {
      this.obtenerBitacora(evento[1], modal);
    } else {
      M.Modal.getInstance(modal).close();
    }
  }

   //OPTIMIZE se usa desde el html para comparar y mostrar los perfiles
  noMostrar(roles: any[]) {
    let userRoles = this.keycloak.getUserRoles();
    if (roles && userRoles) return roles.some((role: any) => userRoles.includes(role));
    else return false;
  }
}
