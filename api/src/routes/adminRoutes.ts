import {Router} from 'express';
import {adminController} from '../controllers/adminController';

class AdminRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        //get
        this.router.get('/getStaff', adminController.getHelpers.bind(adminController));
        this.router.get('/getUnits', adminController.getUnits.bind(adminController));
        this.router.get('/getEspes', adminController.getEsps.bind(adminController));
        this.router.get('/getUnitById', adminController.getUnitById.bind(adminController));
        this.router.get('/checkNewPatient', adminController.isNewPatient.bind(adminController));
        this.router.get('/getPersonalId', adminController.getPersonalId.bind(adminController));
        this.router.get('/getPersonalIdD', adminController.getPersonalIdD.bind(adminController));

        //post
        this.router.post('/newUnit', adminController.postUnit.bind(adminController));
        //put
        
        //del
        this.router.delete('/delDoctor:id', adminController.delDoctor.bind(adminController));
        this.router.delete('/delNurse:id', adminController.delNurse.bind(adminController));
        //this.router.delete('/delPacient:id', adminController.delDoctor.bind(adminController));
        this.router.delete('/delStaff:id', adminController.delHelper.bind(adminController));
        this.router.delete('/delUnit:id', adminController.delUnit.bind(adminController));
    }

}
const adminRoutes = new AdminRoutes();
export default adminRoutes.router;