import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export class someFunc{
    helper = new JwtHelperService();

    constructor(private router: Router){

    }

    logout(){
        if(localStorage.getItem('auth-token')){
            localStorage.removeItem('auth-token');
            this.router.navigateByUrl('');
        }
    }  
}