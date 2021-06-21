import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GivheadInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('auth-token');
    
    if(token){
      const  clonedRequest = req.clone({ headers: req.headers.append('auth-token',token) });
      return next.handle(clonedRequest);
    }else{
      return next.handle(req);
    }
  }
}
