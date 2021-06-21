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

  dwnDoot(cuerpo: any){
    
    return this.http.post(this.url+'/obtener', cuerpo, {observe: 'response'});
  }
}
