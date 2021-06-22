import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAddress } from '../services/register/models/userAddress';
import { UserNormal } from '../services/register/models/userNormal';
import { UserPacient } from '../services/register/models/userPacient';
import { UserPersonal } from '../services/register/models/userPersonal';
import { RegistService } from '../services/register/regist.service';

@Component({
  selector: 'app-pacient-form',
  templateUrl: './pacient-form.component.html',
  styleUrls: ['./pacient-form.component.css']
})
export class PacientFormComponent implements OnInit {

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
  public normal: UserNormal={
    nombre:"",
    apellido:"",
    genero:"",
    direccionId:0,
    fecha_nac: new Date(),
    telefono:"",
    celular:""
  }; 
  public paciente: UserPacient={
    idusuario: 0,
    fecha_registro: new Date(),
    CURP: "",
    idUnidadmedica: 0
  };

  helper = new JwtHelperService();

  constructor(private registService: RegistService, private router: Router) { 
    //Aqui sacamos el token y todo el desvergue.
    let token = localStorage.getItem("auth-token");
    if(token){
      var decToken = this.helper.decodeToken(token);
      if(decToken.type==2 || decToken.type==3){
        this.registService.getUnitById(13, 2).subscribe(a=>{
          this.paciente.idUnidadmedica=a.body[0].idUnidadMedica;
        });
      }else{
        this.router.navigateByUrl("login");
      }
    }else{
      this.router.navigateByUrl("login");
    }
    
  }

  ngOnInit(): void {
  }

  public registrar():void{
    //console.log(this.address);
    //console.log(this.normal);
    //console.log(this.personal);
    //console.log(this.doctor);
    //console.log(this.esp);
    /*
     * var a = this.SearchExp(this.esp.nombre)
    if(a.b){
      this.esp.id = a.id || 0;
      this.doctor.idEspecialidad = a.id || 0;
    }else{
      this.esp.id = 0; 
    }
     */
    //Aqui meterle la pinche unidad medica.


    this.registService.newPacient(this.address,this.normal,this.paciente).subscribe(a=>{
      alert("Registrado correctamente");
    }, (error)=>{
      alert("Algo ha ido mal, revisa tus datos!!")
    });
  }

}
