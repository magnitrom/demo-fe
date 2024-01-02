import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/* Funcion que le dice a Angular que este servicio debe ser creado por el inyector de la aplicación raíz. */

@Injectable({
  providedIn: 'root'
})

/* Esta clase se utiliza para realizar solicitudes HTTP a la API. */
export class MttoParametrosService {

  constructor(private http: HttpClient) { }

  getALLRecords(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };

    let url = environment.apiParametros + 'api/registros';
    return this.http.get<any>(url, options);
  }


  insertRecord(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.apiParametros + 'api/insertar';

    return this.http.post(url, body, options);
  }

  updateRecord(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.apiParametros + 'api/actualizar';

    return this.http.post(url, body, options);
  }

  deleteRecord(id: any, usuario: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.apiParametros + 'api/eliminar?id=' + id + '&usuario=' + usuario;

    return this.http.delete(url, options);
  }

  obtener(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.apiParametros + 'api/obtenerParametros';

    return this.http.get(url, options);
  }

  cambiarEstado(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.apiParametros + 'api/cambiarEstadoParametro';

    return this.http.post(url, body, options);
  }

  modificar(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.apiParametros + 'api/modificarParametro';

    return this.http.post(url, body, options);
  }

  registrar(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.apiParametros + 'api/registrarNuevoParametro';

    return this.http.post(url, body, options);
  }

  aprobar(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.apiParametros + 'api/aprobarParametro';

    return this.http.post(url, body, options);
  }

  obtenerValorParametro(nombreParametro: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let options = { headers: headers };
    let url = environment.apiParametros + 'api/obtenerValorParametro';
    return this.http.post<any[]>(url, { nombreParametro }, options);
  }

}
