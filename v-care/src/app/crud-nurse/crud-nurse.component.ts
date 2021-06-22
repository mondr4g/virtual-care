import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminMostService } from '../services/adminserve/admin-most.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crud-nurse',
  templateUrl: './crud-nurse.component.html',
  styleUrls: ['./crud-nurse.component.css']
})
export class CrudNurseComponent implements OnInit {
  helper = new JwtHelperService();
  nurss:any=[];

  constructor(private amost: AdminMostService, private router:Router) { }

  ngOnInit(): void {
    this.checkLink();
    this.bring();
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

  async bring(){
    const aux = await this.amost.getEnfe().subscribe(
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
    const aux = await this.amost.elimEnf(nu).subscribe(
      res=>{
        alert(res.body);
        window.location.reload();
      },
      err=>{
        console.log(err);
      }
    );
  }
}
