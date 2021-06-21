import {Router} from 'express';
import {infoController} from '../controllers/infoController';
import {tokenValid} from '../libs/verifyToken';

class InfoRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', infoController.list);
        this.router.post('/subir', tokenValid, infoController.subirDiagnostico.bind(infoController));
        this.router.post('/obtener', tokenValid, infoController.obtenerDiagnostico.bind(infoController));
    }
}

const infoRoutes = new InfoRoutes();
export default infoRoutes.router;