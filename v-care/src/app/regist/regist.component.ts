import { Component, OnInit } from '@angular/core';
import { IEsp } from '../services/register/models/IEsp';
import { UserAddress } from '../services/register/models/userAddress';
import { UserDoctor } from '../services/register/models/userDoctor';
import { UserNormal } from '../services/register/models/userNormal';
import { UserPersonal } from '../services/register/models/userPersonal';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {
  public address?: UserAddress; 
  public personal?: UserPersonal; 
  public normal?: UserNormal; 
  public doctor?: UserDoctor;
  public esp?: IEsp;
  public espToShow?: IEsp[];  

  constructor() { }

  ngOnInit(): void {
  }

  registrar():void{

  }

}
