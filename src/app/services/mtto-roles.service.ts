import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
/* Funcion que le dice a Angular que este servicio debe ser creado por el inyector de la aplicación raíz. */
@Injectable({
  providedIn: 'root'
})
/* 
Es un servicio que realiza solicitudes http a una API de backend. */

export class MttoRolesService {

  constructor(private http: HttpClient) { }

  getALLRecords(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    
    let url = environment.apiUsuarios+'api/rol/registros';
    return this.http.get<any>(url, options);
  }

  insertRecord(body:any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    let url = environment.apiUsuarios+'api/rol/insertar';

    return this.http.post(url, body, options);
  }

  updateRecord(body:any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    let url = environment.apiUsuarios+'api/rol/actualizar';

    return this.http.post(url, body, options);
  }

  deleteRecord(id:any, usuario:any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
                                  });

    let options = {headers:headers};
    let url = environment.apiUsuarios+'api/rol/eliminar?id='+id+'&usuario='+usuario;

    return this.http.delete(url, options);
  }


}
