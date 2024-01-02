import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";
import { SeguridadApiService } from "../services/seguridad-api.service";



const actualizarTokens = (apiAuthToken: SeguridadApiService, urlsTokenApp: any[]) => {
    for (let d of urlsTokenApp) {
        apiAuthToken.getAuthToken(d.idAplicacion).subscribe((response) => {
            if (response.state == 'success') {
                sessionStorage.setItem(btoa(d.idAplicacion), response.data[0].access_token);
            }
        });
    }
}


export const initializeKeycloak = (keycloak: KeycloakService, apiAuthToken: SeguridadApiService) => {

    actualizarTokens(apiAuthToken, environment.urlsTokenApp);

    setInterval(() => {
        if (keycloak.isTokenExpired()) {
            keycloak.updateToken()
                .then((actualiza) => {
                    if (actualiza) {
                        for (let d of environment.urlsTokenApp) {
                            apiAuthToken.getAuthToken(d.idAplicacion).subscribe((response) => {
                                if (response.state == 'success') {
                                    sessionStorage.setItem(btoa(d.idAplicacion), response.data[0].access_token);
                                }
                            });
                        }
                    }
                })
                .catch((_) => {
                    // error
                });
        }
    }, 300000);

    return () =>
        keycloak.init({
            config: {
                url: environment.keyCloakServiceURL,
                realm: environment.keyCloakRealm,
                clientId: environment.keyCloakClientId,

            },
            bearerExcludedUrls: environment.keyCloakBearerExcludedUrls,
            initOptions: {
                onLoad: 'login-required',
                silentCheckSsoRedirectUri:
                    window.location.origin + '/assets/silent-check-sso.html',
                responseMode: 'fragment'
            },
        });
}


