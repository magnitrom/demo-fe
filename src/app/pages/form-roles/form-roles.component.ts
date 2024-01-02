import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MttoRolesService } from 'src/app/services/mtto-roles.service';
import Swal from 'sweetalert2';

declare let $: any;
/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-form-roles',
  templateUrl: './form-roles.component.html',
  styleUrls: ['./form-roles.component.scss']
})

/* Esta clase es un componente que se usa para crear y actualizar roles en una base de datos. */

export class FormRolesComponent implements OnInit {

  @Output() emit = new EventEmitter();
  @Input() objetoRol: any;

  nombre_accion = 'Agregar'

  constructor(private roleSRV: MttoRolesService) { }

  ngOnInit(): void {

    if(this.objetoRol.roleId != '')
    {
      this.nombre_accion = 'editar'
    }


    this.selectHTML();
  }

  procesar() {

    if (this.objetoRol.roleId == '') {
      this.roleSRV.insertRecord(this.objetoRol).subscribe((response) => {

        if (response.state == 'success') {
          this.respuestaExitosa();
        } else {
          this.respuestaError(response.messages);
        }

      });
    } else {
      this.roleSRV.updateRecord(this.objetoRol).subscribe((response) => {
        if (response.state == 'success') {
          this.respuestaExitosa();
        } else {
          this.respuestaError(response.messages);
        }
      });
    }

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
      (result) => {
       //result
      }
    );
  }

  selectHTML() {

    $(document).ready(function () {
      $('select').formSelect();
    });

  }
}
