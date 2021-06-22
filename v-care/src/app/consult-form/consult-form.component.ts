import { Component, OnInit } from '@angular/core';
import { INewCons } from '../services/consulta/models/INewCons';
import { ISignSend } from '../services/consulta/models/ISignSend';
import { IHistory } from '../services/consulta/models/IHistory';
import { ISignRecived } from '../services/consulta/models/ISignRecived';
import { RegistService } from '../services/register/regist.service';
import { ConsultaService } from '../services/consulta/consulta.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-consult-form',
  templateUrl: './consult-form.component.html',
  styleUrls: ['./consult-form.component.css']
})
export class ConsultFormComponent implements OnInit {
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

  public signos_info?: ISignRecived[];

  public signos_medida: ISignSend[]=[];

  //Auxiliares para guardar las referencias
  private nurse:number=0;
  private pacient:number=0;

  public historial: IHistory={
    idPaciente: 0,
    alergias: '',
    enf_cronicas: '',
    enf_geneticas: ''  
  }

  //Para manejar la vista del historial
  public isnew:boolean = false;



  constructor(private consultaService: ConsultaService, private router: Router,private rutaActiva: ActivatedRoute) { 
    //sacar paciente y la enfermera del localstorage
    //enfermera
    let token = localStorage.getItem("auth-token");
    if(token){
      var deckToken = this.helper.decodeToken(token);
      this.consultaService.getPersonalId(deckToken.id).subscribe(a=>{
        this.consulta.idEnfermera=a.body[0].idUnidadMedica;
      });
    }
    //paciente
    this.consulta.idPaciente = Number(localStorage.getItem("cur-patient"))|| 0;

    //obtener los signos
    this.consultaService.getSigns().subscribe(a=>{
      this.signos_info = a;
      let i=0;
      this.signos_info
      this.signos_info?.forEach(a=>{
        this.signos_medida?.push({
          idsigno:a.Id,
          idconsulta:0,
          medida:0
        }) 
      })
    },(error)=>{
      console.log(error);
    });

    //revisar la bandera para la vista del historial
    this.consultaService.checkNewPatient(9).subscribe(a=>{
      this.isnew = a.new;
    });
    //Insertar todo ya con la consulta

  }

  ngOnInit(): void {
    console.log(this.rutaActiva.snapshot.params.idPA);
    this.consulta.idPaciente = this.rutaActiva.snapshot.params.idPA;
  }

  //aqui primero insertar la peticion de consulta
  registrar(){
    let b;
    this.consultaService.newPeticion(this.consulta).subscribe(a=>{
      b = a.idConsulta;
      alert("Consulta insertada correctamente")
    },(error)=>{
      console.error();
    });
    //localstorage
    localStorage.setItem("cur-consulta",String(b));
    //Revisar si enviar el hostorial
    if(this.isnew){
      this.historial.idPaciente=this.consulta.idPaciente;
      this.consultaService.postPacienteHistory(this.historial).subscribe(a=>{
        console.log("Historial agregado con exito");
      },(error)=>{
        console.error();
      });
    }
    this.router.navigateByUrl('/dashboard/nurse');

  }

}
