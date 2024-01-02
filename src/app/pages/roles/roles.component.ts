import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MttoRolesService } from 'src/app/services/mtto-roles.service';

import Swal from 'sweetalert2';
/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})


export class RolesComponent implements OnInit {

  screen: string = 'ready';

  buscar_input = ''
  pagina: number = 1;

  jsonRoles: any[] = [];

  objetoRol: any = {
    roleId: '',
    nombreRol: '',
    descripcionRol: '',
    estadoRol: '',
    usuarioPortal: '',
  }

  public isLoggedIn = false;
  public userProfile!: KeycloakProfile;
  infoUserSesion: any;
  tokenSesionSSO: any;

  /**
   *La función constructora es una función predeterminada que se ejecuta cuando se carga el componente.
   * @param {KeycloakService} keycloak - KeycloakService - Este es el servicio que creamos en el
   * paso anterior.
   * @param {MttoRolesService} apiRoles: este es el servicio que se usará para obtener los roles del
   *API.
   */
  constructor(private readonly keycloak: KeycloakService, private apiRoles: MttoRolesService) { }

  public async ngOnInit() {
    this.isLoggedIn = true
    // this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = { username: 'bnunez' }
      // this.userProfile = await this.keycloak.loadUserProfile();
      // this.tokenSesionSSO = await this.keycloak.getToken();
      this.obtenerTodosRoles();
    }
  }

  goForms() {
    this.objetoRol = {
      roleId: '',
      nombreRol: '',
      descripcionRol: '',
      estadoRol: '',
      usuarioPortal: this.userProfile.username,
    }

    this.screen = 'add';
  }

  clickEditar(row: any) {
    this.objetoRol = {
      roleId: row.roleId,
      nombreRol: row.nombreRol,
      descripcionRol: row.descripcionRol,
      estadoRol: row.estadoRol,
      usuarioPortal: this.userProfile.username,
    }
    this.screen = 'add';
  }

  clickEliminar(row: any) {
    this.mensajeConfirmacionEliminacion(row);
  }

  mensajeConfirmacionEliminacion(item: any) {

    Swal.fire({
      title: '¿Esta seguro de eliminar el registro?',
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
          this.aplicarEliminacionRol(item.roleId, this.userProfile.username);
        }
      }
    );

  }

  aplicarEliminacionRol(roleId: any, usuario: any) {
    this.apiRoles.deleteRecord(roleId, usuario).subscribe((response) => {

      if (response.state == 'success') {
        this.respuestaExitosa();
      } else {
        this.respuestaError(response.messages);
      }

    });
  }

  emit(event: any) {

    this.obtenerTodosRoles();
    this.screen = 'ready';
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
        this.screen = 'ready';
        this.obtenerTodosRoles();
      }
    );
  }

  respuestaError(mensajeError: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Ocurrio el siguiente error durante la operación: ' + mensajeError,
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

  obtenerTodosRoles() {
    this.apiRoles.getALLRecords().subscribe((response) => {
      this.jsonRoles = response.data;
    });
  }

}
