import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Respuesta } from '../models/respuesta.model';
import { BitacoraAcceso, BitacoraAccesoIns } from '../models/bitacora-acceso.model';

@Injectable({
  providedIn: 'root'
})
export class ApiAutUsrService {
  private httpHeaders!: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
  }

  obtenerBitacora(body: any): Observable<Respuesta<BitacoraAcceso[]>> {
    const url = environment.urlAutUsr + '/api/obtenerBitacoraPortalAdmin';
    return this.http.post<Respuesta<BitacoraAcceso[]>>(url, body, { headers: this.httpHeaders });
  }
  
  obtenerBitacoraIns(body: any): Observable<Respuesta<BitacoraAccesoIns[]>> {
    const url = environment.urlAutUsr + '/api/obtenerBitacoraPortalIns';
    return this.http.post<Respuesta<BitacoraAccesoIns[]>>(url, body, { headers: this.httpHeaders });
  }

  registrarIngreso(body: any): Observable<Respuesta<null>> {
    const url = environment.urlAutUsr + '/api/registrarIngresoPortalAdmin';
    return this.http.post<Respuesta<null>>(url, body, { headers: this.httpHeaders });
  }
}
