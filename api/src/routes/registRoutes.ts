import {Router} from 'express';
import {registController} from '../controllers/registController';
import {tokenValid} from '../libs/verifyToken';

class RegistRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        //Completar token valid
        this.router.post('/doctor', registController.registDoctor.bind(registController));
        this.router.post('/nurse', registController.registNurse.bind(registController));
        this.router.post('/pacient', registController.registPacient.bind(registController));
        this.router.post('/sendmail', registController.sendmail_Prueba.bind(registController));
        this.router.get('/verifyAccount', registController.completeAcount.bind(registController));
        this.router.post('/completeProfile', tokenValid, registController.completeProfile.bind(registController));
        this.router.post('/staff', registController.registStaff.bind(registController));
        this.router.post('/admin', registController.registAdmin.bind(registController));
    }
}

const registRoutes = new RegistRoutes();
export default registRoutes.router;