import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {
  MenuSidebar,
  PerfilUsuario,
} from 'src/app/data/barra-nevegacion';
declare let $: any;

/* Funcion que se usa para definir los metadatos de la clase. */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})


/* Una clase que se usa para crear un nuevo objeto. */

export class NavbarComponent implements OnInit, AfterViewInit {

  menuSidebar: PerfilUsuario = MenuSidebar;

  public isLoggedIn = false;
  public userProfile = {
    username: 'bnunez',
    firstName: 'Bryan',
    lastName: 'Nunez',
    email: 'bnunez@datum'
  };
  infoUserSesion: any;

  nombreCompleto: string = ''
  roles = []



  /**
 * La función constructora se usa para inyectar KeycloakService, SsoService, Router y
   * Servicios ActivatedRoute en el componente
   * @param {KeycloakService} keycloak - KeycloakService - Este es el servicio que creamos en el
   * paso anterior.
   * @param {SsoService} sso - SsoService - Este es el servicio que creamos en el paso anterior.
   * @param {Router} router - Router - Este es el servicio de Angular Router.
   * @param {ActivatedRoute} activeRoute: esta es la ruta que está actualmente activa.
   */
  constructor(private readonly keycloak: KeycloakService) { }

  misRoles!:any;

  /* Esta es una función que se utiliza para comprobar si el usuario ha iniciado sesión. */
  public async ngOnInit() {
    // this.isLoggedIn = await this.keycloak.isLoggedIn();
    // if (this.isLoggedIn) {
    //   this.keycloak
    //     .loadUserProfile()
    //     .then(profile => {
    //       // La variable 'profile' ahora contiene la información del perfil del usuario
    //       this.userProfile = profile;
          sessionStorage.setItem('userProfile', JSON.stringify(this.userProfile));
          this.nombreCompleto = this.userProfile.firstName + ' ' + this.userProfile.lastName;
          this.roles = JSON.parse(sessionStorage.getItem("rComunes")!);
          this.misRoles= [];//this.keycloak.getUserRoles();
    //     })
    //     .catch(error => {
    //       console.error('Error al cargar el perfil del usuario', error);
    //     });
    // }
  }

  /**
   * Esta función redirigirá al usuario a la página de inicio de sesión de Keycloak.
   */
  public login() {
    this.keycloak.login();
  }

  /**
   *La función de cierre de sesión () cierra la sesión del usuario de la aplicación y lo redirige a Keycloak
   * página de cierre de sesión.
   */
  public logout() {
    sessionStorage.removeItem('loggeado');
    this.keycloak.logout(window.location.origin);
  }

  //OPTIMIZE se usa desde el html para comparar y mostrar los perfiles
  existePerfil(roles: any[]) {
    // let userRoles = this.keycloak.getUserRoles();
    let userRoles: any = [];
    if (roles && userRoles) {

      return roles.some((role: any) => userRoles.includes(role));
    }
    else {
      return false;
    }
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.collapsible').collapsible();
      $('.dropdown-trigger').dropdown();
      $('select').formSelect();
    });
  }
}
