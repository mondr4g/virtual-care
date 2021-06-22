import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConsultaService } from '../services/consulta/consulta.service';

@Component({
  selector: 'app-doc-consulta',
  templateUrl: './doc-consulta.component.html',
  styleUrls: ['./doc-consulta.component.css']
})
export class DocConsultaComponent implements OnInit {
  helper = new JwtHelperService();

  constructor(private router:Router, private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.consultaService.getUser(6).subscribe(a=>{
      console.log(a)
    });
    
    //this.checkLink();
  }

  iniciar(){

  }
  cerrar(){

  }

  diagnostico(){

  }

  informacionCons(){
    
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
