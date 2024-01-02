import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
/* Funcion que se utiliza para definir los metadatos del componente.. */
@Injectable({
  providedIn: 'root'
})

/* Es un servicio que realiza una llamada a una API para obtener un token. */
export class SeguridadApiService {

  constructor(private http: HttpClient) { }

  getAuthToken(_idAplicacion: string): Observable<any> {
    let headers = new HttpHeaders({
  
      'sfn_hdr_z04': atob(environment.valueRequired)
    });
    let options = { headers: headers };
    let url = environment.tokenUrl + _idAplicacion;
    return this.http.get(url, options);
  }
}

