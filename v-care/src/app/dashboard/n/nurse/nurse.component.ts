import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { ISignoCons } from 'src/app/services/consulta/models/ISignoCons';
import { ISignRecived } from 'src/app/services/consulta/models/ISignRecived';
import { ISignSend } from 'src/app/services/consulta/models/ISignSend';
import { IUserViewNurse } from 'src/app/services/consulta/models/IUserViewNurse';
import { RegistService } from 'src/app/services/register/regist.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  paciente!:IUserViewNurse;
  helper = new JwtHelperService();

  public ID: number = 0;
  public Nombre: string = "";
  public Apellido: string = "";
  public CURP:string="";

  constructor(public consultaService: ConsultaService, private registService: RegistService, private router: Router) { 
    
  }

  ngOnInit(): void {
    
   this.ID=0;
   this.Apellido="";
   this.Nombre="";
   this.CURP="";
    
  }

  buscar(){
    this.consultaService.searchUsers(this.CURP).subscribe(a=>{
      this.paciente=a.body[0];
      this.ID=this.paciente.Id;
      this.Nombre=this.paciente.nombre;
      this.Apellido=this.paciente.apellido;
      console.log(this.paciente);
    },(error)=>{
      console.log("No existe registrate");
    });

  }

  guardar(){
    if(this.ID != 0){
      localStorage.setItem("cur-patient", String(this.ID));
      this.router.navigateByUrl('/registConsulta');
    }
    
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
          this.router.navigateByUrl('/dashboard/admin');
          break; //admin
        case 1:
          this.router.navigateByUrl('/dashboard/doc');
          break; //doc
        case 2:
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


}


/*
    let token = localStorage.getItem("auth-token");
    var u=0;
    if(token){
      var decToken = this.helper.decodeToken(token);
      if(decToken.type==2 ){
        this.registService.getUnitById(13, 2).subscribe(a=>{
          u=a.body[0].idUnidadMedica;
        });
      }else{
        //this.router.navigateByUrl("login");
      }
    }else{
      //this.router.navigateByUrl("login");
    }
    this.consultaService.getUsers(2).subscribe(a=>{
      this.pacientes=a.body;
    })
    */