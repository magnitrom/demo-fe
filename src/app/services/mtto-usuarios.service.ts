import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
/* Funcion que le dice a Angular que este servicio debe ser creado por el inyector de la aplicación raíz. */
@Injectable({
  providedIn: 'root'
})

/* Es una clase que contiene métodos que realizan solicitudes http a una API web. */

export class MttoUsuariosService {

  constructor(private http: HttpClient) { }

  getALLRecords(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    
    let url = environment.apiUsuarios+'api/usr/registros';
    return this.http.get<any>(url, options);
  }

  insertRecord(body:any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    let url = environment.apiUsuarios+'api/usr/insertar';

    return this.http.post(url, body, options);
  }

  updateRecord(body:any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    let url = environment.apiUsuarios+'api/usr/actualizar';

    return this.http.post(url, body, options);
  }

  userUnlock(body:any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    let url = environment.apiUsuarios+'api/usr/desbloquear';

    return this.http.post(url, body, options);
  }

  deleteRecord(id:any, usuario:any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    let url = environment.apiUsuarios+'api/usr/eliminar?id='+id+'&usuario='+usuario;

    return this.http.delete(url, options);
  }

  changeInfo(body:any): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    let url = environment.apiUsuarios+'api/usr/cambioClave';

    return this.http.post(url, body, options);
  }

}
