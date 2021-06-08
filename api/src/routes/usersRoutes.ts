import {Router} from 'express';

class UsersRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;