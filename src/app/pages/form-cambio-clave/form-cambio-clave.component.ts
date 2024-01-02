import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MttoUsuariosService } from 'src/app/services/mtto-usuarios.service';
import Swal from 'sweetalert2';

declare let $: any;

/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-form-cambio-clave',
  templateUrl: './form-cambio-clave.component.html',
  styleUrls: ['./form-cambio-clave.component.scss']
})
/* Esta clase es un componente que se utiliza para cambiar la contraseña de un usuario, tiene una forma que es
se llena con los datos del usuario y luego se envía al servidor para ser procesado. */

export class FormCambioClaveComponent implements OnInit {

  @Output()  emit = new EventEmitter();
  @Input() formularioParaAgregar: any;

  constructor(private apiUsuarios: MttoUsuariosService) { }

  ngOnInit(): void {
    this.selectHTML();
  }

  realizarCambio(){
    this.apiUsuarios.changeInfo(this.formularioParaAgregar).subscribe((response) =>{

        if(response.state == 'success'){
              this.respuestaExitosa();
        }else{
              this.respuestaError(response.messages);
        }

    });
  }

  respuestaExitosa(){
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

  respuestaError(mensajeError:any){
    Swal.fire({
      title: 'Advertencia',
      text: 'Ocurrio el siguiente error durante la operación: '+mensajeError,
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

  cancelar(){
    this.emit.emit(true);
    this.selectHTML();
  }

  selectHTML(){

    $(document).ready(function () {
      $('select').formSelect();
    });

  }

}
