import {Router} from 'express';
import {usersController} from '../controllers/usersController';
import {tokenValid} from '../libs/verifyToken';

class UsersRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/getNurses', tokenValid, usersController.getNurses.bind(usersController));
        this.router.get('/getNurseInfo/:id', tokenValid, usersController.getNurseInfo.bind(usersController));
        this.router.get('/getDoctors', tokenValid, usersController.getDoctors.bind(usersController));
        this.router.get('/getDoctorInfo/:id', tokenValid, usersController.getDoctorInfo.bind(usersController));
        this.router.get('/getPacients', tokenValid, usersController.getPacients.bind(usersController));
        this.router.get('/getPacientInfo/:id', tokenValid, usersController.getPacientInfo.bind(usersController));
        this.router.get('/');
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;