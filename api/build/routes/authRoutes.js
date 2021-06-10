"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const verifyToken_1 = require("../libs/verifyToken");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', authController_1.authController.list);
        this.router.post('/signup', authController_1.authController.signup);
        this.router.post('/signin', authController_1.authController.signin.bind(authController_1.authController));
        this.router.get('/profile', verifyToken_1.tokenValid, authController_1.authController.profile);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
