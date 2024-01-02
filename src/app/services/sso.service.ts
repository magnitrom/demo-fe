import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class SsoService {

  constructor(private readonly keycloak: KeycloakService) { }

  getRoles(): any[] {
    return this.keycloak.getUserRoles();
  }

  getToken() {
    return this.keycloak.getToken();
  }

  getQueryRoles() {
    let query = '';
    let contador = 0;
    for (let d of this.getRoles()) {
      contador++;
      if (contador == this.getRoles().length) {
        query = `${query}groups=${d}`;
      }
      else {
        query = `${query}groups=${d}&`;
      }
    }

    return query;
  }

}  