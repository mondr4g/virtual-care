import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'virtual-care';
  helper = new JwtHelperService();

  ngOnInit(): void {
    let token = JSON.parse(localStorage.getItem('auth-service') || '{}');
    let decToken = this.helper.decodeToken(token);
    let nav = document.getElementById('vcare-nav');
    switch(decToken.type){
      case 0:
        if(nav) nav.innerHTML =  '<a class="nav-link active" aria-current="page" routerLink="/dashboard/admin" routerLinkActive="active">Home</a><a class="nav-link" routerLink="" routerLinkActive="active">Logout</a>';
        break; //admin
      case 1:
        if(nav) nav.innerHTML =  '<a class="nav-link active" aria-current="page" routerLink="/dashboard/doc" routerLinkActive="active">Home</a><a class="nav-link" routerLink="" routerLinkActive="active">Logout</a>';
        break; //doc
      case 2:
        if(nav) nav.innerHTML =  '<a class="nav-link active" aria-current="page" routerLink="/dashboard/nurse" routerLinkActive="active">Home</a><a class="nav-link" routerLink="" routerLinkActive="active">Logout</a>';
        break; //nurse
      case 3:
        if(nav) nav.innerHTML =  '<a class="nav-link active" aria-current="page" routerLink="/dashboard/nurse" routerLinkActive="active">Home</a><a class="nav-link" routerLink="" routerLinkActive="active">Logout</a>';
        break; //url del componente de registro de pacientes
      default: 
        if(nav) nav.innerHTML =  '<a class="nav-link active" aria-current="page" routerLink="" routerLinkActive="active">Home</a><a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a>';
      break;
    }
  }
}
