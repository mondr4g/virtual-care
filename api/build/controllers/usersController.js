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
            const es = yield database_1.connect().then((conn) => {
                return conn.query("SELECT u.nombre, u.apellido, u.telefono, p.username, p.email, p.profileimg, un.nombre AS 'Unidad Medica' " +
                    "FROM usuario AS u " +
                    "INNER JOIN personal AS p ON u.Id=p.idUsuario " +
                    "INNER JOIN enfermera AS e ON p.Id = e.idpersonal " +
                    "INNER JOIN unidad_medica AS un ON e.idUnidadmedica = un.IdUnidad" +
                    "WHERE e.idUnidadmedica = " + req.body.idUnidad + ";");
            }).catch(error => {
                console.log(error);
                return res.status(400).json("Medico no encontrado");
            });
            return res.json(es);
        });
    }
    getNurseInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const d = yield database_1.connect().then((conn) => {
                return conn.query("SELECT * " +
                    "FROM enfermera AS e " +
                    "INNER JOIN personal AS p ON e.idpersonal = p.Id " +
                    "INNER JOIN unidad_medica AS un ON e.idUnidadmedica = un.IdUnidad " +
                    "WHERE e.Id=" + req.query.id + ";");
            }).catch(err => {
                console.log(err);
                return res.status(400).json("Medico no encontrado");
            });
            return res.json(d);
        });
    }
    getPacients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const es = yield database_1.connect().then((conn) => {
                return conn.query("SELECT u.nombre, u.apellido" +
                    "FROM usuario AS u" +
                    "INNER JOIN direccion AS d ON u.direccionId = d.Id" +
                    "INNER JOIN paciente AS p ON p.idusuario = u.Id" +
                    "INNER JOIN unidad_medica AS un ON p.idUnidadmedica = un.IdUnidad" +
                    "WHERE p.idUnidadmedica = " + req.query.unidad + "" +
                    ";");
            }).catch(error => {
                console.log(error);
                return res.status(400).json("Pacientes no encontrados");
            });
            return res.json(es);
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
