import { Component, OnInit } from '@angular/core';
import { Diagnostic } from '../services/consulta/models/Diagnostic';
@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {

  public d: Diagnostic={
    idConsulta: 0,
    observaciones: '',
    recomendaciones: '',
    receta: ''  
  }

  constructor() { }

  ngOnInit(): void {
  }

}
