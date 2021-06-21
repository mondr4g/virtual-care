"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultaController_1 = require("../controllers/consultaController");
class ConsultaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //agregar todas y ponerles su tokenvalid
        //get
        this.router.get('/getSigns', consultaController_1.consultaController.getSigns.bind(consultaController_1.consultaController));
        this.router.get('/getConsByMed', consultaController_1.consultaController.getConsultasByMed.bind(consultaController_1.consultaController));
        this.router.get('/confirmCons', consultaController_1.consultaController.getSigns.bind(consultaController_1.consultaController));
        this.router.get('/getSignsDoctor', consultaController_1.consultaController.getSignsCons.bind(consultaController_1.consultaController));
        //post
        this.router.post('/setSigns', consultaController_1.consultaController.setSigns.bind(consultaController_1.consultaController));
        this.router.post('/newCons', consultaController_1.consultaController.newPeticion.bind(consultaController_1.consultaController));
        //put
        //del
        //this.router.delete('/delDoctor:id',tokenValid ,consultaController.bind(adminController));
    }
}
const consultaRoutes = new ConsultaRoutes();
exports.default = consultaRoutes.router;
