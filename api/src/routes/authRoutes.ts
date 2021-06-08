import {Router} from 'express';
import {authController} from '../controllers/authController';

class AuthRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', authController.list);
        this.router.post('/signup', authController.signup);
        this.router.post('/signin', authController.signin);
        this.router.get('/profile', authController.profile);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;