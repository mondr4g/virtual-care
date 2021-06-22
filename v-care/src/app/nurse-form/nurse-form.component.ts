import { Component, OnInit } from '@angular/core';
import { IMedUniShow } from '../services/register/models/IMedUnitShow';
import { UserAddress } from '../services/register/models/userAddress';
import { UserNormal } from '../services/register/models/userNormal';
import { UserNurse } from '../services/register/models/userNurse';
import { UserPersonal } from '../services/register/models/userPersonal';

@Component({
  selector: 'app-nurse-form',
  templateUrl: './nurse-form.component.html',
  styleUrls: ['./nurse-form.component.css']
})
export class NurseFormComponent implements OnInit {

  public address: UserAddress={
    calle:"",
    numero:"",
    interior:"",
    colonia:"",
    cp:"" ,
    ciudad:"",
    estado:"",
    pais:""    
  }; 
  public personal: UserPersonal={
    idUsuario:0,
    email:"",
    username:"",
    password:"",
    profileimg:"",
    email_check:false,
    email_verify_token:"" 
  } 
  public normal: UserNormal={
    nombre:"",
    apellido:"",
    genero:"",
    direccionId:0,
    fecha_nac: new Date(),
    telefono:"",
    celular:""
  }
  public nurse: UserNurse={
    idpersonal:0,
    idUnidadmedica:0
  }

  public selectUnid: IMedUniShow={
    IdUnidad:0,
    nombre:"",
    idDireccion:0
  };

  public unidades?: IMedUniShow[];

  constructor() { }

  ngOnInit(): void {
  }

}
