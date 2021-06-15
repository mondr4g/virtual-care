import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  helper = new JwtHelperService();
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.redirect();
  }

  redirect(){
    var token = localStorage.getItem("auth-token");
    if(token){
      var decToken = this.helper.decodeToken(token);
      switch(decToken.type){
        case 0: this.router.navigateByUrl('/dashboard/admin'); break;
        case 1: this.router.navigateByUrl('/dashboard/doc'); break;
        case 2: this.router.navigateByUrl('/dashboard/nurse'); break;
        default: this.router.navigateByUrl('/login'); break;//no creo que este se active pero por si las moscas
      }
    }else{
      this.router.navigateByUrl('');
    }
  }
}
