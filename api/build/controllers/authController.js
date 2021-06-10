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
            if (req.body.account == "") {
                res.json("ingrese una cuenta valida");
            }
            else {
                try {
                    const search = yield database_1.connect().then((conn) => {
                        return conn.query('SELECT `password`,`email_check`' +
                            +' FROM `personal` WHERE `email`="' + [req.body.account]
                            + '" OR `username`="' + [req.body.account] + '" OR `idUsuario`="' + [req.body.account] + '"');
                    });
                    if (search.length > 0) {
                        if (search[1] == 1) {
                            const pass = () => __awaiter(this, void 0, void 0, function* () {
                                const salt = yield bcryptjs_1.default.genSalt(10);
                                return bcryptjs_1.default.hash(req.body.pass, salt);
                            });
                            if (search[0] == pass) {
                                //generar JWT
                            }
                            else {
                                res.json("Contraseña Erronea");
                            }
                        }
                        else {
                            res.json("Cuenta no verificada");
                        }
                    }
                    else {
                        res.json("Usuario no encontrado");
                    }
                }
                catch (e) {
                    console.log(e);
                    res.json(e);
                }
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json("profile");
        });
    }
    guesswho(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var i;
                i = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT * FROM `admin` WHERE `idpersonal`=", id);
                });
                if (i.length > 0) {
                    return 0;
                }
                i = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT * FROM `doctor` WHERE `idpersonal`=", id);
                });
                if (i.length > 0) {
                    return 1;
                }
                i = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT * FROM `enfermera` WHERE `idpersonal`=", id);
                });
                if (i.length > 0) {
                    return 2;
                }
                return 3;
            }
            catch (e) {
                return 5;
            }
        });
    }
    verPass(req, dbpas) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield this.encryptPassword(req.body.pass));
            console.log(dbpas);
            console.log(yield bcryptjs_1.default.compare(dbpas, yield this.encryptPassword(req.body.pass)));
            if (yield bcryptjs_1.default.compare(dbpas, yield this.encryptPassword(req.body.pass))) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            return bcryptjs_1.default.hash(password, salt);
        });
    }
}
exports.authController = new AuthController();
