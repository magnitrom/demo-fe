import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiSolDevolucionService {

  headersConfig!: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headersConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
  }

  getSolicitudes(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlDevolucion + '/api/obtenerSolicitudes';
    return this.http.post<any[]>(url, body, options);
  }

}