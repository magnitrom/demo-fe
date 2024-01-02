import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MttoParametrosService } from 'src/app/services/mtto-parametros.service';

import Swal from 'sweetalert2';

declare let $: any;
/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss']
})
/* clase que que contiene una lista de registros y contiene  un botón que  permite agregar un nuevo
registro, y  un botón que  permite editar un registro, y  un botón que  permite
eliminar un registro. */

export class ParametrosComponent implements OnInit {

  //paginacion
  pagina: number = 1;
  buscar_input = ''

  screen: string = 'lista';

  itemSeleccionado: any = {
    id: '',
    nombreParametro: '',
    valorParametro: '',
    estadoParametro: '',
    usuarioPortal: '',
  };

  jsonParametros: any;

  public isLoggedIn = false;
  public userProfile!: KeycloakProfile;
  infoUserSesion: any;
  tokenSesionSSO: any;


  /**
  * La función constructora es una función predeterminada que se llama al crear una instancia de una clase
  * @param {MttoParametrosService} paramSRV - MttoParametrosService: Este es el servicio que será
  * utilizado para obtener los parámetros del servidor.
  * @param {KeycloakService} keycloak - KeycloakService - Este es el servicio que se utilizará para
  * comunicarse con el servidor Keycloak.
  */
  constructor(private paramSRV: MttoParametrosService, private readonly keycloak: KeycloakService) { }

  /**
   Comprueba si el usuario ha iniciado sesión y, de ser así, carga el perfil de usuario y la sesión del token.
   */
  public async ngOnInit() {
    this.isLoggedIn = true
    // this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = { username: 'bnunez' }
      // this.userProfile = await this.keycloak.loadUserProfile();
      // this.tokenSesionSSO = await this.keycloak.getToken();
      this.getAllParams();
    }
  }

  goForms() {
    this.itemSeleccionado = {
      parametroId: '',
      nombreParametro: '',
      valorParametro: '',
      estadoParametro: '',
      usuarioPortal: this.userProfile.username,
    };
    this.screen = 'add';
  }

  procesoModificacion(informacion: any) {
    this.itemSeleccionado = {
      usuarioPortal: this.userProfile.username,
    }
    this.goForms();
  }

  emit(event: any) {
    this.screen = 'lista';
    this.getAllParams();
  }

  /**
   Es una función que toma un elemento como parámetro y lo asigna a una variable llamada
   * itemSeleccionado
   * @param {any} item - any
   */
  clickEditar(item: any) {
    this.itemSeleccionado = {
      parametroId: item.parametroId,
      nombreParametro: item.nombreParametro,
      valorParametro: item.valorParametro,
      estadoParametro: item.estadoParametro,
      usuarioPortal: this.userProfile.username,
    };
    this.screen = 'add';
  }

  /**
   Es una función que toma un elemento como parámetro y lo asigna a una variable llamada
   * item
   * @param {any} item - any
 
   */
  clickEliminar(item: any) {
    this.mensajeConfirmacionEliminacion(item);
  }

  /**
   * Es una función que muestra un mensaje de confirmación al usuario, y si el usuario hace clic en el
   * Botón "Confirmar", llama a otra función llamada "procesoEliminacion"
   * @param {any} item - any
   */
  mensajeConfirmacionEliminacion(item: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: 'blue',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
    }).then(
      (result) => {
        if (result.value) {
          this.procesoEliminacion(item.parametroId, this.userProfile.username);
        }
      }
    );

  }


  procesoEliminacion(id: any, usuario: any) {
    this.paramSRV.deleteRecord(id, usuario).subscribe((response) => {
      if (response.state == 'success') {
        this.respuestaExitosa();
      } else {
        this.respuestaError(response.messages);
      }
    });
  }

  respuestaExitosa() {
    Swal.fire({
      title: 'Éxito',
      text: 'Operación realzada con exito',
      icon: 'success',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
    }).then(
      (result) => {
        this.screen = 'lista';
        this.getAllParams();
      }
    );
  }

  respuestaError(mensajeError: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Ocurrió el siguiente error durante la operación: ' + mensajeError,
      icon: 'warning',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
    }).then(
      (_) => {
        /* no hace nada */
      }
    );
  }

  getAllParams() {
    this.paramSRV.getALLRecords().subscribe((response) => {
      this.jsonParametros = response.data;
    });
  }
}
