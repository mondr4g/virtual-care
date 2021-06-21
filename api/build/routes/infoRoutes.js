"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const infoController_1 = require("../controllers/infoController");
const verifyToken_1 = require("../libs/verifyToken");
class InfoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', infoController_1.infoController.list);
        this.router.post('/subir', verifyToken_1.tokenValid, infoController_1.infoController.subirDiagnostico.bind(infoController_1.infoController));
        this.router.post('/obtener', verifyToken_1.tokenValid, infoController_1.infoController.obtenerDiagnostico.bind(infoController_1.infoController));
    }
}
const infoRoutes = new InfoRoutes();
exports.default = infoRoutes.router;
