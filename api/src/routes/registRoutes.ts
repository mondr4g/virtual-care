import {Router} from 'express';
import {registController} from '../controllers/registController';

class RegistRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/doctor', registController.registDoctor.bind(registController));
        this.router.post('/nurse', registController.registNurse.bind(registController));
        this.router.post('/pacient', registController.registPacient.bind(registController));
    }
}

const registRoutes = new RegistRoutes();
export default registRoutes.router;