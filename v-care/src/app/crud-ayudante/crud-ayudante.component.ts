import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminMostService } from '../services/adminserve/admin-most.service';

@Component({
  selector: 'app-crud-ayudante',
  templateUrl: './crud-ayudante.component.html',
  styleUrls: ['./crud-ayudante.component.css']
})
export class CrudAyudanteComponent implements OnInit {
  helper = new JwtHelperService();

  constructor(private router:Router, private amost: AdminMostService) { }

  ngOnInit(): void {
    this.checkLink();
    this.bring();
  }
  
  nurss: any = [];

  async bring(){
    const aux = await this.amost.getAyu().subscribe(
      res=>{
        console.log(res.body);
        this.nurss = res.body;
      },
      err=>{
        console.log(err);
      }
    );
  }

  async elim(nu:number){
    console.log(nu);
    const aux = await this.amost.elimAyu(nu).subscribe(
      res=>{
        alert(res.body);
        window.location.reload();
      },
      err=>{
        console.log(err);
      }
    );
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
          this.router.navigateByUrl('');
          break;
      }
    }
  }
}
