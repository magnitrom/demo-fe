import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MttoUsuariosService } from 'src/app/services/mtto-usuarios.service';
import { SsoService } from 'src/app/services/sso.service';

import Swal from 'sweetalert2';
/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  screen: string = "ready";

  buscar_input= ''
 pagina: number = 1;

  /**
   * 
   * @param {KeycloakService} keycloak - KeycloakService -&gt; Este es el servicio que uso para
   * comunicarse con Keycloak.
   * @param {MttoUsuariosService} apiUsuarios - MttoUsuariosService,
   * @param {SsoService} ssoUtlis - SsoService
   */
  constructor(private readonly keycloak: KeycloakService,
    private apiUsuarios: MttoUsuariosService,
    private ssoUtlis: SsoService
  ) { }


  formularioParaAgregar: any = {
    usuarioId: '',
    nombreUsuario: '',
    claveUsuario: '',
    institucionId: '',
    rolId: '',
    correoUsuario: '',
    codigoEmpleadoUsuario: 'null',
    estadoUsuario: '',
    usuarioPortal: '',
    usuarioSesion: '',
    nuevaClave: '',
  }

  public isLoggedIn = false;
  public userProfile!: KeycloakProfile;
  infoUserSesion: any;
  tokenSesionSSO: any;

  jsonUsuarios: any[] = [];


  public async ngOnInit() {
    this.isLoggedIn = true
    // this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = { username: 'bnunez' }
      // this.userProfile = await this.keycloak.loadUserProfile();
      // this.tokenSesionSSO = await this.keycloak.getToken();
      this.obtenerUsuarios();


    }
  }

  /**
   
Una función que se llama cuando el usuario hace clic en el botón para agregar un nuevo usuario.
   */
  goForm() {
    this.formularioParaAgregar = {
      usuarioId: '',
      nombreUsuario: '',
      claveUsuario: '',
      institucionId: '',
      rolId: '',
      correoUsuario: '',
      codigoEmpleadoUsuario: 'null',
      estadoUsuario: '',
      usuarioPortal: '',
      usuarioSesion: this.userProfile.username,
    }
    this.screen = "add";
  }

  /**
   * Toma una fila de una tabla y asigna los valores de la fila a las propiedades de un objeto.
   * @param {any} fila - any
   */
  editarInformacion(row: any) {
    this.formularioParaAgregar = {
      usuarioId: row.usuarioIdFE,
      nombreUsuario: row.nombreUsuarioFE,
      claveUsuario: '',
      institucionId: row.institucionId,
      rolId: row.roleIdFE.roleId,
      correoUsuario: row.correoUsuarioFE,
      codigoEmpleadoUsuario: row.codigoEmpleadoUsuarioFE,
      estadoUsuario: row.estadoUsuarioFE,
      usuarioPortal: row.usuarioPortalFE,
      usuarioSesion: this.userProfile.username,
    }
    this.screen = 'add';
  }

  cambio(row: any) {
    this.formularioParaAgregar = {
      usuarioId: row.usuarioIdFE,
      nombreUsuario: row.nombreUsuarioFE,
      claveUsuario: '',
      institucionId: row.institucionIdFE,
      rolId: row.roleIdFE.rolId,
      correoUsuario: row.correoUsuarioFE,
      codigoEmpleadoUsuario: row.codigoEmpleadoUsuarioFE,
      estadoUsuario: row.estadoUsuarioFE,
      usuarioPortal: row.usuarioPortalFE,
      usuarioSesion: this.userProfile.username,
      nuevaClave: '',
    }
    this.screen = 'change';
  }

  emit(event: any) {
    this.obtenerUsuarios();
    this.screen = 'ready';
  }

  eliminar(item: any) {
    this.mensajeConfirmacionEliminacion(item);

  }

  desbloquear(row: any) {
    this.formularioParaAgregar = {
      usuarioId: row.usuarioIdFE,
      usuarioSesion: this.userProfile.username,
    }

    this.apiUsuarios.userUnlock(this.formularioParaAgregar).subscribe((response) => {

      if (response.state == 'success') {
        this.respuestaExitosa();
      } else {
        this.respuestaError(response.messages);
      }

    });

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
          this.aplicarEliminacion(item.usuarioIdFE, this.userProfile.username);
        }
      }
    );

  }


  aplicarEliminacion(usuarioId: any, usuarioSesion: any) {
    this.apiUsuarios.deleteRecord(usuarioId, usuarioSesion).subscribe((response) => {

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
        this.screen = 'ready';
        this.obtenerUsuarios();
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

  obtenerUsuarios() {
    this.apiUsuarios.getALLRecords().subscribe((response) => {
      this.jsonUsuarios = response.data;
    });
  }

}
