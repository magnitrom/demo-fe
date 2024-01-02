/**
 * Tipo:
 * ARCHIVO DE CONFIGURACION DE RUTAS
 *
 * Descripción:
 * En este archivo se configura la ruta de cada elemento (componente de tipo pagina) con la cual sera
 * invocado desde su DOM, en dado caso necesite certificar rutas los puede hacer mediante CanActive
 * https://angular.io/api/router/CanActivate
 **/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConsultaServiciosComponent } from './pages/consulta-servicios/consulta-servicios.component';
import { InformesComponent } from './pages/informes/informes.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ParametrosComponent } from './pages/parametros/parametros.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CreacionTgrPrevisualizacionComponent } from './pages/creacion-tgr-previsualizacion/creacion-tgr-previsualizacion.component';
import { ConsultaTgrComponent } from './pages/consulta-tgr/consulta-tgr.component';
import { CierreDiarioComponent } from './pages/cierre-diario/cierre-diario.component';
import { BitacoraAccesoComponent } from './pages/bitacora-acceso/bitacora-acceso.component';
import { ListadoParametrosComponent } from './pages/listado-parametros/listado-parametros.component';
import { BitacoraAccesoInsComponent } from './pages/bitacora-acceso-ins/bitacora-acceso-ins.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './utils/autoGuard';
import { SolDevolucionComponent } from './pages/sol-devolucion/sol-devolucion.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'parametros',
    component: ParametrosComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'listado-parametros',
    component: ListadoParametrosComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'informes/:tipo',
    component: InformesComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'informes',
    component: InformesComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'roles',
    component: RolesComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'consulta-servicios',
    component: ConsultaServiciosComponent,
    // canActivate: [AuthGuard],
    data: { roles: environment.rolesPermitidosEnSistema }
  },
  {
    path: 'creacion-tgr-previsualizacion/:numeroTgr/:documento/:estado',
    component: CreacionTgrPrevisualizacionComponent,
  },
  {
    path: 'consulta-tgr/:numeroTgr/:documento/:estado',
    component: ConsultaTgrComponent,
  },
  {
    path: 'cierre-diario',
    component: CierreDiarioComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'bitacora-acceso',
    component: BitacoraAccesoComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'bitacora-acceso-ins',
    component: BitacoraAccesoInsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'sol-devolucion',
    component: SolDevolucionComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
