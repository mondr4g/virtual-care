import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import {InfoService} from '../../../../services/info.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  helper = new JwtHelperService();
  recetas: Array<IDiag>=[];
  constructor(private info:InfoService) { }

  
  ngOnInit(): void {
    this.recuperar();
  }

  recuperar(){
    let token = localStorage.getItem('auth-token');
    if(!token){
      console.log('inicie sesion');//en un recuadro mena xd
    }else{
      var dektoken = this.helper.decodeToken(token);
      this.info.dwnDoot(dektoken.id).subscribe(
        res=>{
          console.log(res.body);
        }, 
        err=>{
          console.log(err.error);
        }
      );
    }
  }
}

interface IDiag{
  idcons:number,
  fecha: Date,
  nmbPac: string,
  reco: string,
  receta: {
      meds:[],
      inst:[]
  }

}
