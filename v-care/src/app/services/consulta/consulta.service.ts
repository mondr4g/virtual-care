import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignRecived } from './models/ISignRecived';
import { ISignSend } from './models/ISignSend';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url ='/api/consulta';

  constructor(private http: HttpClient) { }

  getSigns():Observable<any>{
    return this.http.get(this.url+'/getSigns');
  }

  setSigns(signos: ISignSend):Observable<any>{
    return this.http.post(this.url+'/setSigns', {signos}, {observe: 'response'})
  }
}
