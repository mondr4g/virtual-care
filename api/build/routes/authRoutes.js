"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', authController_1.authController.list);
        this.router.post('/signup', authController_1.authController.signup);
        this.router.post('/signin', authController_1.authController.signin);
        this.router.get('/profile', authController_1.authController.profile);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
