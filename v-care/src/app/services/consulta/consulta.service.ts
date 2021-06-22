import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignRecived } from './models/ISignRecived';
import { ISignSend } from './models/ISignSend';
import { INewCons } from './models/INewCons';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url ='/api/consulta';

  constructor(private http: HttpClient) { }

  //Operaciones de los signos visuales
  getSigns():Observable<any>{
    return this.http.get(this.url+'/getSigns');
  }
  setSigns(signos: ISignSend):Observable<any>{
    return this.http.post(this.url+'/setSigns', {signos}, {observe: 'response'})
  }

  //Nueva peticion de consulta
  newPeticion(datos: INewCons):Observable<any>{
    let aux = {
      idDoctor: datos.idDoctor,
      idPaciente: datos.idPaciente,
      idEnfermera: datos.idEnfermera,
      idvllamada: datos.idvllamada,
      anotaciones: datos.anotaciones,
      sintomas: datos.sintomas,
      aceptada: datos.aceptada,
      rechazada: datos.rechazada
    }
    return this.http.post(this.url+'/newCons', {"infoConsulta":aux,"espe":datos.especialidad}, {observe: "response"});
  }
  //obtener signos de la consulta por el doc
  getSignsDocSide(id: number):Observable<any>{
    const params =new HttpParams().set("id", String(id));
    return this.http.get(this.url+'/getSignsDoctor',{params})
  }

  //revisar validez de consulta
  revisarConsulta(id: number):Observable<any>{
    const params =new HttpParams().set("id", String(id));
    return this.http.get(this.url+'/revizarCons',{params});
  }

  //confirmar consulta
  confirmConsulta(id: number):Observable<any>{
    //console.log(this.url+'/getConsByMed?Id='+id);
    const params =new HttpParams().set("id", String(id));
    return this.http.get(this.url+'/confirmCons',{params});
    //Aqui se desencadena la info de la consulta
  }

  //Rechazar

  //Obtener consultas por medico
  getConsByMed(id:number):Observable<any>{
    console.log(this.url+'/getConsByMed?Id='+id);
    const params =new HttpParams().set("Id", String(id));
    return this.http.get(this.url+'/getConsByMed',{params});
  }

  //obtener consulta info


}