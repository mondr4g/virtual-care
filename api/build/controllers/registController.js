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
            yield database_1.connect().then((conn) => {
                return conn.query("INSERT INTO direccion set ?", [req.body.direccion]);
            });
            const i = yield database_1.connect().then((conn) => {
                return conn.query("SELECT MAX(Id) AS id FROM direccion");
            });
            if (i.length > 0) {
                console.log(i);
                return res.json("signup");
            }
            res.json("signup");
        });
    }
    registNurse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const a = yield this.registAddress(req);
                console.log(a);
                const u = yield this.registUser(req, a);
                const p = yield this.registPersonal(req, u);
                req.body.especific.idpersonal = p;
                yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO enfermera set ?", [req.body.especific]);
                });
            }
            catch (e) {
                console.log(e);
            }
            res.json("signin");
        });
    }
    registPacient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json("profile");
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
            req.body.userPersonal.idUsuario = id;
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
