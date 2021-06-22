import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMostService {
  private url ='/api/users';
  constructor(private http: HttpClient) { }

  getEnfe():Observable<any>{
    return this.http.get(this.url+'/getNurses',{observe:"response"});
  }
}
