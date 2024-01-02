import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/* Funcion que se utiliza para definir los metadatos del componente.. */
@Injectable({
  providedIn: 'root'
})

/* Es un interceptor que verifica si la url de la solicitud está en la matriz environment.urlsTokenApp, si
es decir, agrega el token al encabezado de la solicitud. */
export class InterceptorAppService implements HttpInterceptor {

  constructor() {
    // constructor
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (let d of environment.urlsTokenApp) {
      for (let u of d.urls) {
        if (req.url.includes(u)) {
          let tok: any = sessionStorage.getItem(btoa(d.idAplicacion));
          req.clone().headers.delete;
          const reqClone = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + tok).append("Content-Type", "application/json")
          });
          return next.handle(reqClone);
        }
      }
    }
    return next.handle(req);
  }
}
