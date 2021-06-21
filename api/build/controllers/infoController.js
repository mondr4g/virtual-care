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
exports.infoController = void 0;
const database_1 = require("../database");
class InfoController {
    list(req, res) {
        res.send('hola');
    }
    subirDiagnostico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.diagInfo.receta = JSON.stringify(req.body.diagInfo.receta);
            try {
                const search = yield database_1.connect().then((conn) => {
                    return conn.query("INSERT INTO diagnostico ?", [req.body.diagInfo]);
                });
                res.json("Subido Correctamente");
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    obtenerDiagnostico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idenf = yield database_1.connect().then((conn) => {
<<<<<<< HEAD
                    return conn.query("SELECT Id FROM `enfermera` WHERE `idpersonal`=", req.body.idpersonal);
                });
                const search = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT Id,idPaciente,fecha FROM `consulta` WHERE `idEnfermera`=", idenf[0].Id);
=======
                    return conn.query("SELECT Id FROM `enfermera` WHERE `idpersonal`=" + req.body.idpersonal);
                });
                const search = yield database_1.connect().then((conn) => {
                    return conn.query("SELECT Id,idPaciente,fecha FROM `consulta` WHERE `idEnfermera`=" + idenf[0].Id);
>>>>>>> b3bed880b683b4347f829549d96dab6aa1903b0f
                });
                let c = 0;
                var diagnostico = [];
                let temp;
                let paci;
                let dia;
                do {
                    paci = yield database_1.connect().then((conn) => {
                        return conn.query("SELECT u.nombre FROM `usuario` AS u INNER JOIN `paciente` AS p ON u.Id = p.idusuario WHERE p.idusuario =" +
                            " (SELECT idusuario FROM paciente WHERE id=" + search[c].idPaciente + ")");
                    });
                    dia = yield database_1.connect().then((conn) => {
<<<<<<< HEAD
                        return conn.query("SELECT d.* FROM diagnostico AS d INNER JOIN consulta AS c ON d.idconsulta=c.Id WHERE c.Id=", search[c].Id);
=======
                        return conn.query("SELECT d.* FROM diagnostico AS d INNER JOIN consulta AS c ON d.idconsulta=c.Id WHERE c.Id=" + search[c].Id);
>>>>>>> b3bed880b683b4347f829549d96dab6aa1903b0f
                    });
                    temp = {
                        idcons: search[c].Id,
                        fecha: search[c].fecha,
                        nmbPac: paci[0].nombre,
                        reco: dia[0].recomendaciones,
                        receta: JSON.parse(dia[0].receta)
                    };
                    diagnostico.push(temp);
                    c++;
                    //diagnostico.push();
<<<<<<< HEAD
                } while (search);
                res.status(200).send(diagnostico);
=======
                } while (search[c]);
                res.status(200).json(diagnostico);
>>>>>>> b3bed880b683b4347f829549d96dab6aa1903b0f
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.infoController = new InfoController();
