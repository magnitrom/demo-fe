import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly keycloak: KeycloakService
  ) {
    console.log('Usuarios', this.keycloak.getUserRoles())
  }

  ngOnInit(): void {
      //ngOnInit
  }

  public logout() {
    sessionStorage.removeItem('loggeado');
    this.keycloak.logout();
  }

  //OPTIMIZE se usa desde el html para comparar y mostrar los perfiles
  existePerfil(roles: any[]) {
    let userRoles = this.keycloak.getUserRoles();
    if (roles && userRoles) {

      return roles.some((role: any) => userRoles.includes(role));
    }
    else {
      return false;
    }
  }

}
