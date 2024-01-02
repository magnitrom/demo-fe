import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaTgrServiceService {

  constructor(private http: HttpClient) { }

  consultaTGR(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = { headers: headers };
    let url = environment.urlApiComprobantes+'/api/consultaEstadoTGR';
    return this.http.post<any[]>(url, body, options);
  }

  consultaDetalleTGR(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = { headers: headers };
    let url = environment.urlApiComprobantes+'/api/consultaDetalleTGR';
    return this.http.post<any[]>(url, body, options);
  }

}
