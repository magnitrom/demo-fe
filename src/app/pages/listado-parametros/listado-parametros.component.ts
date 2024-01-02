import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MttoParametrosService } from 'src/app/services/mtto-parametros.service';
import { mostrarInfo } from 'src/app/utils/utils';

@Component({
  selector: 'app-listado-parametros',
  templateUrl: './listado-parametros.component.html',
  styleUrls: ['./listado-parametros.component.scss']
})
export class ListadoParametrosComponent implements OnInit {

  formularioParametro = this.fb.group({
    nombreParametro: ['', Validators.required],
    valorParametro: ['', Validators.required],
    usuario: ['', Validators.required],
  });
  listadoParametros: any = [];
  editando = false;
  pagina = 1;
  detallesEditar = {
    parametroId: '',
    nuevoValor: '',
    usuario: ''
  };
  isLoggedIn = false;
  userProfile!: KeycloakProfile;
  tokenSso!: any;
  search = '';
  parametroActualizarId = '';
  filterQuery: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly keycloak: KeycloakService,
    private readonly parametrosApi: MttoParametrosService
  ) { }

  async ngOnInit() {
    this.isLoggedIn = true
    // this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = { username: 'bnunez' }
      // this.userProfile = await this.keycloak.loadUserProfile();
      this.formularioParametro.get('usuario')?.setValue(this.userProfile.username);
      this.detallesEditar.usuario = this.userProfile.username ?? '';
      // this.tokenSso = await this.keycloak.getToken();
    }
    this.obtenerParametros();
  }

  obtenerParametros(): void {
    this.parametrosApi.obtener().subscribe((res) => {
      this.listadoParametros = res.data;
    });
  }

  cancelar(): void {
    this.editando = false;
    this.reiniciarForm();
  }

  reiniciarForm(): void {
    this.formularioParametro.get('nombreParametro')?.setValue('');
    this.formularioParametro.get('valorParametro')?.setValue('');
  }

  actualizar(parametro: any): void {
    this.editando = true;
    this.parametroActualizarId = parametro.parametroId;
    this.formularioParametro.get('nombreParametro')?.setValue(parametro.nombreParametro);
    this.formularioParametro.get('valorParametro')?.setValue(parametro.valorParametro);
    this.actualizarInputsMaterialize();
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  editarParametro(): void {
    console.log('aquí')
    this.parametrosApi.modificar({
      parametroId: +this.parametroActualizarId,
      nuevoValor: this.formularioParametro.get('valorParametro')?.value,
      usuario: this.userProfile?.username
    }).subscribe((res) => {
      mostrarInfo({
        title: 'Éxito',
        text: res.messages[0],
        icon: 'success'
      }).then((_) => {
        this.reiniciarForm();
        this.obtenerParametros();
        this.editando = false;
      });
    });
  }

  agregarParametro(): void {
    this.parametrosApi.registrar(this.formularioParametro.value).subscribe((res) => {
      mostrarInfo({
        title: 'Éxito',
        text: res.messages[0],
        icon: 'success'
      }).then((_) => {
        this.reiniciarForm();
        this.obtenerParametros();
      })
    })
  }

  cambiarEstado(parametro: any, estado: string): void {
    this.parametrosApi.cambiarEstado({
      parametroId: parametro.parametroId,
      estado,
      usuario: this.userProfile.username
    }).subscribe((res) => {
      mostrarInfo({
        title: 'Éxito',
        text: res.messages[0],
        icon: 'success'
      }).then((_) => {
        this.obtenerParametros();
      });
    });
  }

  aprobarParametro(parametro: any, aprobado: string): void {
    this.parametrosApi.aprobar({
      parametroId: parametro.parametroId,
      aprobado,
      usuario: this.userProfile?.username
    }).subscribe((res) => {
      if (res.state === 'success') {
        mostrarInfo({
          title: 'Éxito',
          text: res.messages[0],
          icon: 'success'
        }).then((_) => {
          this.obtenerParametros();
        });
      } else {
        mostrarInfo({
          title: 'Error',
          text: res.messages[0],
          icon: 'error'
        });
      }
    });
  }

  obtenerNombreAprobado(aprobado: string): string {
    switch (aprobado) {
      case 'A':
        return 'APROBADO';
      case 'P':
        return 'PENDIENTE';
      default:
        return 'RECHAZADO';
    }
  }

  obtenerNombreEstado(estado: string): string {
    return estado === 'A' ? 'ACTIVO' : 'INACTIVO';
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

}
