import {Router} from 'express';
import {usersController} from '../controllers/usersController';
import {tokenValid} from '../libs/verifyToken';

class UsersRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        
        //Rutas que requieren de token
        /* 
        this.router.get('/getNurses', tokenValid, usersController.getNurses.bind(usersController));
        this.router.get('/getNurseInfo/:id', tokenValid, usersController.getNurseInfo.bind(usersController));
        this.router.get('/getDoctors', tokenValid, usersController.getDoctors.bind(usersController));
        this.router.get('/getDoctorInfo/:id', tokenValid, usersController.getDoctorInfo.bind(usersController));
        this.router.get('/getPacients', tokenValid, usersController.getPacients.bind(usersController));
        this.router.get('/getPacientInfo/:id', tokenValid, usersController.getPacientInfo.bind(usersController));
        this.router.get('/getEspecialities', tokenValid, usersController.getEspecialidades.bind(usersController));
        this.router.post('/getDpctorsByEsp', tokenValid, usersController.getDoctorsByEspe.bind(usersController));
        this.router.get('/getMedicalUnits', tokenValid, usersController.getMedicUnits.bind(usersController));
        this.router.post('/searchPacient', tokenValid, usersController.searchPacient.bind(usersController));
        */

        //Rutas que no requieren
        /*
        */
        this.router.get('/getNurses',usersController.getNurses.bind(usersController));
        this.router.get('/getNurseInfo/:id', usersController.getNurseInfo.bind(usersController));
        this.router.get('/getDoctors', usersController.getDoctors.bind(usersController));
        this.router.get('/getDoctorInfo/:id', usersController.getDoctorInfo.bind(usersController));
        this.router.get('/getPacients', usersController.getPacients.bind(usersController));
        this.router.get('/getPacientInfo/:id', usersController.getPacientInfo.bind(usersController));
        this.router.get('/getEspecialities', usersController.getEspecialidades.bind(usersController));
        this.router.post('/getDpctorsByEsp', usersController.getDoctorsByEspe.bind(usersController));
        this.router.get('/getMedicalUnits', usersController.getMedicUnits.bind(usersController));
        this.router.post('/searchPacient', usersController.searchPacient.bind(usersController));
    }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;