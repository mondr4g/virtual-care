import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { ISignoCons } from 'src/app/services/consulta/models/ISignoCons';
import { ISignRecived } from 'src/app/services/consulta/models/ISignRecived';
import { ISignSend } from 'src/app/services/consulta/models/ISignSend';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  helper = new JwtHelperService();

  public signos?: ISignRecived[];
  public sendSign:any = Array<ISignSend>();

  //Estos para el doc

  public signosD?: ISignoCons[];
  constructor(public consultaService: ConsultaService, private router:Router) { }

  ngOnInit(): void {
    this.checkLink();

    /*

    */
    this.consultaService.getSigns().subscribe(data=>{
      //console.log(data)
      this.signos = data;
      //console.log(this.signos);
    })
/*
this.sendSign.push({idsigno:1,idconsulta:1,medida:13.2});
    this.sendSign.push({idsigno:2,idconsulta:1,medida:13.2});
    console.log(this.sendSign);   
    this.consultaService.setSigns(this.sendSign).subscribe(data=>{
      console.log(data);
    });
*/
    

    this.consultaService.getConsByMed(1).subscribe(data=>{
      this.signosD = data;
    });

    this.consultaService.getSignsDocSide(1).subscribe(data=>{
      //Aqui recuperar esa mierda cuando tenga datos.
    });

    this.consultaService.newPeticion({idDoctor: 1,
      idPaciente: 1,
      idEnfermera: 3,
      idvllamada: 1,
      anotaciones: "string",
      sintomas: "xsdsd",
      especialidad: "caca",
      aceptada: false,
      rechazada: false}).subscribe(data =>{
        //console.log(data);
        //console.log(data.headers.get("idConsulta"));
        localStorage.setItem("idConsulta", data.headers.get("idConsulta"));

      });
      
      /*setTimeout(()=>{*/
        this.consultaService.revisarConsulta(1).subscribe(data=>{
          console.log(data);
        });
      /*}, 5000);*/
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
