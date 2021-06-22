import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { someFunc } from '../someFunc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  helper = new JwtHelperService();
  private log = new someFunc(this.router);

  constructor(private router:Router) {
  };

  ngOnInit():void {

  };

  logOut() {
    this.log.logout();
  }

  checkDisplay1(): string {
    let display = "";
    let token = localStorage.getItem('auth-token'); 
    if(!token) {
      display = 'flex';
    }
    else {
      let decToken = this.helper.decodeToken(token);
      switch(decToken.type){
        case 0:
          display = 'none';
          break; //admin
        case 1:
          display = 'none';
          break; //doc
        case 2:
          display = 'none';
          break; //nurse
        case 3:
          display = 'none';
          break; //url del componente de registro de pacientes
        default:
          display = 'none';
          break;
      }
    }
    return display;
  }

  checkDisplay2(): string {
    let display = "";
    let token = localStorage.getItem('auth-token'); 
    if(!token) {
      display = 'none';
    }
    else {
      let decToken = this.helper.decodeToken(token);
      switch(decToken.type){
        case 0:
          display = 'flex';
          break; //admin
        case 1:
          display = 'none';
          break; //doc
        case 2:
          display = 'none';
          break; //nurse
        case 3:
          display = 'none';
          break; //url del componente de registro de pacientes
        default:
          display = 'none';
          break;
      }
    }
    return display;
  }

  checkDisplay3(): string {
    let display = "";
    let token = localStorage.getItem('auth-token'); 
    if(!token) {
      display = 'none';
    }
    else {
      let decToken = this.helper.decodeToken(token);
      switch(decToken.type){
        case 0:
          display = 'none';
          break; //admin
        case 1:
          display = 'flex';
          break; //doc
        case 2:
          display = 'none';
          break; //nurse
        case 3:
          display = 'none';
          break; //url del componente de registro de pacientes
        default:
          display = 'none';
          break;
      }
    }
    return display;
  }

  checkDisplay4(): string {
    let display = "";
    let token = localStorage.getItem('auth-token'); 
    if(!token) {
      display = 'none';
    }
    else {
      let decToken = this.helper.decodeToken(token);
      switch(decToken.type){
        case 0:
          display = 'none';
          break; //admin
        case 1:
          display = 'none';
          break; //doc
        case 2:
          display = 'flex';
          break; //nurse
        case 3:
          display = 'none';
          break; //url del componente de registro de pacientes
        default:
          display = 'none';
          break;
      }
    }
    return display;
  }

  checkDisplay5(): string {
    let display = "";
    let token = localStorage.getItem('auth-token'); 
    if(!token) {
      display = 'none';
    }
    else {
      let decToken = this.helper.decodeToken(token);
      switch(decToken.type){
        case 0:
          display = 'none';
          break; //admin
        case 1:
          display = 'none';
          break; //doc
        case 2:
          display = 'none';
          break; //nurse
        case 3:
          display = 'flex';
          break; //url del componente de registro de pacientes
        default:
          display = 'none';
          break;
      }
    }
    return display;
  }
}


