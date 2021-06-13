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
        this.router.get('/getNurse', usersController_1.usersController.getNurse.bind(usersController_1.usersController));
    }
}
const usersRoutes = new UsersRoutes();
exports.default = usersRoutes.router;
