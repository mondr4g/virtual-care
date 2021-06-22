import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
  helper = new JwtHelperService();

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.checkLink(1);
  }

  checkLink(typeLink: number) {
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
