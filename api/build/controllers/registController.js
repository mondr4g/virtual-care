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
exports.registController = void 0;
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class RegistController {
    registDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = yield this.registPersonal(req, 0);
                req.body.userDoctor.idpersonal = p;
                yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO doctor set ?", [req.body.userDoctor]);
                });
            }
            catch (e) {
                console.log(e);
            }
            res.json("Doctor registrado");
        });
    }
    registNurse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = yield this.registPersonal(req, 0);
                req.body.userNurse.idpersonal = p;
                yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO enfermera set ?", [req.body.userNurse]);
                });
            }
            catch (e) {
                console.log(e);
            }
            res.json("Enfermera resgistrada");
        });
    }
    registPacient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield this.registAddress(req);
                const u = yield this.registUser(req, d);
                yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO enfermera set ?", [req.body.userNurse]);
                });
            }
            catch (error) {
                console.log(error);
                res.json("Hubo un error");
            }
            res.json("Paciente registrado");
        });
    }
    registAddress(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.connect().then((conn) => {
                return conn.query("INSERT INTO direccion set ?", [req.body.userAddress]);
            });
            const i = yield database_1.connect().then((conn) => {
                return conn.query("SELECT MAX(Id) AS id FROM direccion");
            });
            if (i.length > 0) {
                console.log(i[0].id);
                return i[0].id;
            }
            return 0;
        });
    }
    registUser(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.userNormal.direccionId = id;
            yield database_1.connect().then((conn) => {
                return conn.query("INSERT INTO usuario set ?", [req.body.userNormal]);
            });
            const i = yield database_1.connect().then((conn) => {
                return conn.query("SELECT MAX(Id) AS id FROM usuario");
            });
            if (i.length > 0) {
                console.log(i);
                return i[0].id;
            }
            return 0;
        });
    }
    registPersonal(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id == 0) {
                req.body.userPersonal.idUsuario = null;
            }
            else {
                req.body.userPersonal.idUsuario = id;
            }
            //Aqui hacer la validacion del email
            //contraseña encriptada
            req.body.userPersonal.password = this.encryptPassword(req.body.userPersonal.password);
            yield database_1.connect().then((conn) => {
                return conn.query("INSERT INTO personal set ?", [req.body.userPersonal]);
            });
            const i = yield database_1.connect().then((conn) => {
                return conn.query("SELECT MAX(Id) AS id FROM personal");
            });
            if (i.length > 0) {
                console.log(i);
                return i[0].id;
            }
            return 0;
        });
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            return bcryptjs_1.default.hash(password, salt);
        });
    }
}
exports.registController = new RegistController();
