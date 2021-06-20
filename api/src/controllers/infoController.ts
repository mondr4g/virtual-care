import {Request, Response} from 'express';
import {connect} from '../database';

import bcp from 'bcryptjs';

import jwt from 'jsonwebtoken';

class infoController{
    public async subirDiagnostico(req: Request, res: Response){
        req.body.diagInfo.receta = JSON.parse(req.body.diagInfo.receta);
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
                return conn.query("SELECT Id,idPaciente,fecha FROM `consulta` WHERE `idEnfermera`=",idenf[0].Id);
            });
            let c=0;
            var diagnostico:Array<IDiag>=[];
            let temp: IDiag;
            let paci;let dia;
            
            do{
                paci = await connect().then((conn)=>{
                    return conn.query(
                        "SELECT u.nombre FROM `usuario` AS u INNER JOIN `paciente` AS p ON u.Id = p.idusuario WHERE p.idusuario ="+
                        " (SELECT idusuario FROM paciente WHERE id="+search[c].idPaciente+")");
                });
                dia = await connect().then((conn)=>{
                    return conn.query(
                        "SELECT d.* FROM diagnostico AS d INNER JOIN consulta AS c ON d.idconsulta=c.Id WHERE c.Id=",search[c].Id
                    );
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
            }while(search);
            res.status(200).send(diagnostico);
        }catch (e){
            console.log(e);
        }
    }
}

export const authController = new infoController();

interface IDiag{
    idcons:number,
    fecha: Date,
    nmbPac: string,
    reco: string,
    receta: {
        meds:[],
        inst:[]
    }

}