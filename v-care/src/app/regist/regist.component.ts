import { Component, OnInit } from '@angular/core';
import { IEsp } from '../services/register/models/IEsp';
import { UserAddress } from '../services/register/models/userAddress';
import { UserDoctor } from '../services/register/models/userDoctor';
import { UserNormal } from '../services/register/models/userNormal';
import { UserPersonal } from '../services/register/models/userPersonal';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {
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
  public doctor: UserDoctor ={
    cedula:"",
    idpersonal:0,
    activo:true,
    consultando:false,
    especialidad:""
  }
  public esp: IEsp={
    id:0,
    nombre: ""
  }
  public espToShow?: IEsp[];  

  constructor() { }

  ngOnInit(): void {
  }

  registrar():void{

  }

}
