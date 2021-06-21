import {Errback, Request, Response} from 'express';
import {connect} from '../database';
import {usersController} from './usersController';
import {registController} from './registController';

class AdminController{
    //get
    public async getUnits(req: Request, res: Response){
        const uns = await connect().then((result) => {
            result.query("SELECT *,u.IdUnidad FROM unidad_medica AS u INNER JOIN direccion AS d ON u.idDireccion = d.Id;");
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