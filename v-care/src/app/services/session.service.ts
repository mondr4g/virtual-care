import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBody } from '../login/bodyIntf';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  url='/api/auth';
  constructor(private http: HttpClient) {

  }

  login(cuerpo: IBody){
    
    return this.http.post(this.url+'/signin', cuerpo);
  }
}
