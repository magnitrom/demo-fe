import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
/* funcion que le dice a Angular que este servicio debe ser creado por el inyector de la aplicación raíz. */
@Injectable({
  providedIn: 'root'
})

/* Es un servicio que realiza una solicitud POST a una API REST. */
export class ClasificadoresInteroperabilidadService {
 
  constructor(private http: HttpClient) { }

  obtenerRegistros(body: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let url = environment.urlClasificadoresVirtuales+'/api/clas/inop/interoperabilidad/registro';
    return this.http.post<any[]>(url, body, options);
  }

}
