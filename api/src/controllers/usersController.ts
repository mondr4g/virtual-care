import {Request, Response} from 'express';
import {connect} from '../database';

class UsersController{
    
    public index (req:Request, res:Response){
        res.send("hola")
    }

    public async getDoctors(req:Request, res:Response){
        const ds =await connect().then((conn)=>{
            return conn.query("SELECT * FROM doctor INNER JOIN personal ON doctor.idpersonal = personal.Id;");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Medico no encontrado"); 
        })
        return res.json(ds);
    }

    public async getDoctorInfo(req:Request, res:Response){
        
        const d = await connect().then((conn)=>{
            return conn.query("SELECT * FROM doctor INNER JOIN personal ON doctor.idpersonal = personal.Id WHERE Id="+req.query.id+";");
        }).catch(err=>{
            console.log(err)
            return res.status(400).json("Medico no encontrado"); 
        })
        
        return res.json(d);
    }

    public async getNurses(req:Request, res:Response){
        const es =await connect().then((conn)=>{
            return conn.query("SELECT * FROM enfermera INNER JOIN personal ON enfermera.idpersonal = personal.Id;");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Medico no encontrado"); 
        })
        return res.json(es);
    }

    public async getNurseInfo(req:Request, res: Response){
        const d = await connect().then((conn)=>{
            return conn.query("SELECT * FROM enfermera INNER JOIN personal ON doctor.idpersonal = personal.Id WHERE Id="+req.query.id+";");
        }).catch(err=>{
            console.log(err)
            return res.status(400).json("Medico no encontrado"); 
        })
        
        return res.json(d);
    }

    public async getPacients(req:Request, res:Response){

    }

    public async getPacientInfo(req:Request, res:Response){

    }
   
}

export const usersController = new UsersController();