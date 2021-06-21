import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { ISignRecived } from 'src/app/services/consulta/models/ISignRecived';
import { ISignSend } from 'src/app/services/consulta/models/ISignSend';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  public signos?: ISignRecived[];
  public sendSign:any = Array<ISignSend>();
  constructor(public consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.consultaService.getSigns().subscribe(data=>{
      console.log(data)
      this.signos = data;
      console.log(this.signos);
    })

    this.sendSign.push({idsigno:1,idconsulta:1,medida:13.2});
    this.sendSign.push({idsigno:2,idconsulta:1,medida:13.2});
    console.log(this.sendSign);   
    this.consultaService.setSigns(this.sendSign).subscribe(data=>{
      console.log(data);
    });
  }

}
