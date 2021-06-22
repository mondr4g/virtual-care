import { Component, OnInit } from '@angular/core';
import { IMedUniShow } from '../services/register/models/IMedUnitShow';
import { UserAddress } from '../services/register/models/userAddress';
import { UserNormal } from '../services/register/models/userNormal';
import { UserNurse } from '../services/register/models/userNurse';
import { UserPersonal } from '../services/register/models/userPersonal';
import { RegistService } from '../services/register/regist.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nurse-form',
  templateUrl: './nurse-form.component.html',
  styleUrls: ['./nurse-form.component.css']
})
export class NurseFormComponent implements OnInit {
  helper = new JwtHelperService();

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

  public unidades!: IMedUniShow[];

  constructor(private registService: RegistService, private router:Router) { 
    this.registService.getUnits().subscribe(data=>{
      console.log(data.body);
      this.unidades = data.body;
      console.log(this.unidades);
      this.selectUnid = this.unidades[0];
    })
  }

  ngOnInit(): void {
    //dashboard/admin/view-nurse/add-nurse
    this.checkLink();
  }

  checkLink() {
    let token = localStorage.getItem('auth-token'); 
    if(!token) {
      this.router.navigateByUrl('');
    }
    else {
      let decToken = this.helper.decodeToken(token);
      switch(decToken.type){
        case 0:
          break; //admin
        case 1:
          this.router.navigateByUrl('/dashboard/doc');
          break; //doc
        case 2:
          this.router.navigateByUrl('/dashboard/nurse');
          break; //nurse
        case 3:
          this.router.navigateByUrl('/dashboard/registConsulta');
          break; //url del componente de registro de pacientes
        default:
          this.router.navigateByUrl('');
          break;
      }
    }
  }


  public registrar(){
    //console.log(this.address);
    //console.log(this.normal);
    ///console.log(this.personal);
    //console.log(this.nurse);
    //console.log(this.selectUnid);

    var a = this.guessUnit(this.selectUnid.nombre);
    //console.log(a);
    if(a.b){
      this.selectUnid.IdUnidad = a.id || 0;
      this.nurse.idUnidadmedica = a.id || 0;
    }else{
      this.nurse.idUnidadmedica = 0; 
    }
    this.registService.newNurse(this.address,this.personal,this.normal,this.nurse).subscribe(a=>{
      alert("Registrada correctamente");
    }, (error)=>{
      alert("Algo ha ido mal, revisa tus datos!!")
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
