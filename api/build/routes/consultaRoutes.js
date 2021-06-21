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
        //agregar todas
        //get
        this.router.get('/getSigns', consultaController_1.consultaController.getSigns.bind(consultaController_1.consultaController));
        //post
        this.router.post('/setSigns', consultaController_1.consultaController.setSigns.bind(consultaController_1.consultaController));
        //put
        //del
        //this.router.delete('/delDoctor:id',tokenValid ,consultaController.bind(adminController));
    }
}
const consultaRoutes = new ConsultaRoutes();
exports.default = consultaRoutes.router;
