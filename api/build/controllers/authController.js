"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const database_1 = require("../database");
class AuthController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.connect().then((conn) => {
                return conn.query("SELECT * FROM games");
            });
            res.json(games);
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json("signup");
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json("signin");
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json("profile");
        });
    }
}
exports.authController = new AuthController();
