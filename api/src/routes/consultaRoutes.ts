import {Router} from 'express';
import { tokenValid } from 'libs/verifyToken';
import {consultaController} from '../controllers/consultaController';

class ConsultaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        //agregar todas y ponerles su tokenvalid
        //get
        this.router.get('/getSigns', consultaController.getSigns.bind(consultaController));
        this.router.get('/getConsByMed', consultaController.getConsultasByMed.bind(consultaController));
        this.router.get('/confirmCons', consultaController.getSigns.bind(consultaController));
        this.router.get('/getSignsDoctor', consultaController.getSignsCons.bind(consultaController));
        this.router.get('/revizarCons', consultaController.checkValidity.bind(consultaController));
        this.router.get('/getPacientHistory', consultaController.getPacientHistory.bind(consultaController));
        
        //post
        this.router.post('/setSigns',consultaController.setSigns.bind(consultaController));
        this.router.post('/newCons', consultaController.newPeticion.bind(consultaController));
        this.router.post('/postPacientHistory', consultaController.postPacientHistory.bind(consultaController));
        
        //postPacientHistory
        //put
        
        //del
        //this.router.delete('/delDoctor:id',tokenValid ,consultaController.bind(adminController));
    }

}
const consultaRoutes = new ConsultaRoutes();
export default consultaRoutes.router;