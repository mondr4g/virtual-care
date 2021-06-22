import { Component, OnInit } from '@angular/core';
import { IMedUniShow } from '../services/register/models/IMedUnitShow';
import { UserPersonal } from '../services/register/models/userPersonal';
import { UserStaff } from '../services/register/models/userStaff';
import { RegistService } from '../services/register/regist.service';

@Component({
  selector: 'app-ayudante-form',
  templateUrl: './ayudante-form.component.html',
  styleUrls: ['./ayudante-form.component.css']
})
export class AyudanteFormComponent implements OnInit {

  public personal: UserPersonal={
    idUsuario:0,
    email:"",
    username:"",
    password:"",
    profileimg:"",
    email_check:false,
    email_verify_token:"" 
  } 

  public ayudante: UserStaff={
    idpersonal: 0,
    idUnidadMedica: 0,
    nombre: "",
    apellido: ""
  }
  public selectUnid: IMedUniShow={
    IdUnidad:0,
    nombre:"",
    idDireccion:0
  };

  public unidades!: IMedUniShow[];
  constructor(private registService: RegistService) {
    this.registService.getUnits().subscribe(data=>{
      console.log(data.body);
      this.unidades = data.body;
      console.log(this.unidades);
      this.selectUnid = this.unidades[0];
    })
  }

  ngOnInit(): void {
  }

  public registrar(){
    var a = this.guessUnit(this.selectUnid.nombre);
    //console.log(a);
    if(a.b){
      this.selectUnid.IdUnidad = a.id || 0;
      this.ayudante.idUnidadMedica = a.id || 0;
    }else{
      this.ayudante.idUnidadMedica = 0; 
    }
    this.registService.newStaff(this.personal,this.ayudante).subscribe(a=>{
      alert("Resgistrado correctamente");
      //Redirigir
//      limpiar form
    }, (error)=>{
      alert("Username o correo duplicados!!!");
    });

    //console.log(this.nurse.idUnidadmedica);
  }

  private guessUnit(nombre:string):sE{
    var s = new sE(0,true);
    var ll = this.unidades?.find(e=>e.nombre==nombre);
    console.log(ll);
    if(ll!=undefined){
      s.id = ll.IdUnidad;
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
