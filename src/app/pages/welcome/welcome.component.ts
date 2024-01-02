import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent  {

  constructor(
    private readonly keycloak: KeycloakService
  ) { }


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
