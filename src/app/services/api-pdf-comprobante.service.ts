import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPdfComprobanteService {

  constructor(private http: HttpClient) { }

  getPdf(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.urlApiPdfComprobante + '/api/generarComprobante';

    return this.http.post(url, body, options);
  }

}
