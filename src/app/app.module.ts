import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NavbarComponent } from './components/molecules/navbar/navbar.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FooterComponent } from './components/molecules/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { SiNoComponent } from './components/atoms/si-no/si-no.component';
import { SefinInputComponent } from './components/atoms/sefin-input/sefin-input.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SefinMenubarComponent } from './components/npm/sefin-menubar/sefin-menubar.component';
import { SefinNavbarComponent } from './components/npm/sefin-menubar/sefin-navbar/sefin-navbar.component';
import { SefinAvatarbarComponent } from './components/npm/sefin-menubar/sefin-avatarbar/sefin-avatarbar.component';
import { SefinSidenavComponent } from './components/npm/sefin-menubar/sefin-sidenav/sefin-sidenav.component';
import { SefinDatatableComponent } from './components/npm/sefin-datatable/sefin-datatable.component';
import { SefinFaqsComponent } from './components/npm/sefin-faqs/sefin-faqs.component';
import { SefinChatComponent } from './components/npm/sefin-chat/sefin-chat.component';
import { SefinGraficoLinealComponent } from './components/npm/sefin-grafico-lineal/sefin-grafico-lineal.component';
import { SefinGraficoBarraHComponent } from './components/npm/sefin-grafico-barra-h/sefin-grafico-barra-h.component';
import { SefinGraficoBarraVComponent } from './components/npm/sefin-grafico-barra-v/sefin-grafico-barra-v.component';
import { SefinGraficoBarraV2Component } from './components/npm/sefin-grafico-barra-v2/sefin-grafico-barra-v2.component';
import { SefinGraficoPastelComponent } from './components/npm/sefin-grafico-pastel/sefin-grafico-pastel.component';
import { SefinFooterComponent } from './components/npm/sefin-footer/sefin-footer.component';
import { SefinPreloaderComponent } from './components/npm/sefin-preloader/sefin-preloader.component';
import { DemoApiService } from './services/demo-api.service';

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { SsoService } from './services/sso.service';
import { initializeKeycloak } from './utils/keyCloakConfig';
import { ParametrosComponent } from './pages/parametros/parametros.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { InformesComponent } from './pages/informes/informes.component';
import { FormParametrosComponent } from './pages/form-parametros/form-parametros.component';
import { FormUsuariosComponent } from './pages/form-usuarios/form-usuarios.component';
import { RolesComponent } from './pages/roles/roles.component';
import { FormRolesComponent } from './pages/form-roles/form-roles.component';
import { FormCambioClaveComponent } from './pages/form-cambio-clave/form-cambio-clave.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ConsultaServiciosComponent } from './pages/consulta-servicios/consulta-servicios.component';
import { InterceptorAppService } from './services/interceptor-app-service.service';
import { SeguridadApiService } from './services/seguridad-api.service';
import { AuthApiService } from './services/auth-api.service';
import { ApiPdfComprobanteService } from './services/api-pdf-comprobante.service';
import { CreacionTgrPrevisualizacionComponent } from './pages/creacion-tgr-previsualizacion/creacion-tgr-previsualizacion.component';
import { SafePipe } from './pipes/safe.pipe';
import { ConsultaTgrServiceService } from './services/consulta-tgr-service.service';
import { ConsultaTgrComponent } from './pages/consulta-tgr/consulta-tgr.component';
import { RelojComponent } from './components/molecules/reloj/reloj.component';
import { InstitucionFilterPipe } from './pipes/institucion-filter.pipe';
import { DetalleFondosPropiosComponent } from './pages/detalleInformes/detalle-fondos-propios/detalle-fondos-propios.component';
import { OrigenPagoPipe } from './pipes/origen-pago.pipe';
import { CanalPagoPipe } from './pipes/canal-pago.pipe';
import { InstitucionFilterCajaPipe } from './pipes/institucion-filter-caja.pipe';
import { CajaFilterPipe } from './pipes/caja-filter.pipe';
import { DetalleReversionComponent } from './pages/detalleInformes/detalle-reversion/detalle-reversion.component';
import { DetalleTGRSComponent } from './components/modals/detalle-tgrs/detalle-tgrs.component';

import localeEsHN from '@angular/common/locales/es-HN';
import { CierreDiarioComponent } from './pages/cierre-diario/cierre-diario.component';
import { CierreDiarioBancarioComponent } from './pages/cierre-diario-bancario/cierre-diario-bancario.component';
import { BancoPipe } from './pipes/banco-seleccionado.pipe';
import { DetalleCierreComponent } from './pages/detalle-cierre/detalle-cierre.component';
import { GeneradorPdfService } from './services/generador-pdf.service';
import { BitacoraAccesoComponent } from './pages/bitacora-acceso/bitacora-acceso.component';
import { ListadoParametrosComponent } from './pages/listado-parametros/listado-parametros.component';
import { BitacoraAccesoInsComponent } from './pages/bitacora-acceso-ins/bitacora-acceso-ins.component';
import { FiltroPorCampoPipe } from './pipes/filtro-por-campo.pipe';
import { CierreDiarioInstitucionalComponent } from './pages/cierre-diario-institucional/cierre-diario-institucional.component';
import { DetalleCierreInstitucionalComponent } from './pages/detalle-cierre-institucional/detalle-cierre-institucional.component';
import { HomeComponent } from './pages/home/home.component';
import { SolDevolucionComponent } from './pages/sol-devolucion/sol-devolucion.component';
registerLocaleData(localeEsHN);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    FilterPipe,
    FiltroPorCampoPipe,
    FooterComponent,
    SafePipe,
    SiNoComponent,

    SefinInputComponent,

    NotFoundComponent,

    SefinMenubarComponent,
    SefinNavbarComponent,
    SefinSidenavComponent,
    SefinAvatarbarComponent,
    SefinDatatableComponent,

    SefinFaqsComponent,
    SefinChatComponent,
    SefinGraficoLinealComponent,
    SefinGraficoBarraHComponent,
    SefinGraficoBarraVComponent,
    SefinGraficoBarraV2Component,
    SefinGraficoPastelComponent,

    SefinFooterComponent,
    SefinPreloaderComponent,
    ParametrosComponent,
    UsuariosComponent,
    InformesComponent,
    FormParametrosComponent,
    FormUsuariosComponent,
    RolesComponent,
    FormRolesComponent,
    FormCambioClaveComponent,
    ConsultaServiciosComponent,
    CreacionTgrPrevisualizacionComponent,
    ConsultaTgrComponent,
    RelojComponent,
    InstitucionFilterPipe,
    DetalleFondosPropiosComponent,
    OrigenPagoPipe,
    CanalPagoPipe,
    InstitucionFilterCajaPipe,
    CajaFilterPipe,
    DetalleReversionComponent,
    DetalleTGRSComponent,
    CierreDiarioComponent,
    CierreDiarioBancarioComponent,
    BancoPipe,
    DetalleCierreComponent,
    BitacoraAccesoComponent,
    ListadoParametrosComponent,
    BitacoraAccesoInsComponent,
    CierreDiarioInstitucionalComponent,
    DetalleCierreInstitucionalComponent,
    HomeComponent,
    SolDevolucionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    KeycloakAngularModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    ApiService,
    DemoApiService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService, SeguridadApiService],
    // },
    SsoService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorAppService,
      multi: true
    },
    SeguridadApiService,
    AuthApiService,
    ApiPdfComprobanteService,
    ConsultaTgrServiceService,
    CanalPagoPipe,
    OrigenPagoPipe,
    BancoPipe,
    FilterPipe,
    FiltroPorCampoPipe,
    GeneradorPdfService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
