"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const verifyToken_1 = require("../libs/verifyToken");
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/getNurses', verifyToken_1.tokenValid, usersController_1.usersController.getNurses.bind(usersController_1.usersController));
        this.router.get('/getNurseInfo/:id', verifyToken_1.tokenValid, usersController_1.usersController.getNurseInfo.bind(usersController_1.usersController));
        this.router.get('/getDoctors', verifyToken_1.tokenValid, usersController_1.usersController.getDoctors.bind(usersController_1.usersController));
        this.router.get('/getDoctorInfo/:id', verifyToken_1.tokenValid, usersController_1.usersController.getDoctorInfo.bind(usersController_1.usersController));
        this.router.get('/getPacients', verifyToken_1.tokenValid, usersController_1.usersController.getPacients.bind(usersController_1.usersController));
        this.router.get('/getPacientInfo/:id', verifyToken_1.tokenValid, usersController_1.usersController.getPacientInfo.bind(usersController_1.usersController));
        this.router.get('/');
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
