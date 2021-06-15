import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBody } from '../login/bodyIntf';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  url='http://localhost:3000/api/auth';
  constructor(private http: HttpClient) {

  }

  login(cuerpo: IBody){
    
    return this.http.post(this.url+'/signin', cuerpo, {observe: 'response'});
  }
}
