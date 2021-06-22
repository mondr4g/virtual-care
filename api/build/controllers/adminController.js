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
exports.adminController = void 0;
const database_1 = require("../database");
const registController_1 = require("./registController");
class AdminController {
    //get
    getUnits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uns = yield database_1.connect().then((result) => {
                return result.query("SELECT * FROM unidad_medica ;");
            }).catch((err) => {
                return res.status(500).json(err.message);
            });
            console.log(uns);
            return res.status(200).json(uns);
        });
    }
    getUnitsFull(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uns = yield database_1.connect().then((result) => {
                return result.query("SELECT * FROM unidad_medica AS u INNER JOIN direccion AS d ON u.idDireccion = d.Id;");
            }).catch((err) => {
                return res.status(500).json(err.message);
            });
            return res.status(200).json(uns);
        });
    }
    getHelpers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uns = yield database_1.connect().then((result) => {
                return result.query("SELECT * FROM ayudante AS a INNER JOIN direccion AS d ON u.idDireccion = d.Id WHERE e.idUnidadmedica = " + req.body.idUnidad + ";");
            }).catch((err) => {
                return res.status(500).json(err.message);
            });
            return res.status(200).json(uns);
        });
    }
    getEsps(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uns = yield database_1.connect().then((result) => {
                return result.query("SELECT * FROM especialidades;");
            }).catch((err) => {
                return res.status(500).json(err.message);
            });
            console.log(uns);
            return res.status(200).json(uns);
        });
    }
    getUnitById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.query)
            var id = undefined;
            if (req.query.tipo == String(2)) {
                console.log(req.query.id + ":::" + req.query.tipo);
                id = yield database_1.connect().then((result) => {
                    return result.query("SELECT idUnidadMedica FROM enfermera WHERE idpersonal = " + req.query.id + " ;");
                }).catch((err) => {
                    return res.status(500).json(err.message);
                });
            }
            else {
                id = yield database_1.connect().then((result) => {
                    return result.query("SELECT idUnidadMedica FROM ayudante WHERE idpersonal = " + Number(req.query.id) + " ;");
                }).catch((err) => {
                    return res.status(500).json(err.message);
                });
            }
            //console.log(id);
            return res.status(200).json(id);
        });
    }
    //post
    postUnit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.unitInfo.idDireccion = registController_1.registController.registAddress(req);
            yield database_1.connect().then((result) => {
                return result.query("INSERT INTO unidad_medica SET ?;"[req.body.unitInfo]);
            }).catch((err) => {
                return res.status(500).json(err.message);
            });
            return res.status(200).json("Unidad registrada correctamente");
        });
    }
    //put //Faltan estas
    putUnit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    putDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    putHelper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    putNurse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //del
    delUnit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.connect().then(result => {
                result.query("DELETE FROM unidad_medica WHERE IdUnidad = " + req.params.id + ";");
            }).catch((error) => {
                return res.status(500).json("algo fallo");
            });
        });
    }
    delNurse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.connect().then(result => {
                result.query("DELETE FROM enfermera WHERE Id = " + req.params.id + ";");
            }).catch((error) => {
                return res.status(500).json("algo fallo");
            });
        });
    }
    delDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.connect().then(result => {
                result.query("DELETE FROM doctor WHERE Id = " + req.params.id + ";");
            }).catch((error) => {
                return res.status(500).json("algo fallo");
            });
        });
    }
    delHelper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.connect().then(result => {
                result.query("DELETE FROM ayudante WHERE Id = " + req.params.id + ";");
            }).catch((error) => {
                return res.status(500).json("algo fallo");
            });
        });
    }
}
exports.adminController = new AdminController();
/* Esto nel
 public async getNurses(req: Request, res: Response){
        var d;
        try {
            d = await usersController.getNurses.bind(usersController);
        } catch (error:any) {
            console.log(error.message);
            return res.status(500).json(error.message);
        }
        return  res.status(200).json(d);
    }
    public async getDoctors(req: Request, res: Response){
        var d;
        try {
            d = await usersController.getDoctors.bind(usersController);
        } catch (error:any) {
            console.log(error.message);
            return res.status(500).json(error.message);
        }
        return  res.status(200).json(d);
    }
    public async getPacients(req: Request, res: Response){
        var d;
        try {
            d = await usersController.getPacients.bind(usersController);
        } catch (error:any) {
            console.log(error.message);
            return res.status(500).json(error.message);
        }
        return  res.status(200).json(d);
    }
    public async postDoctor(req: Request, res: Response){

    }
    
    public async postNurse(req: Request, res: Response){

    }
    
    public async postPacient(req: Request, res: Response){

    }
    public async postHelper(req: Request, res: Response){
        try {
            registController.registStaf.bind(registController);
        } catch (error) {
            
        }
        
    }
*/ 
