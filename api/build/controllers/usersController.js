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
exports.usersController = void 0;
const database_1 = require("../database");
class UsersController {
    index(req, res) {
        res.send("hola");
    }
    getDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ds = yield database_1.connect().then((conn) => {
                return conn.query("SELECT * FROM doctor INNER JOIN personal ON doctor.idpersonal = personal.Id;");
            });
            return res.json(ds);
        });
    }
    getNurse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const es = yield database_1.connect().then((conn) => {
                return conn.query("SELECT * FROM enfermera INNER JOIN personal ON enfermera.idpersonal = personal.Id;");
            });
            console.log(es);
            return res.json(es);
        });
    }
}
exports.usersController = new UsersController();
