"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registController_1 = require("../controllers/registController");
class RegistRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/doctor', registController_1.registController.registDoctor.bind(registController_1.registController));
        this.router.post('/nurse', registController_1.registController.registNurse.bind(registController_1.registController));
        this.router.post('/pacient', registController_1.registController.registPacient.bind(registController_1.registController));
    }
}
const registRoutes = new RegistRoutes();
exports.default = registRoutes.router;
