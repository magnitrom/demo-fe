import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiInteroperabilidadService {
  private httpHeaders!: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
  }

  obtenerValorParametro(nombreParametro: any): Observable<any> {
    const url = environment.urlInteroperabilidad + `/api/inop/parametros/getParametro?nombreParametro=${nombreParametro}&idCategoria=1`;
    return this.http.get(url, { headers: this.httpHeaders });
  }

  obtenerClasificador(nombreClasificador: string, gestion: number | string, idCategoria?: number | string): Observable<any> {
    const url = environment.urlInteroperabilidad + `/api/inop/clasificadores/getClasificador?nombreClasificador=${nombreClasificador}&idCategoria=${idCategoria ?? 1}&gestion=${gestion}`;
    return this.http.get(url, { headers: this.httpHeaders });
  }
}
