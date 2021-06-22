import {Errback, Request, Response} from 'express';
import {connect} from '../database';
import {usersController} from './usersController';
import {registController} from './registController';

class AdminController{
    //get
    public async getUnits(req: Request, res: Response){
        const uns = await connect().then((result) => {
            return result.query("SELECT * FROM unidad_medica ;");
        }).catch((err) => {
            return res.status(500).json(err.message);
        });
        console.log(uns)
        return res.status(200).json(uns);
    }

    public async getUnitsFull(req: Request, res: Response){
        const uns = await connect().then((result) => {
            return result.query("SELECT * FROM unidad_medica AS u INNER JOIN direccion AS d ON u.idDireccion = d.Id;");
        }).catch((err) => {
            return res.status(500).json(err.message);
        });
        return  res.status(200).json(uns);
    }
    
    public async getHelpers(req: Request, res: Response){
        const uns = await connect().then((result) => {
            return result.query("SELECT * FROM ayudante AS a INNER JOIN direccion AS d ON u.idDireccion = d.Id WHERE e.idUnidadmedica = "+req.body.idUnidad+";");
        }).catch((err) => {
            return res.status(500).json(err.message);
        });
        return  res.status(200).json(uns);
    }
    public async getEsps(req: Request, res: Response){
        const uns = await connect().then((result) => {
            return result.query("SELECT * FROM especialidades;");
        }).catch((err) => {
            return res.status(500).json(err.message);
        });
        console.log(uns);
        return res.status(200).json(uns);
    }
    public async getUnitById(req: Request, res:Response){
        //console.log(req.query)
        var id = undefined;
        if(req.query.tipo == String(2)){
            console.log(req.query.id + ":::"+ req.query.tipo)
            id = await connect().then((result) => {
                return result.query("SELECT idUnidadMedica FROM enfermera WHERE idpersonal = "+req.query.id+" ;");
            }).catch((err) => {
                return res.status(500).json(err.message);
            });
        }else{
            id = await connect().then((result) => {
                return result.query("SELECT idUnidadMedica FROM ayudante WHERE idpersonal = "+Number(req.query.id)+" ;");
            }).catch((err) => {
                return res.status(500).json(err.message);
            });
        }
        //console.log(id);
        return res.status(200).json(id);
    }
    //post
    public async postUnit(req: Request, res: Response){
        req.body.unitInfo.idDireccion = registController.registAddress(req);
        await connect().then((result) => {
            return result.query("INSERT INTO unidad_medica SET ?;"[req.body.unitInfo]);
        }).catch((err) => {
            return res.status(500).json(err.message);
        });
        return  res.status(200).json("Unidad registrada correctamente");
    }
    
    //put //Faltan estas
    public async putUnit(req:Request, res:Response){

    }
    public async putDoctor(req:Request, res:Response){
        
    }
    public async putHelper(req:Request, res:Response){
        
    }
    public async putNurse(req:Request, res:Response){
        
    }
    //del
    public async delUnit(req:Request, res:Response){
        await connect().then(result =>{
            result.query("DELETE FROM unidad_medica WHERE IdUnidad = "+req.params.id+";");
        }).catch((error)=>{
            return res.status(500).json("algo fallo");
        });
        
    }
    public async delNurse(req:Request, res:Response){
        await connect().then(result =>{
            result.query("DELETE FROM enfermera WHERE Id = "+req.params.id+";");
        }).catch((error)=>{
            return res.status(500).json("algo fallo");
        });
    }
    public async delDoctor(req: Request, res:Response){
        await connect().then(result =>{
            result.query("DELETE FROM doctor WHERE Id = "+req.params.id+";");
        }).catch((error)=>{
            return res.status(500).json("algo fallo");
        });
    }
    public async delHelper(req:Request, res:Response){
        await connect().then(result =>{
            result.query("DELETE FROM ayudante WHERE Id = "+req.params.id+";");
        }).catch((error)=>{
            return res.status(500).json("algo fallo");
        });
    }
    public async isNewPatient(req: Request, res: Response){
        console.log(req.query.id)
        const i = await connect().then(result =>{
            return result.query("SELECT * FROM historialmedico WHERE idpaciente="+req.query.id+" ;");
        }).catch((error)=>{
            return res.status(500).json("algo fallo");
        });
        console.log(i);
        if(i[0]==null){
            return res.status(200).json({"new":false});
        }else{
            return res.status(200).json({"new":true});
        }
        
    }

    public async getPersonalId(req: Request, res:Response){
        console.log(req.query.id);
        const i = await connect().then(result =>{
            return result.query("SELECT e.idpersonal FROM enfermera AS e WHERE e.Id="+req.query.id+" ;");
        }).catch((error)=>{
            return res.status(500).json("algo fallo");
        });
        console.log(i);
        if(i[0]==null){
            return res.status(200).json({"id":null});
        }else{
            return res.status(200).json({"id":i[0].idpersonal});
        }
    }

    public async getPersonalIdD(req: Request, res:Response){
        console.log(req.query.id);
        const i = await connect().then(result =>{
            return result.query("SELECT e.idpersonal FROM doctor AS e WHERE e.Id="+req.query.id+" ;");
        }).catch((error)=>{
            return res.status(500).json("algo fallo");
        });
        console.log(i);
        if(i[0]==null){
            return res.status(200).json({"id":null});
        }else{
            return res.status(200).json({"id":i[0].idpersonal});
        }
    }
}
export const adminController = new AdminController();
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