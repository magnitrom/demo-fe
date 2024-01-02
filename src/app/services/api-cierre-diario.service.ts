import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CierreDiarioBancario } from '../models/cierre-diario-bancario.model';
import { Respuesta } from '../models/respuesta.model';
import { DetallesCierre } from '../models/detalles-cierre.model';
import { BitacoraCierreDiario } from '../models/bitacora-cierre-diario.model';
import { CierreDiarioCaja, DetalleArchivoCierreCajas } from '../models/cierre-diario-caja.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCierreDiarioService {
  private httpHeaders!: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
  }

  obtenerArchivosCierreBancos(body: any): Observable<Respuesta<CierreDiarioBancario[]>> {
    const url = environment.urlCierreDiario + '/api/obtenerArchivosCierreBancos';
    return this.http.post<Respuesta<CierreDiarioBancario[]>>(url, body, { headers: this.httpHeaders });
  }

  obtenerDetalleCierreBanco(body: any): Observable<Respuesta<DetallesCierre[]>> {
    const url = environment.urlCierreDiario + '/api/obtenerDetalleArchivoCierreBancos';
    return this.http.post<Respuesta<DetallesCierre[]>>(url, body, { headers: this.httpHeaders });
  }

  obtenerBitacora(body: any): Observable<Respuesta<BitacoraCierreDiario[]>> {
    const url = environment.urlCierreDiario + '/api/obtenerBitacoraArchivoCierreBanco';
    return this.http.post<Respuesta<BitacoraCierreDiario[]>>(url, body, { headers: this.httpHeaders });
  }

  obtenerArchivosCierresCajas(body: any): Observable<Respuesta<CierreDiarioCaja[]>> {
    const url = environment.urlCierreDiario + '/api/obtenerArchivosCierreCajas';
    return this.http.post<Respuesta<CierreDiarioCaja[]>>(url, body, { headers: this.httpHeaders });
  }

  obtenerDetalleCierreCaja(body: any): Observable<Respuesta<DetalleArchivoCierreCajas[]>> {
    const url = environment.urlCierreDiario + '/api/obtenerDetalleArchivoCierreCajas';
    return this.http.post<Respuesta<DetalleArchivoCierreCajas[]>>(url, body, { headers: this.httpHeaders });
  }
}
