"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //get
        this.router.get('/getStaff', adminController_1.adminController.getHelpers.bind(adminController_1.adminController));
        this.router.get('/getUnits', adminController_1.adminController.getUnits.bind(adminController_1.adminController));
        //post
        this.router.post('/newUnit', adminController_1.adminController.postUnit.bind(adminController_1.adminController));
        //put
        //del
        this.router.delete('/delDoctor:id', adminController_1.adminController.delDoctor.bind(adminController_1.adminController));
        this.router.delete('/delNurse:id', adminController_1.adminController.delNurse.bind(adminController_1.adminController));
        //this.router.delete('/delPacient:id', adminController.delDoctor.bind(adminController));
        this.router.delete('/delStaff:id', adminController_1.adminController.delHelper.bind(adminController_1.adminController));
        this.router.delete('/delUnit:id', adminController_1.adminController.delUnit.bind(adminController_1.adminController));
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
