import {Request, Response} from 'express';
import {connect} from '../database';

import bcp from 'bcryptjs';

import jwt from 'jsonwebtoken';

class infoController{
    public async subirDiagnostico(req: Request, res: Response){
        try{
            const search = await connect().then((conn)=>{
                return conn.query("INSERT INTO diagnostico ?",[req.body.diagInfo]);
            });
            res.json("Subido Correctamente");
        }catch (e){
            console.log(e);
        }
    }

    public async obtenerDiagnostico(req: Request, res: Response) {
        try{
            const idenf = await connect().then((conn)=>{
                return conn.query("SELECT Id FROM `enfermera` WHERE `idpersonal`=",req.body.idpersonal);
            });
            const search = await connect().then((conn)=>{
                return conn.query("SELECT Id FROM `peticiones_consulta` WHERE `idEnfermera`=",idenf[0].Id);
            });
            let c=0;
            let diagnostico:Array<any>;
            do{
                //diagnostico.push();
            }while(search);
        }catch (e){
            console.log(e);
        }
    }
}

export const authController = new infoController();

interface IDiag{
    idcons:number,
    fech: Date,
    nmbPac: string,
    receta: {
        meds: string,
        inst: string
    }

}