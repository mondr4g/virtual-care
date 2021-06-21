"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValid = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValid = (req, res, next) => {
    const token = req.header('auth-token');
    console.log(token);
    if (!token)
        return res.status(401).json("Acceso denegado");
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKE_SECRET || 'uW0tM8');
    req.usrInfo = payload;
    console.log(payload);
    next();
};
exports.tokenValid = tokenValid;
