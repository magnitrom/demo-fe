import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private urlServidor = `${environment.URL_COMUN_A_MICROSERVICIOS}/oauthsiretcat/api/admCatalogos/refCodes/getCatalogoByNombre/SIRET_TIPO_ROLES`;


  constructor(private http: HttpClient) { }

  obtenerRoles(): Observable<any> {
    const resp = this.http.get(this.urlServidor);
    return resp;
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
