import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import Swal from 'sweetalert2';
import { AuthApiService } from '../services/auth-api.service';

declare let $: any;

@Injectable({
    providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(protected readonly router: Router, protected readonly keycloak: KeycloakService, private authApiService: AuthApiService) {
        super(router, keycloak);
    }

    public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true;
        if (!this.authenticated) {
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url
            });
        }

        // Get the roles required from the route.
        let requiredRoles: any[] = [];

        try {
            const response = await this.authApiService.obtenerRoles().toPromise();
            if (response.data)
                requiredRoles = response.data.map((obj: { valor: any; }) => obj.valor);
        } catch (error) {
            return false;
        }

        const hasMatch = requiredRoles.some(elem1 => this.roles.some(elem2 => elem1 === elem2));

        const rolesComunes = requiredRoles.filter(elemento => this.roles.includes(elemento));

        sessionStorage.setItem("rComunes", JSON.stringify(rolesComunes));

        if (!hasMatch) {
            Swal.fire({
                title: 'Atención',
                text: 'Los sentimos, su perfil no tiene acceso a este sistema.',
                icon: 'info',
                showCancelButton: false,
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#3085d6',
                timer: 5000 // Tiempo en milisegundos
            }).then(() => {
                this.keycloak.logout();
                sessionStorage.removeItem('vecesLoggeado');
            });
        }
        else {
            $(document).ready(function () {
                $('.sefin-sidenav').sidenav();
                $('.collapsible').collapsible();
                $('select').formSelect();
                $('.tooltipped').tooltip();
            });
        }
        return hasMatch;
    }

}