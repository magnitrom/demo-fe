import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


/* Una abreviatura para registrar el servicio en el inyector raíz. */
@Injectable({
  providedIn: 'root'
})
/* Es un servicio que realiza llamadas a una API. */
export class ApiInformesService {

  constructor(private http: HttpClient) { }

  informesTgrs(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlApiInformes + '/api/informacionTgrs';
    return this.http.post<any[]>(url, body, options);
  }

  /**
 * Es una solicitud POST que envía un objeto JSON a un servidor y recibe un objeto JSON a cambio
   * @param {any} body - any
   * @returns Una matriz de objetos.
   */
  informesConsolidadoInstitucion(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlApiInformes + '/api/informacionConsolidadoInstitucion';
    return this.http.post<any[]>(url, body, options);
  }

  /**
 * Es una solicitud POST que envía un objeto JSON a un servidor y recibe un objeto JSON a cambio
   * @param {any} body - any
   * @returns Una matriz de objetos.
   */
  informesConsolidadoOrigenCreacion(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlApiInformes + '/api/TgrsPagadosPorBanco';
    return this.http.post<any[]>(url, body, options);
  }

  informesCajaInstitucional(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlApiInformes + '/api/informacionConsolidadoCaja';
    return this.http.post<any[]>(url, body, options);
  }

  consultaTgrsPorCaja(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlApiInformes + '/api/consultaTgrsPorCaja';
    return this.http.post<any[]>(url, body, options);
  }

  //#region informes Reversion TGR
  informesReversionTGR(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlApiReversionTgr + '/api/obtenerSolicitudes';
    return this.http.post<any[]>(url, body, options);
  }

  informesDetalleReversion(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlApiReversionTgr + '/api/consultaReversionTGR';
    return this.http.post<any[]>(url, body, options);
  }

  informesAprobarRevision(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlApiReversionTgr + '/api/aprobarSolicitud';
    return this.http.post<any[]>(url, body, options);
  }

  informesRechazarRevision(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlApiReversionTgr + '/api/rechazarSolicitud';
    return this.http.post<any[]>(url, body, options);
  }

  obtenerServiciosTgr(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = { headers: headers };
    let url = environment.urlApiInformes + '/api/obtenerServiciosTgr';
    return this.http.post<any[]>(url, body, options);
  }


  consultarBitacoraTGR(body: any): Observable<any> {
    const headersConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    const url = `${environment.urlApiComprobantes}/api/consultaBitacoraTgr`;
    return this.http.post<any>(url, body, { headers: headersConfig });
  }

  bajaTGR(body: any): Observable<any> {
    const headersConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    const url = `${environment.urlApiComprobantes}/api/bajaTgr`;
    return this.http.post<any>(url, body, { headers: headersConfig });
  }


  consultaCajasPorInstitucion(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = { headers: headers };
    let url = environment.urlApiInformes + '/api/consultaCajasPorInstitucion';
    return this.http.post<any[]>(url, body, options);
  }


  //endregion

}
