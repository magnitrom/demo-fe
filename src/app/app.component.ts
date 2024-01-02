import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SeguridadApiService } from './services/seguridad-api.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ApiAutUsrService } from './services/api-aut-usr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userProfile = {
    username: 'bnunez',
    email: 'bnunez@datum'
  };
 
  constructor(
    private readonly apiAuthToken: SeguridadApiService,
    private readonly keycloak: KeycloakService,
    private readonly apiAutUsr: ApiAutUsrService
  ) {
    // for (let d of environment.urlsTokenApp) {
    //   this.apiAuthToken.getAuthToken(d.idAplicacion).subscribe((response) => {
    //     if (response.state == 'success') {
    //       sessionStorage.setItem(btoa(d.idAplicacion), response.data[0].access_token);
    //     }
    //   });
    // }
  }

  async ngOnInit() {
      // const isLogged = await this.keycloak.isLoggedIn();
      // if (isLogged) {
      //   if (!sessionStorage.getItem('loggeado')) {
      //     this.userProfile = await this.keycloak.loadUserProfile();
          this.apiAutUsr.registrarIngreso({ usuarioPA: this.userProfile.username }).subscribe((res) => {
            if (res.state === 'success') sessionStorage.setItem('loggeado', 'true');
          });
      //   }
      // }
  }

}