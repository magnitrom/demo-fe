import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClasificadoresInteroperabilidadService } from 'src/app/services/clasificadores-interoperabilidad.service';
import { MttoRolesService } from 'src/app/services/mtto-roles.service';
import { MttoUsuariosService } from 'src/app/services/mtto-usuarios.service';

import Swal from 'sweetalert2';

declare let $: any;
/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
/*  formulario para  agregar y editar registros. */

export class FormUsuariosComponent implements OnInit {

  @Output() emit = new EventEmitter();
  @Input() formularioParaAgregar: any;

  nombre_accion = 'Agregar'

  jsonRoles: any;
  arrayInstituciones: any[] = [];

  /**
   ** Una función constructora.
   * @param {MttoRolesService} RolSRV - MttoRolesService
   * @param {MttoUsuariosService} usrSRV - MttoUsuariosService
   * @param {ClasificadoresInteroperabilidadService} apiClasificadores - Este es el servicio que se esta inyectando.
   */
  constructor(private RoleSRV: MttoRolesService, private usrSRV: MttoUsuariosService, private apiClasificadores: ClasificadoresInteroperabilidadService) { }

  ngOnInit(): void {

    if (this.formularioParaAgregar.usuarioId != '') {
      this.nombre_accion = 'editar'
    }

    this.obtenerRoles();
    this.obtenerRegistroClasificadorInstituciones();
    this.selectHTML();
  }


  /* Una función que se llama cuando el usuario hace clic en el botón "Agregar" */
  agregar() {

    if (this.formularioParaAgregar.usuarioId == '') {

      this.usrSRV.insertRecord(this.formularioParaAgregar).subscribe((response) => {

        if (response.state == 'success') {
          this.respuestaExitosa();
        } else {
          this.respuestaError(response.messages);
        }

      });

    } else {
      this.usrSRV.updateRecord(this.formularioParaAgregar).subscribe((response) => {

        if (response.state == 'success') {
          this.respuestaExitosa();
        } else {
          this.respuestaError(response.messages);
        }

      });
    }

  }

  /**
   * La función cancelar() se llama cuando el usuario hace clic en el botón cancelar. Emite un booleano
   * valor de verdadero para el componente principal, que es el componente que llamó al modal. El padre
   * componente luego recibe el valor booleano y cierra el modal.
   */
  cancelar() {
    this.emit.emit(true);
    this.selectHTML();
  }

  

  /**
   * Obtiene todos los registros de la base de datos y luego llama a la función selectHTML())
   */
  obtenerRoles() {
    this.RoleSRV.getALLRecords().subscribe((response) => {
      this.jsonRoles = response.data;
      this.selectHTML();
    });
  }


  /* Una función que está llamando a un servicio que va a obtener los datos de la base de datos. */

  obtenerRegistroClasificadorInstituciones() {
    let camposClasificador: any = ["INSTITUCION", "DESC_INSTITUCION"];

    let bodyInstituciones: any = {
      clasificador: 'INSTITUCIONES',
      campos: camposClasificador,
      filtro: []
    }

    this.apiClasificadores.obtenerRegistros(bodyInstituciones).subscribe((response) => {
      for (let institucion of response.data) {
        this.arrayInstituciones.push(JSON.parse(institucion.registroClasificador));
      } //end for

      this.selectHTML();
    });

  }

  /**
   * * Es una función se activa cuando la funcion que se esta ejecutando es un exito
   */

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
        this.selectHTML();
      }
    );
  }

  /**
   *
 Es una función que toma una cadena como parámetro y muestra un modal con la cadena como el
   * mensaje.
   * @param {any} mensajeError - any
   */
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
        this.selectHTML();
      }
    );
  }

  selectHTML() {

    $(document).ready(function () {
      $('select').formSelect();
      M.updateTextFields();

    });

  }


}
