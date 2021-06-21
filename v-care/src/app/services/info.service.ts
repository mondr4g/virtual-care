import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  url='/api/info';
  constructor(private http: HttpClient) {

  }

  upDoot(cuerpo: any){
    
    return this.http.post(this.url+'/subir', cuerpo, {observe: 'response'});
  }

  dwnDoot(cuerpo: number){
    var token = localStorage.getItem("auth-token");
    if(token){
      return this.http.post(this.url+'/obtener',{idpersonal: cuerpo}, {observe: 'response'});
    }else{
      return this.http.post(this.url+'/obtener',{idpersonal: cuerpo}, {observe: 'response'});
    }
  }
}
