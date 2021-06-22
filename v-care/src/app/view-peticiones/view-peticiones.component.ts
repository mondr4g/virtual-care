import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConsultaService } from '../services/consulta/consulta.service';
import { IConsShow } from '../services/consulta/models/IConsShow';

@Component({
  selector: 'app-view-peticiones',
  templateUrl: './view-peticiones.component.html',
  styleUrls: ['./view-peticiones.component.css']
})
export class ViewPeticionesComponent implements OnInit {
  helper = new JwtHelperService();

  public peticiones!: IConsShow[];
  private idDoc!: number;

  constructor(private router:Router, private consultaService: ConsultaService) { 
    let token = localStorage.getItem("auth-token");
    if(token){
      var deckToken = this.helper.decodeToken(token);
      consultaService.getPersonalIdD(deckToken.id).subscribe(a=>{
        this.idDoc = a.body[0].idpersonal;
      });
    }
    
  }

  ngOnInit(): void {
    this.consultaService.getConsByMed(this.idDoc).subscribe(b=>{
      this.peticiones = b.body;
    });
    

    //this.checkLink();
  }

  aceptar(i:number){
    localStorage.setItem("cur-cons",String(i));
    this.consultaService.confirmConsulta(i).subscribe(a=>{
      this.router.navigateByUrl('/dashboard/doc/view-peticiones/consulta');
    });
  }

  rechazar(i: number){
    this.consultaService.rejectConsulta(i).subscribe(q=>{
      alert("se ha eliminado correctamente");
      window.location.reload();
    })
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
