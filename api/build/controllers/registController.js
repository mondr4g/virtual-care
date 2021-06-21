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
const MailHelper_1 = require("../helpers/MailHelper");
const moment_1 = __importDefault(require("moment"));
class RegistController {
    registDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = yield this.registPersonal(req, 0);
                req.body.userDoctor.idpersonal = p;
                if (req.body.idEspecialidad == null) {
                    req.body.idEspecialidad = yield this.registEsp(req);
                }
                yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO doctor set ?", [req.body.userDoctor]);
                });
            }
            catch (e) {
                console.log(e.message);
                return res.status(500).json(e.message);
            }
            return res.status(200).json("Doctor registrado");
        });
    }
    registNurse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = yield this.registPersonal(req, 0);
                console.log(p);
                req.body.userNurse.idpersonal = p;
                yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO enfermera set ?", [req.body.userNurse]);
                });
            }
            catch (e) {
                //console.log(e);
                return res.status(500).json(e.message);
            }
            return res.status(200).json("Enfermera resgistrada");
        });
    }
    registPacient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield this.registAddress(req);
                const u = yield this.registUser(req, d);
                req.body.userPacient.idusuario = u;
                yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO paciente set ?", [req.body.userPacient]);
                });
            }
            catch (error) {
                console.log(error.message);
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
            req.body.userNormal.fecha_nac = moment_1.default(req.body.userNormal.fecha_nac, ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"]).format('YYYY/MM/DD');
            console.log(req.body.userNormal.fecha_nac);
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
            //Aqui hacer la creacion del token y enviar el mail
            req.body.userPersonal.email_verify_token = this.createMailTKN();
            //falta el token xd 
            try {
                yield this.sendmail(req);
            }
            catch (error) {
                throw new Error("No funciono el mail");
            }
            //contraseña encriptada
            req.body.userPersonal.password = yield this.encryptPassword(req.body.userPersonal.password).then(a => a);
            console.log(req.body.userPersonal.password);
            try {
                yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO personal set ?", [req.body.userPersonal]);
                });
            }
            catch (error) {
                if (error.code == 'ER_DUP_ENTRY') {
                    throw new Error("Ya existe username o correo");
                }
                else {
                    console.log(error);
                }
            }
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
    sendmail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = Object.assign({}, req.body.userPersonal);
            let url = "http://localhost:3000/api/regist/verifyAccount?id=" + message.email_verify_token;
            let mensaje = "<a href='" + url + "' >Verifica tu cuenta</a>";
            MailHelper_1.mailHelper.to = message.email;
            MailHelper_1.mailHelper.subject = "Verificacion de cuenta Virtual Care";
            MailHelper_1.mailHelper.message = mensaje;
            try {
                let result = MailHelper_1.mailHelper.sendMail();
                return "Mail enviado correctamente";
                //res.status(200).json({ 'result': result })
            }
            catch (err) {
                throw new Error("Hubo un problema con el mail");
            }
        });
    }
    createMailTKN() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < charactersLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    completeProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const u = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT Id FROM personal WHERE username='" + req.usrInfo.usrname + "';");
                });
                const d = this.registAddress(req);
                yield database_1.connect().then((conn) => {
                    return conn.query("UPDATE personal SET idUsuario=" + d + " WHERE Id=" + u + ";");
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("Hubo un error con la actualizacion");
            }
            return res.status(200).json("Perfil actuyalizado");
        });
    }
    completeAcount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.query.id);
            let p;
            try {
                p = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT * FROM personal WHERE email_verify_token='" + req.query.id + "' AND email_check=0;");
                });
            }
            catch (err) {
                console.log(err);
                return res.status(500).json("Hubo un error con la verificacion");
            }
            if (p == null) {
                console.log(p);
                try {
                    const a = yield database_1.connect().then((conn) => {
                        return conn.query("UPDATE personal SET email_check=1 WHERE email_verify_token='" + req.query.id + "';");
                    });
                }
                catch (error) {
                    console.log(error);
                    return res.status(500).json("Hubo un error con la verificacion");
                }
                //Aqui poner la ruta del html de verificacion
                return res.status(200).json("Cuenta verificada");
            }
            //return res.redirect("https://www.google.com");
            return res.status(200).json("Tu cuenta ya esta verificada");
        });
    }
    registEsp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.connect().then((conn) => {
                return conn.query("INSERT INTO especialidades set ?", [req.body.especialidad.nombre]);
            }).catch(error => {
                throw new Error("No se creo la especialidad");
            });
            const i = yield database_1.connect().then((conn) => {
                return conn.query("SELECT MAX(Id) AS id FROM especialidades;");
            });
            if (i.length > 0) {
                console.log(i);
                return i[0].id;
            }
            return 0;
        });
    }
    registStaf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = yield this.registPersonal(req, 0);
                req.body.userAyudante.idpersonal = p;
                yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO ayudante set ?", [req.body.userAyudante]);
                });
            }
            catch (error) {
                //console.log(e);
                return res.status(500).json(error.message);
            }
            return res.status(200).json("Ayudante Registrado");
        });
    }
}
exports.registController = new RegistController();
