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
exports.usersController = void 0;
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsersController {
    index(req, res) {
        res.send("hola");
    }
    encryptPass(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            return bcryptjs_1.default.hash(password, salt);
        });
    }
    updateNurse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                const modd = yield database_1.connect().then((conn) => {
                    return conn.query("UPDATE `direccion` SET `calle`='" + req.body.dire.calle + "',`numero`='" + req.body.dire.numero + "',`interior`='" + req.body.dire.interior + "',`colonia`='" + req.body.dire.colonia +
                        "',`cp`='" + req.body.dire.cp + "',`ciudad`='" + req.body.dire.ciudad + "',`estado`='" + req.body.dire.estado + "',`pais`='" + req.body.dire.pais + "' WHERE Id=" + req.body.dire.Id + ";");
                });
                const modu = yield database_1.connect().then((conn) => {
                    return conn.query("UPDATE `usuario` SET `nombre`='" + req.body.user.nombre + "',`apellido`='" + req.body.user.apellido + "',`genero`='" + req.body.user.genero +
                        "',`fecha_nac`='" + req.body.user.fecha_nac + "',`telefono`='" + req.body.user.telefono + "',`celular`='" + req.body.user.celular + "' WHERE Id=" + req.body.user.Id + ";");
                });
                if (req.body.pers.password == '') {
                    const modp = yield database_1.connect().then((conn) => {
                        return conn.query("UPDATE `personal` SET `email`='" + req.body.pers.email + "',`username`='" + req.body.pers.username +
                            "',`profileimg`='" + req.body.pers.profileimg + "' WHERE Id=" + req.body.pers.Id + ";");
                    });
                }
                else {
                    req.body.pers.password = this.encryptPass(req.body.pers.password);
                    const modp = yield database_1.connect().then((conn) => {
                        return conn.query("UPDATE `personal` SET `email`='" + req.body.pers.email + "',`username`='" + req.body.pers.username +
                            "',`password`='" + req.body.pers.password + "',`profileimg`='" + req.body.pers.profileimg + "' WHERE Id=" + req.body.pers.Id + ";");
                    });
                }
                const modn = yield database_1.connect().then((conn) => {
                    return conn.query("UPDATE `enfermera` SET `idUnidadmedica`=" + req.body.nurs.idUnidadmedica + " WHERE Id=" + req.body.nurs.Id + ";");
                });
                res.status(200).json("Se actualizo la enfermera");
            }
            catch (error) {
                console.log(error);
                return res.status(400).json("Medico no encontrado");
            }
        });
    }
    getDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ds = yield database_1.connect().then((conn) => {
                return conn.query("SELECT u.nombre, u.apellido, u.telefono, p.username, p.email, p.profileimg, d.cedula, es.nombre AS 'Especialidad' " +
                    "FROM usuario AS u " +
                    "INNER JOIN personal AS p ON u.Id=p.idUsuario " +
                    "INNER JOIN doctor AS d ON p.Id = d.idpersonal" +
                    "INNER JOIN especialidades AS es ON d.idEspecialidad = es.Id;");
            }).catch(error => {
                console.log(error);
                return res.status(400).json("Medico no encontrado");
            });
            return res.json(ds);
        });
    }
    getDoctorInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const d = yield database_1.connect().then((conn) => {
                return conn.query("SELECT * " +
                    "FROM doctor AS d " +
                    "INNER JOIN personal AS p ON d.idpersonal = p.Id " +
                    "INNER JOIN usuario AS u ON u.Id=p.idUsuario " +
                    "INNER JOIN especialidades AS es ON d.idEspecialidad = es.Id " +
                    "WHERE d.Id=" + req.query.id + ";");
            }).catch(err => {
                console.log(err);
                return res.status(400).json("Medico no encontrado");
            });
            return res.json(d);
        });
    }
    getNurses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var a = Number(req.query.id);
            var answe;
            try {
                const usr = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT u.* " +
                        "FROM enfermera AS e INNER JOIN personal AS p ON e.idpersonal = p.Id " +
                        "INNER JOIN usuario AS u ON p.idUsuario = u.Id WHERE e.Id=" + a + ";");
                });
                const per = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT p.* " +
                        "FROM enfermera AS e INNER JOIN personal AS p ON e.idpersonal = p.Id " +
                        "WHERE e.Id=" + a + ";");
                });
                const dir = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT d.* FROM enfermera AS e INNER JOIN personal AS p ON e.idpersonal = p.Id INNER JOIN usuario AS u ON p.idUsuario = u.Id INNER JOIN direccion AS d ON u.direccionId = d.Id WHERE e.Id=" + a + ";");
                });
                const uni = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT u.* FROM enfermera AS e INNER JOIN unidad_medica AS u ON e.idUnidadmedica = u.IdUnidad WHERE e.Id=" + a + ";");
                });
                const enf = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT * FROM enfermera AS e WHERE e.Id=" + a + ";");
                });
                answe = {
                    user: usr[0],
                    pers: per[0],
                    dire: dir[0],
                    unid: uni[0],
                    enfe: enf[0]
                };
                return res.json(answe);
            }
            catch (error) {
                console.log(error);
                return res.status(400).json("enfermera/o no encontrada/o");
            }
        });
    }
    getNurseInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const d = yield database_1.connect().then((conn) => {
                return conn.query("SELECT e.Id,p.email,p.username,u.direccionId FROM enfermera AS e INNER JOIN personal AS p ON e.idpersonal = p.Id INNER JOIN usuario AS u ON p.idUsuario = u.Id");
                //"WHERE e.Id="+req.query.id+";");
            }).catch(err => {
                console.log(err);
                return res.status(400).json("Medico no encontrado");
            });
            return res.json(d);
        });
    }
    elimNurse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const e = yield database_1.connect().then((conn) => {
                return conn.query("DELETE FROM `direccion` WHERE Id=" + req.query.id);
                //"WHERE e.Id="+req.query.id+";");
            }).catch(err => {
                console.log(err);
                return res.status(400).json("Medico no encontrado");
            });
            console.log(e);
            return res.status(200).json(e);
        });
    }
    getPacients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const es = yield database_1.connect().then((conn) => {
                return conn.query("SELECT p.Id, u.nombre, u.apellido, p.CURP " +
                    "FROM usuario AS u " +
                    "INNER JOIN direccion AS d ON u.direccionId = d.Id " +
                    "INNER JOIN paciente AS p ON p.idusuario = u.Id " +
                    "INNER JOIN unidad_medica AS un ON p.idUnidadmedica = un.IdUnidad " +
                    "WHERE p.CURP = '" + req.query.curp + "'" +
                    ";");
            }).catch(error => {
                console.log(error);
                return res.status(400).json("Pacientes no encontrados");
            });
            return res.status(200).json(es);
        });
    }
    getPacientInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const es = yield database_1.connect().then((conn) => {
                return conn.query("SELECT *" +
                    "FROM usuario AS u" +
                    "INNER JOIN direccion AS d ON u.direccionId = d.Id" +
                    "INNER JOIN paciente AS p ON p.idusuario = u.Id" +
                    "INNER JOIN unidad_medica AS un ON p.idUnidadmedica = un.IdUnidad" +
                    "WHERE p.Id = " + req.query.paciente + "" +
                    ";");
            }).catch(error => {
                console.log(error);
                return res.status(400).json("Paciente no encontrado");
            });
            return res.json(es);
        });
    }
    /*public async getPacientsByUnit(req: Request, res:Response){
        const es = await connect().then((conn) => {
            return conn.query("");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Paciente no encontrado");
        });
        return  res.json(es);
    }
     public async getDoctorsWithEsp(req: Request, res: Response){
        const es = await connect().then((conn) => {
            return conn.query("");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Paciente no encontrado");
        });
        return  res.json(es);
    }
    */
    getEspecialidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const es = yield database_1.connect().then((conn) => {
                return conn.query("SELECT e.Id, e.nombre  FROM especialidades AS e");
            }).catch(error => {
                console.log(error);
                return res.status(400).json("No existen especialidades");
            });
            return res.json(es);
        });
    }
    getDoctorsByEspe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const es = yield database_1.connect().then((conn) => {
                return conn.query("SELECT u.nombre, u.apellido, u.telefono, p.username, p.email, p.profileimg, d.cedula " +
                    "FROM usuario AS u " +
                    "INNER JOIN personal AS p ON u.Id=p.idUsuario " +
                    "INNER JOIN doctor AS d ON p.Id = d.idpersonal " +
                    "INNER JOIN especialidades es ON d.idEspecialidad = es.Id " +
                    "WHERE d.idEspecialidad = '" + req.body.especialidad.Id + "' " +
                    ";");
            }).catch(error => {
                console.log(error);
                return res.status(400).json("Paciente no encontrado");
            });
            return res.json(es);
        });
    }
    getMedicUnits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const es = yield database_1.connect().then((conn) => {
                return conn.query("SELECT * FROM unidad_medica");
            }).catch(error => {
                console.log(error);
                return res.status(400).json("No hay unidades medicas");
            });
            return res.json(es);
        });
    }
    searchPacient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const es = yield database_1.connect().then((conn) => {
                return conn.query("SELECT u.nombre, u.apellido" +
                    "FROM usuario AS u" +
                    "INNER JOIN direccion AS d ON u.direccionId = d.Id" +
                    "INNER JOIN paciente AS p ON p.idusuario = u.Id" +
                    "INNER JOIN unidad_medica AS un ON p.idUnidadmedica = un.Id" +
                    "WHERE p.idUnidadmedica = " + req.body.unidad + " && p.CURP='" + req.body.curp + "'" +
                    ";");
            }).catch(error => {
                console.log(error);
                return res.status(400).json("Paciente no encontrado");
            });
            return res.json(es);
        });
    }
}
exports.usersController = new UsersController();
