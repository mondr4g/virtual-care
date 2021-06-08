import {Request, Response} from 'express';
import {connect} from '../database';

import bcp from 'bcryptjs';

import {UserPersonal} from '../models/userPersonal';
import {UserAddress} from '../models/userAddress';
import { UserNormal } from 'models/userNormal';

class RegistController{

    public async registDoctor (req:Request, res:Response){
        try{
            const p = await this.registPersonal(req,0);
            req.body.userDoctor.idpersonal=p;
            await connect().then((conn)=>{
                return conn.query("INSERT INTO doctor set ?",[req.body.userDoctor]);
            });
        }catch(e){
            console.log(e);
        }
        res.json("Doctor registrado");
    }
    public async registNurse (req:Request, res:Response){
        try{
            const p = await this.registPersonal(req,0);
            req.body.userNurse.idpersonal=p;
            await connect().then((conn)=>{
                return conn.query("INSERT INTO enfermera set ?",[req.body.userNurse]);
            });
        }catch(e){
            console.log(e);
        }
        res.json("Enfermera resgistrada");
    }
    public async registPacient (req:Request, res:Response){
        try {
            const d = await this.registAddress(req);
            const u = await this.registUser(req, d);
            await connect().then((conn)=>{
                return conn.query("INSERT INTO enfermera set ?",[req.body.userNurse]);
            });
        } catch (error) {
            console.log(error);
            res.json("Hubo un error");
        }
        res.json("Paciente registrado");
    }

    private async registAddress(req:Request):Promise<number>{
        await connect().then((conn)=>{
            return conn.query("INSERT INTO direccion set ?",[req.body.userAddress]);
        });
        const i = await connect().then((conn)=>{
            return conn.query("SELECT MAX(Id) AS id FROM direccion");
        }); 
        if(i.length>0){
            console.log(i[0].id);
            return i[0].id;
        }
        return 0;
    }

    private async registUser(req:Request, id:number):Promise<number>{
        req.body.userNormal.direccionId = id;
        await connect().then((conn)=>{
            return conn.query("INSERT INTO usuario set ?",[req.body.userNormal]);
        });
        const i = await connect().then((conn)=>{
            return conn.query("SELECT MAX(Id) AS id FROM usuario");
        }); 
        if(i.length>0){
            console.log(i);
            return i[0].id;
        }
        return 0;
    }

    
    private async registPersonal(req:Request, id:number):Promise<number>{
        if(id==0){
            req.body.userPersonal.idUsuario = null;
        }else{
            req.body.userPersonal.idUsuario = id;
        }
        //Aqui hacer la validacion del email

        //contraseña encriptada
        req.body.userPersonal.password = this.encryptPassword(req.body.userPersonal.password);
        await connect().then((conn)=>{
            return conn.query("INSERT INTO personal set ?",[req.body.userPersonal]);
        });
        const i = await connect().then((conn)=>{
            return conn.query("SELECT MAX(Id) AS id FROM personal");
        }); 
        if(i.length>0){
            console.log(i);
            return i[0].id;
        }
        return 0;
    }

    private async encryptPassword(password:string): Promise<string>{
        const salt = await bcp.genSalt(10);
        return bcp.hash(password,salt);
    }
}

export const registController = new RegistController();