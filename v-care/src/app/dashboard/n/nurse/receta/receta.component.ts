import { Component, ElementRef, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jsPDF } from "jspdf";

import {InfoService} from '../../../../services/info.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  doc = new jsPDF() ;

  helper = new JwtHelperService();
  recetas: Array<IDiag>=[];
  constructor(private info:InfoService, private elRef:ElementRef) { }

  
  ngOnInit(): void {
    this.recuperar();
  }


  async recuperar(){
    let token = localStorage.getItem('auth-token');
    if(!token){
      console.log('inicie sesion');//en un recuadro mena xd
    }else{
      var dektoken = this.helper.decodeToken(token);
      if(dektoken){
        const aux = await this.info.dwnDoot(dektoken.id).subscribe(
          res=>{
            if(res.body){
              this.recetas = <IDiag[]>res.body;
              console.log(this.recetas[0]);
              //this.imprimir();
            }
          }, 
          err=>{
            console.log(err.error);
          }
        );
      }
    }
  }
  imprimir(){
    let innhtml: string=/*html*/``;
    for(let i=0; i<this.recetas.length;i++){
      console.log("holer "+this.recetas[i].fecha);
      innhtml+=/*html*/`<tr>
      <td>`+this.recetas[i].fecha+`</td>
      <td>`+this.recetas[i].nmbPac+`</td>
      <td><button onclick="genFile(`+i+`)" value="">Descargar Receta</button></td>
      </tr>`;
    }
    console.log("hola "+innhtml);
    let hola = document.getElementById("tabla");
    if(hola)
    hola.innerHTML=innhtml;
  }

  genFile(nu:number){
    console.log("nu:"+nu);
    var datum = this.recetas[nu].fecha.toDateString().slice(0,9);
    console.log(datum);
    let titulo = this.recetas[nu].idcons+datum; 
    let cadena = "Paciente: "+this.recetas[nu].nmbPac+"\nFecha: "+this.recetas[nu].fecha
    +"\nRecomendaciones:\n"+this.recetas[nu].reco+"\nMedicamentos: \n";
    for(let i=0;i < this.recetas[nu].receta.meds.length;i++){
      cadena += this.recetas[nu].receta.meds[i]+"\n";
    }
    cadena += "Instrucciones:\n";
    for(let i=0;i < this.recetas[nu].receta.inst.length;i++){
      cadena += this.recetas[nu].receta.inst[i]+"\n";
    }
    this.doc.text(cadena,10,10);
    this.doc.save(titulo+".pdf");
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
