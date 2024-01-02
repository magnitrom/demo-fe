/**
 * Tipo:
 * SERVICES
 *
 * Descripción:
 * Demo de peticiones http haciendo uso del HttpClient de angular y de la api https://jsonplaceholder.typicode.com
 **/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PostModel } from '../models/post.model';
import { UserModel } from '../models/user.model';
import { handleError } from '../utils/handleErrosHttp';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //ruta del server, este se puede complementar de una variable de ambiente
  urlServidor = 'https://jsonplaceholder.typicode.com';

  //Implementacion de clase HttpClient para peticiones
  constructor(private http: HttpClient) { }

  //metodo GET para obenter de manera basica un array de POSTS de noticias desplegados en JSON placeholder
  getList<T>(url: string) {
    return this.http
      .get<T>(`${environment.API_URL}/${url}`)
      .pipe(retry(1), catchError(handleError));
  }

  //metodo GET para obenter de manera basica un array de POSTS de noticias desplegados en JSON placeholder
  getPosts(): Observable<PostModel[]> {
    let url = this.urlServidor + '/posts';
    return this.http
      .get<PostModel[]>(url)
      .pipe(retry(1), catchError(handleError));
  }

  //metodo GET para obenter de manera basica un array de USERS desplegados en JSON placeholder
  getUsers(): Observable<UserModel[]> {
    let url = this.urlServidor + '/users';
    return this.http.get<UserModel[]>(url);
  }
/**
 * Toma como parámetro un mensaje de error, verifica si hay un registro de error en el almacenamiento de la sesión, si
 * no hay, crea uno, luego envia el mensaje de error y la fecha y hora actual al
 * registro de errores, y finalmente devuelve el registro de errores.
 * </código>
 * @param {any} mensaje de error - any
 * @returns Una matriz de objetos.
 */

  obtenerBitacoraError(errorMessage: any) {
    let errorLog: any[] = JSON.parse(sessionStorage.getItem('errorLog')!);

    if (!errorLog) {
      errorLog = [];
    }
    const date = new Date(Date.now());
    errorLog.push({
      "errorMessage": errorMessage,
      "timestamp": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    });
    sessionStorage.setItem('errorLog', JSON.stringify(errorLog));
    return errorLog;
  }


  getMessageError(nombreStorage: string) {
    let errorLog: any[] = JSON.parse(sessionStorage.getItem('errorLog')!);

    if (!errorLog) {
      errorLog = [];
      sessionStorage.setItem('errorLog', JSON.stringify(errorLog));
    }
    return JSON.parse(sessionStorage.getItem(nombreStorage)!);
  }
  setMessageError(newMessage: string): void {
    let errorLog: any[] = JSON.parse(sessionStorage.getItem('errorLog')!);
    if (!errorLog) {
      errorLog = [];
    }
    const date = new Date(Date.now());
    errorLog.push({
      "errorMessage": newMessage,
      "timestamp": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    });
    sessionStorage.setItem('errorLog', JSON.stringify(errorLog));
  }

 


}
