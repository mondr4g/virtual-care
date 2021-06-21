import {Errback, Request, Response} from 'express';
import {connect} from '../database';

import bcp from 'bcryptjs';

import {mailHelper} from '../helpers/MailHelper';

import moment from 'moment';

import {UserPersonal} from '../models/userPersonal';
import {UserAddress} from '../models/userAddress';
import { UserNormal } from 'models/userNormal';

class RegistController{

    public async registDoctor (req:Request, res:Response){
        try{
            const p = await this.registPersonal(req,0,true);
            req.body.userDoctor.idpersonal=p;
            if(req.body.idEspecialidad == null){
                req.body.idEspecialidad = await this.registEsp(req);
            }
            await connect().then((conn)=>{
                return conn.query("INSERT INTO doctor set ?",[req.body.userDoctor]);
            });
        }catch(e: any){
            console.log(e.message);
            return res.status(500).json(e.message);
        }
        return  res.status(200).json("Doctor registrado");
    }
    public async registNurse (req:Request, res:Response){
        try{
            const p = await this.registPersonal(req,0,false);
            console.log(p);
            req.body.userNurse.idpersonal=p;
            await connect().then((conn)=>{
                return conn.query("INSERT INTO enfermera set ?",[req.body.userNurse]);
            });
        }catch(e:any){
            //console.log(e);
            return res.status(500).json(e.message);
        }
        return res.status(200).json("Enfermera resgistrada");
        
    }
    public async registPacient (req:Request, res:Response){
        try {
            const d = await this.registAddress(req);
            const u = await this.registUser(req, d);
            req.body.userPacient.idusuario = u;
            await connect().then((conn)=>{
                return conn.query("INSERT INTO paciente set ?",[req.body.userPacient]);
            });
        } catch (error:any) {
            console.log(error.message);
        }
        res.json("Paciente registrado");
    }

    public async registAddress(req:Request):Promise<number>{
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
        req.body.userNormal.fecha_nac = moment(req.body.userNormal.fecha_nac, ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"]).format('YYYY/MM/DD');
        console.log(req.body.userNormal.fecha_nac);
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

    
    private async registPersonal(req:Request, id:number, ned:boolean):Promise<number>{
        if(id==0){
            req.body.userPersonal.idUsuario = null;
            
        }else{
            req.body.userPersonal.idUsuario = id;
        }
        if(ned){
            //Aqui hacer la creacion del token y enviar el mail
            req.body.userPersonal.email_verify_token = this.createMailTKN();
            //falta el token xd 
            try{
                await this.sendmail(req);
            }catch(error){
                throw new Error("No funciono el mail");
                
            }
        }else{
            req.body.userPersonal.email_verify_token = "completo";
            req.body.userPersonal.email_check = true;
        }
        
        //contraseña encriptada
        req.body.userPersonal.password = await this.encryptPassword(req.body.userPersonal.password).then(a=>a);
        console.log(req.body.userPersonal.password);
        try{
            await connect().then((conn)=>{
                return conn.query("INSERT INTO personal set ?",[req.body.userPersonal]);
            });
            
        }catch(error:any)
        {
            if(error.code == 'ER_DUP_ENTRY'){
                throw new Error("Ya existe username o correo");
            }else{
                console.log(error);
            }
        }
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

    private async sendmail(req: Request){
        const message = Object.assign({}, req.body.userPersonal);

        let url = "http://localhost:3000/api/regist/verifyAccount?id="+message.email_verify_token;

        let mensaje = "<a href='"+url+"' >Verifica tu cuenta</a>";
        mailHelper.to = message.email;
        mailHelper.subject = "Verificacion de cuenta Virtual Care";
        mailHelper.message = mensaje;
        
        try{
            let result = mailHelper.sendMail();

            return "Mail enviado correctamente";
            //res.status(200).json({ 'result': result })
        }catch(err){
            throw new Error("Hubo un problema con el mail");
            
        }  
    } 

    private createMailTKN():string{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < charactersLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    public async completeProfile(req:Request, res:Response){
        try{
            const u = await connect().then((conn)=>{
                return conn.query("SELECT Id FROM personal WHERE username='"+req.usrInfo.usrname+"';");
            });
            const d = this.registAddress(req);
            await connect().then((conn)=>{
                return conn.query("UPDATE personal SET idUsuario="+d+" WHERE Id="+u+";");
            });
        }catch(error){
            console.log(error);
                return res.status(500).json("Hubo un error con la actualizacion");
        }
        return res.status(200).json("Perfil actuyalizado");
    }

    public async completeAcount(req:Request, res:Response){
        console.log(req.query.id);
        let p;
        try{
            p = await connect().then((conn)=>{
                return conn.query("SELECT * FROM personal WHERE email_verify_token='"+req.query.id+"' AND email_check=0;");
            });
        }catch(err){
            console.log(err);
            return res.status(500).json("Hubo un error con la verificacion");
        }
        if(p==null){
            console.log(p);
            try {
                const a = await connect().then((conn)=>{
                    return conn.query("UPDATE personal SET email_check=1 WHERE email_verify_token='"+req.query.id+"';");
                });
            } catch (error) {
                console.log(error);
                return res.status(500).json("Hubo un error con la verificacion");
            }
            //Aqui poner la ruta del html de verificacion
            return res.status(200).json("Cuenta verificada");
        }

        //return res.redirect("https://www.google.com");
        return res.status(200).json("Tu cuenta ya esta verificada");
       
    }

    private async registEsp(req: Request):Promise<number>{
        await connect().then((conn)=>{
            return conn.query("INSERT INTO especialidades set ?",[req.body.especialidad.nombre]);
        }).catch(error=>{
            throw new Error("No se creo la especialidad");
        });
        const i = await connect().then((conn)=>{
            return conn.query("SELECT MAX(Id) AS id FROM especialidades;");
        }); 
        if(i.length>0){
            console.log(i);
            return i[0].id;
        }
        return 0;
        
    }

    public async registStaf(req: Request, res: Response){
        try {
            const p = await this.registPersonal(req,0,false);
            req.body.userAyudante.idpersonal=p;
            await connect().then((conn)=>{
                return conn.query("INSERT INTO ayudante set ?", [req.body.userAyudante]);
            });
        } catch (error: any) {
            //console.log(e);
            return res.status(500).json(error.message);
        }
        return res.status(200).json("Ayudante Registrado");
    }

    public async registAdmin(req: Request, res: Response){
        try {
            const p = await this.registPersonal(req,0,false);
            req.body.userAdmin.idpersonal=p;
            await connect().then((conn)=>{
                return conn.query("INSERT INTO admin set ?", [req.body.userAdmin]);
            });
        } catch (error: any) {
            //console.log(error);
            return res.status(500).json(error.message);
        }
        return res.status(200).json("Admin Registrado");
    }
    
}

export const registController = new RegistController();