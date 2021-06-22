import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAddress } from './models/userAddress';
import { UserPersonal } from './models/userPersonal';
import { UserNormal } from './models/userNormal';
import { UserDoctor } from './models/userDoctor';
import { IEsp } from './models/IEsp';
import { IMedUnit } from './models/IMedUnit';
import { UserNurse } from './models/userNurse';

@Injectable({
  providedIn: 'root'
})
export class RegistService {
  private urlAdmin = '/api/adminis';
  private urlRegist = '/api/regist';

  constructor(private http: HttpClient) { }

  newDoc(address: UserAddress, personal: UserPersonal, normal: UserNormal, doctor: UserDoctor, esp: IEsp):Observable<any>{
    return this.http.post(this.urlRegist+'/doctor', 
    {
      "userPersonal":personal,
      "userAddress":address,
      "userNormal":normal,
      "userDoctor": doctor,
      "especialidad": esp 
    }, {observe: 'response'});
  }

  
  newNurse(address: UserAddress, personal: UserPersonal, normal: UserNormal, nurse: UserNurse, unid: IMedUnit):Observable<any>{
    return this.http.post(this.urlRegist+'/nurse', 
    {
      "userPersonal":personal,
      "userAddress":address,
      "userNormal":normal,
      "userNurse": nurse,
      "unitInfo": unid 
    }, {observe: 'response'});
  }

  
  newPacient(address: UserAddress, normal: UserNormal, unid: IMedUnit):Observable<any>{
    return this.http.post(this.urlRegist+'/pacient', 
    {
      "userAddress":address,
      "userNormal":normal,
      "unitInfo": unid 
    }, {observe: 'response'});
  }

  
  newStaff(personal: UserPersonal, unid: IMedUnit):Observable<any>{
    return this.http.post(this.urlRegist+'/staff', 
    {
      "userPersonal":personal,
      "unitInfo": unid 
    }, {observe: 'response'}); 
  }

  
  newUnit(address: UserAddress):Observable<any>{
    return this.http.post(this.urlAdmin+'/newUnit', 
    {
      "userAddress":address 
    }, {observe: 'response'});
  }

  getEsp():Observable<any>{
    return this.http.get(this.urlAdmin + '/getEspes', {observe:"response"});
  }

  getUnits():Observable<any>{
    return this.http.get(this.urlAdmin + '/getUnits', {observe:"response"});
  }
}
