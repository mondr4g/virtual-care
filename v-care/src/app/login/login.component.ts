import { Component, OnInit } from '@angular/core';

import { SessionService } from '../services/session.service';
import { IBody } from '../login/bodyIntf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cuerpo: IBody={
    account: "",
    pass: ""
  };
  constructor(private session:SessionService) {
  }

  ngOnInit(): void {
  }

  login() {
    let a = (document.getElementById("uname")) as HTMLInputElement;
    this.cuerpo.account = a.value;
    let b = (document.getElementById("upass")) as HTMLInputElement;
    this.cuerpo.pass = b.value;
    this.session.login(this.cuerpo).subscribe(
      res=>{console.log(res);}, err=>{console.log(err);}
    );
  }

}


