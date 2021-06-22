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
  getDoco():Observable<any>{
    return this.http.get(this.url+'/getDoctorInfo',{observe:"response"});
  }
  getAyu():Observable<any>{
    return this.http.get(this.url+'/getHelperInfo',{observe:"response"});
  }

  getAllofEnf(id: string):Observable<any>{
    const params =new HttpParams().set("id",id);
    return this.http.get(this.url+'/getNurses',{observe: 'response',params});
  }
  getAllofDoc(id: string):Observable<any>{
    const params =new HttpParams().set("id",id);
    return this.http.get(this.url+'/getDoctors',{observe: 'response',params});
  }
  getAllofAyu(id: string):Observable<any>{
    const params =new HttpParams().set("id",id);
    return this.http.get(this.url+'/getHelpers',{observe: 'response',params});
  }

  updateEnf(data:any):Observable<any>{
    return this.http.post(this.url+'/upEnfe',data,{observe: 'response'});
  }
  updateDoc(data:any):Observable<any>{
    return this.http.post(this.url+'/upDoc',data,{observe: 'response'});
  }
  updateAyud(data:any):Observable<any>{
    return this.http.post(this.url+'/upDoc',data,{observe: 'response'});
  }

  elimEnf(id: number):Observable<any>{
    const params =new HttpParams().set("id",id.toString());
    return this.http.get(this.url+'/delNurse',{observe: 'response',params});
  }
  elimAyu(id: number):Observable<any>{
    const params =new HttpParams().set("id",id.toString());
    return this.http.get(this.url+'/delNurse',{observe: 'response',params});
  }
}
