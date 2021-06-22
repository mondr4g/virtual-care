import { Component, OnInit } from '@angular/core';
import { INewCons } from '../services/consulta/models/INewCons';
import { ISignSend } from '../services/consulta/models/ISignSend';
import { IHistory } from '../services/consulta/models/IHistory';

@Component({
  selector: 'app-info-consulta',
  templateUrl: './info-consulta.component.html',
  styleUrls: ['./info-consulta.component.css']
})
export class InfoConsultaComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
