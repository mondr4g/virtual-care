"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
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
        this.router.get('/getNurses', usersController_1.usersController.getNurses.bind(usersController_1.usersController));
        this.router.get('/getNurseInfo', usersController_1.usersController.getNurseInfo.bind(usersController_1.usersController));
        this.router.get('/getDoctors', usersController_1.usersController.getDoctors.bind(usersController_1.usersController));
        this.router.get('/getDoctorInfo', usersController_1.usersController.getDoctorInfo.bind(usersController_1.usersController));
        this.router.get('/getPacients', usersController_1.usersController.getPacients.bind(usersController_1.usersController));
        this.router.get('/getPacientInfo/:id', usersController_1.usersController.getPacientInfo.bind(usersController_1.usersController));
        this.router.get('/getEspecialities', usersController_1.usersController.getEspecialidades.bind(usersController_1.usersController));
        this.router.post('/getDpctorsByEsp', usersController_1.usersController.getDoctorsByEspe.bind(usersController_1.usersController));
        this.router.get('/getMedicalUnits', usersController_1.usersController.getMedicUnits.bind(usersController_1.usersController));
        this.router.get('/delNurse?:id', usersController_1.usersController.elimNurse.bind(usersController_1.usersController));
        this.router.post('/searchPacient', usersController_1.usersController.searchPacient.bind(usersController_1.usersController));
        this.router.post('/upEnfe', usersController_1.usersController.updateNurse.bind(usersController_1.usersController));
        this.router.post('/upDoc', usersController_1.usersController.updateDoc.bind(usersController_1.usersController));
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
