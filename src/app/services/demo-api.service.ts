/**
 * Tipo:
 * SERVICES
 *
 * Descripción:
 * Demo de peticiones http haciendo uso del HttpClient de angular
 **/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { handleError } from '../utils/handleErrosHttp';

@Injectable({
  providedIn: 'root',
})
export class DemoApiService {
  //varaible para colocar url de servidor al que se haran las peticiones http
  private urlServidor = ``;

  //Implementacion de clase HttpClient para peticiones
  constructor(private http: HttpClient) {}

  //Metodo de tipo GET con configuracion de headers, en dado caso no utilice header
  //puede omitir  .get<any>(url, options) por .get<any>(url)
  getAll(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: sessionStorage.get('jwt'),
    });
    let options = { headers: headers };
    let url = this.urlServidor + `/all`;
    return this.http
      .get<any>(url, options)
      .pipe(retry(1), catchError(handleError));
  }

  //Metodo de tipo GET con configuracion de headers, en dado caso no utilice header
  //puede omitir  .post<any[]>(url, body, options) por .post<any[]>(url, body)
  post(body: any): Observable<any[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: sessionStorage.get('jwt'),
    });
    let options = { headers: headers };
    let url = this.urlServidor;
    return this.http
      .post<any[]>(url, body, options)
      .pipe(retry(1), catchError(handleError));
  }

  //Metodo de tipo GET con configuracion de headers, en dado caso no utilice header
  //puede omitir  .put<any[]>(url, body, options) por .put<any[]>(url, body)
  put(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: sessionStorage.get('jwt'),
    });
    let options = { headers: headers };
    let url = this.urlServidor;
    return this.http
      .put<any>(url, body, options)
      .pipe(retry(1), catchError(handleError));
  }

  //Metodo de tipo GET con configuracion de headers, en dado caso no utilice header
  //puede omitir  .delete<any>(url, options) por .delete<any>(url)
  delete(id: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: sessionStorage.get('jwt'),
    });
    let options = { headers: headers };
    let url = this.urlServidor + `?codigo=${id}`;
    return this.http
      .delete<any>(url, options)
      .pipe(retry(1), catchError(handleError));
  }

  //catch de errores http, este metodo imprime en consola errores de peticion
  //con el fin de documentar en consola el proceso de peticiones en caso de error
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
