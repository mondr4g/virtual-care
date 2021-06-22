import { Component, OnInit } from '@angular/core';
import { IEsp } from '../services/register/models/IEsp';
import { UserAddress } from '../services/register/models/userAddress';
import { UserDoctor } from '../services/register/models/userDoctor';
import { UserNormal } from '../services/register/models/userNormal';
import { UserPersonal } from '../services/register/models/userPersonal';
import { RegistService } from '../services/register/regist.service';

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
    idEspecialidad:0

  }
  public esp: IEsp={
    id:0,
    nombre: ""
  }
  public espToShow?: IEsp[];  

  constructor(private registService: RegistService) {
    this.registService.getEsp().subscribe(data=>{
      console.log(data.body);
      this.espToShow = data.body;
    })
  }

  ngOnInit(): void {
 
  }

  public registrar():void{
    //console.log(this.address);
    //console.log(this.normal);
    //console.log(this.personal);
    //console.log(this.doctor);
    //console.log(this.esp);
    var a = this.SearchExp(this.esp.nombre)
    if(a.b){
      this.esp.id = a.id || 0;
      this.doctor.idEspecialidad = a.id || 0;
    }else{
      this.esp.id = 0; 
    }
    this.registService.newDoc(this.address,this.personal,this.normal,this.doctor,this.esp).subscribe(a=>{
      alert("Registrado correctamente verifica tu email!!");
    }, (error)=>{
      alert("Algo ha ido mal, revisa tus datos!!")
    });
  }

  private SearchExp(nombre:string):sE{
    var s = new sE(0,true);
    var ll = this.espToShow?.find(e=>e.nombre==nombre);
    console.log(ll);
    if(ll!=undefined){
      s.id = ll.id;
      s.b = true;
      return s;
    }else{
      s.id=0;
      s.b=false;
      return s;
    }
  }

}

class sE{
  public id?:number;
  public b?:boolean;

  constructor(id:number, b:boolean){
    this.id = id;
    this.b = b;
  }
}