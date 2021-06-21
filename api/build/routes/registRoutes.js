"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registController_1 = require("../controllers/registController");
const verifyToken_1 = require("../libs/verifyToken");
class RegistRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/doctor', registController_1.registController.registDoctor.bind(registController_1.registController));
        this.router.post('/nurse', registController_1.registController.registNurse.bind(registController_1.registController));
        this.router.post('/pacient', registController_1.registController.registPacient.bind(registController_1.registController));
        //this.router.post('/sendmail', registController.sendmail.bind(registController));
        this.router.get('/verifyAccount', registController_1.registController.completeAcount.bind(registController_1.registController));
        this.router.post('/completeProfile', verifyToken_1.tokenValid, registController_1.registController.completeProfile.bind(registController_1.registController));
        this.router.post('/staf', verifyToken_1.tokenValid, registController_1.registController.registStaf.bind(registController_1.registController));
    }
}
const registRoutes = new RegistRoutes();
exports.default = registRoutes.router;
