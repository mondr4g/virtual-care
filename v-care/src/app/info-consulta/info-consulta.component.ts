import { Component, OnInit } from '@angular/core';
import { INewCons } from '../services/consulta/models/INewCons';
import { ISignSend } from '../services/consulta/models/ISignSend';
import { IHistory } from '../services/consulta/models/IHistory';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-info-consulta',
  templateUrl: './info-consulta.component.html',
  styleUrls: ['./info-consulta.component.css']
})
export class InfoConsultaComponent implements OnInit {
  helper = new JwtHelperService();

  public consulta: INewCons= {
    idDoctor: 0,
    idPaciente: 0,
    idEnfermera: 0,
    idvllamada: 0,
    anotaciones: '',
    sintomas: '',
    especialidad: '',
    aceptada: true,
    rechazada: true
  }

  public presionArt: ISignSend={
    idsigno : 1,
    idconsulta : 0,
    medida : 0
  }

  public resp: ISignSend={
    idsigno : 2,
    idconsulta : 0,
    medida : 0
  }

  public pulso: ISignSend={
    idsigno : 3,
    idconsulta : 0,
    medida : 0
  }

  public temp: ISignSend={
    idsigno : 4,
    idconsulta : 0,
    medida : 0
  }

  public historial: IHistory={
    idPaciente: 0,
    alergias: '',
    enf_cronicas: '',
    enf_geneticas: ''  
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
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
          this.router.navigateByUrl('/dashboard/admin');
          break; //admin
        case 1:
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
}
