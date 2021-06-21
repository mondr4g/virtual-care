import {Router} from 'express';
import { tokenValid } from 'libs/verifyToken';
import {consultaController} from '../controllers/consultaController';

class ConsultaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        //agregar todas
        //get
        this.router.get('/getSigns', consultaController.getSigns.bind(consultaController));
         //post
        this.router.post('/setSigns',consultaController.setSigns.bind(consultaController));
        //put
        
        //del
        //this.router.delete('/delDoctor:id',tokenValid ,consultaController.bind(adminController));
    }

}
const consultaRoutes = new ConsultaRoutes();
export default consultaRoutes.router;