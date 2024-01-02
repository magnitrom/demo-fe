import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServicio {
  headersConfig!: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headersConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
  }

  getServicios(): Observable<any> {
    const url = `${environment.urlApiServicios}/api/obtenerServicios`;
    return this.http.get<any>(url, { headers: this.headersConfig });
  }
}