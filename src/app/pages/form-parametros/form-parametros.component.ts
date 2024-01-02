import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { MttoParametrosService } from 'src/app/services/mtto-parametros.service';

import Swal from 'sweetalert2';

declare let $: any;
/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-form-parametros',
  templateUrl: './form-parametros.component.html',
  styleUrls: ['./form-parametros.component.scss']
})
/*   formulario que se usa para insertar y actualizar registros, el formulario se carga con los datos del
registro a actualizar*/

export class FormParametrosComponent implements OnInit {

  @Output() emit = new EventEmitter();
  @Input() itemSeleccionado: any;

  public isLoggedIn = false;
  public userProfile!: KeycloakProfile;
  infoUserSesion: any;
  tokenSesionSSO: any;

  nombre_accion = 'Agregar'

  constructor(private paramSRV: MttoParametrosService) { }

  ngOnInit(): void {

    if(this.itemSeleccionado.parametroId !== '')
    {
      this.nombre_accion = 'editar'
    }
    this.selectHTML();
  }

  procesar() {






    if (this.itemSeleccionado.parametroId == '') {

      this.paramSRV.insertRecord(this.itemSeleccionado).subscribe((response) => {

        if (response.state == 'success') {
          this.respuestaExitosa();
        } else {
          this.respuestaError(response.messages);
        }

      });

    } else {

      this.paramSRV.updateRecord(this.itemSeleccionado).subscribe((response) => {

        if (response.state == 'success') {
          this.respuestaExitosa();
        } else {
          this.respuestaError(response.messages);
        }

      });

    }

    this.selectHTML();
  }

  cancelar() {
    this.emit.emit(true);
    this.selectHTML();
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
        this.emit.emit(true);
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

  selectHTML() {

    $(document).ready(function () {
      $('select').formSelect();
    });

  }

}
