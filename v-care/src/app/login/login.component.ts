import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { SessionService } from '../services/session.service';
import { IBody } from '../login/bodyIntf';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cuerpo: IBody={
    account: "",
    pass: ""
  };
  helper = new JwtHelperService();

  constructor(private session:SessionService, private router: Router) {
  }

  ngOnInit(): void {
    this.checkLink();  
  }

  checkLink() {
    let token = localStorage.getItem('auth-token'); 
    if(!token) {
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
          this.router.navigateByUrl('/dashboard/nurse');
          break; //nurse
        case 3:
          this.router.navigateByUrl('/dashboard/registConsulta');
          break; //url del componente de registro de pacientes
        default:
          break;
      }
    }
  }

  login() {
    let a = (document.getElementById("uname")) as HTMLInputElement;
    this.cuerpo.account = a.value;
    let b = (document.getElementById("upass")) as HTMLInputElement;
    this.cuerpo.pass = b.value;
    this.session.login(this.cuerpo).subscribe(
      res=>{
        console.log(res.headers.get('auth-token'));
        var token=res.headers.get('auth-token');
        console.log("estoy aqui");
        
        if(token){ 
          localStorage.setItem("auth-token", token);
          //muestra un mensaje que te diga que si se hizo el login y cuando le de en continuar lo redireccione
          this.succLogin(token);
        }else{
          //muestra mensaje de fallo en el login 
        } 
      }, 
      err=>{
        //Aqui igual muestra el error usando err.error 
        console.log(err.error);
      }
    );
    //this.router.navigateByUrl('/');
  }
  
  succLogin(token:any){
    if(token){
      var url;
      var decToken = this.helper.decodeToken(token);
      console.log(decToken);
      switch(decToken.type){
        case 0: url='/dashboard/admin'; break;
        case 1: url='/dashboard/doc'; break;
        case 2: url='/dashboard/nurse'; break;
        case 3: url=''; break; //url del componente de registro de pacientes
        default: url='/login'; break;//no creo que este se active pero por si las moscas
      }
      this.router.navigateByUrl(url);
    }
    else{
      console.log("error con el token"); //igual con este xd
      return;
    }
  }
}


