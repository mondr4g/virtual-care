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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
            //verificando al usuario
            console.log(req.body);
            if (req.body.account == "") {
                res.json("ingrese una cuenta valida");
            }
            else {
                try {
                    const search = yield database_1.connect().then((conn) => {
                        return conn.query("SELECT * FROM `personal` WHERE `email`=\'" +
                            [req.body.account] + "\' OR `username`=\'" + [req.body.account] + "\' OR `idUsuario`=\'" + [req.body.account] + "\'");
                    });
                    if (search.length > 0) {
                        if (search[0].email_check == 1) {
                            if (yield bcryptjs_1.default.compare(req.body.pass, search[0].password)) {
                                //generar JWT
                                var i;
                                console.log(yield this.guesswho(search[0].Id));
                                switch (yield this.guesswho(search[0].Id)) {
                                    case 0:
                                        i = 0;
                                        break; //admin
                                    case 1:
                                        i = 1;
                                        break; //doctor
                                    case 2:
                                        i = 2;
                                        break; //enfermera
                                    default:
                                        res.status(500).json("Error con la Base de Datos");
                                        return;
                                        break;
                                }
                                const token = jsonwebtoken_1.default.sign({
                                    usrname: search[0].username,
                                    email: search[0].email,
                                    pfp: search[0].profileimg,
                                    type: i
                                }, process.env.TOKE_SECRET || 'uW0tM8', { expiresIn: '1d' });
                                res.header('auth-token', token).json("Login Exitoso");
                            }
                            else {
                                res.status(400).json("Contraseña Erronea");
                            }
                        }
                        else {
                            res.status(400).json("Cuenta no verificada");
                        }
                    }
                    else {
                        res.status(400).json("Usuario no encontrado");
                    }
                }
                catch (e) {
                    console.log(e);
                    res.status(500).json(e);
                }
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(req.usrInfo);
        });
    }
    guesswho(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var i;
                i = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT * FROM `admin` WHERE `idpersonal`=" + id);
                });
                if (i.length > 0) {
                    return 0;
                }
                i = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT * FROM `doctor` WHERE `idpersonal`=" + id);
                });
                if (i.length > 0) {
                    return 1;
                }
                i = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT * FROM `enfermera` WHERE `idpersonal`=" + id);
                });
                if (i.length > 0) {
                    return 2;
                }
                return 3;
            }
            catch (e) {
                console.log(e);
                return 5;
            }
        });
    }
}
exports.authController = new AuthController();
