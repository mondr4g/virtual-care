import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMostService {
  private url ='/api/users';
  constructor(private http: HttpClient) { }

  getEnfe():Observable<any>{
    return this.http.get(this.url+'/getNurseInfo',{observe:"response"});
  }

  getAllofEnf(id: string):Observable<any>{
    const params =new HttpParams().set("id",id);
    return this.http.get(this.url+'/getNurses',{observe: 'response',params});
  }

  updateEnf(data:any):Observable<any>{
    return this.http.post(this.url+'/upEnfe',data,{observe: 'response'});
  }

  elimEnf(id: number):Observable<any>{
    const params =new HttpParams().set("id",id.toString());
    return this.http.get(this.url+'/delNurse',{observe: 'response',params});
  }
}
