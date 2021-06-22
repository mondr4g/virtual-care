import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminMostService } from '../services/adminserve/admin-most.service';

@Component({
  selector: 'app-crud-nurse',
  templateUrl: './crud-nurse.component.html',
  styleUrls: ['./crud-nurse.component.css']
})
export class CrudNurseComponent implements OnInit {
  helper = new JwtHelperService();
  nurss:any=[];

  constructor(private amost: AdminMostService) { }

  ngOnInit(): void {
    this.bring();
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
