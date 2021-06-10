import {Request, Response} from 'express';
import {connect} from '../database';

import bcp from 'bcryptjs';

import jwt from 'jsonwebtoken';

class AuthController{
    public async list (req:Request, res:Response){
        const games = await connect().then((conn)=>{
            return conn.query("SELECT * FROM games");
        });
        res.json(games)
    }
    public async signup (req:Request, res:Response){
        res.json("signup");
    }
    public async signin (req:Request, res:Response){
        //verificando al usuario
        if(req.body.account==""){
            res.json("ingrese una cuenta valida");
        }else{
            try {
                const search = await connect().then((conn)=>{
                    return conn.query("SELECT `password`,`email_check`,`idUsuario` FROM `personal` WHERE `email`=\'"+
                    [req.body.account]+"\' OR `username`=\'"+[req.body.account]+"\' OR `idUsuario`=\'"+[req.body.account]+"\'");
                });
                if(search.length > 0){
                    if(search[0].email_check==1){
                        const pass =await this.verPass(req,search[0].password);
                        console.log(pass);
                        if(search[0].password==pass){
                            //generar JWT
                            var i;
                            switch(await authController.guesswho(search[0].idUsuario)){
                                case 0:i=0;res.json("Es Admin"); break;
                                case 1:i=1;res.json("Es Dotor"); break;
                                case 2:i=2;res.json("Es Enfer"); break;
                                default: res.status(500).json("Error con la Base de Datos"); return; break;
                            }
                            const token:string = jwt.sign({usrnmae: req.body.account,type: i}, process.env.TOKE_SECRET || 'uW0tM8', {expiresIn: '1d'});
                            res.header('auth-token',token).json("Login Exitoso");
                        }else{
                            res.status(400).json("Contraseña Erronea");
                        }
                    }else{
                        res.status(400).json("Cuenta no verificada");
                    }
                }else{
                    res.status(400).json("Usuario no encontrado");
                }
                
            } catch (e) {
                console.log(e);
                res.status(500).json(e);
            }
        }
    }
    public async profile (req:Request, res:Response){
        res.json("profile");
    }

    private async guesswho (id:number): Promise<number>{
        try {
            var i;
            i = await connect().then((conn)=>{
                return conn.query("SELECT * FROM `admin` WHERE `idpersonal`=",id);
            });
            if(i.length>0){
                return 0;
            }

            i = await connect().then((conn)=>{
                return conn.query("SELECT * FROM `doctor` WHERE `idpersonal`=",id);
            });

            if(i.length>0){
                return 1;
            }
            i = await connect().then((conn)=>{
                return conn.query("SELECT * FROM `enfermera` WHERE `idpersonal`=",id);
            });

            if(i.length>0){
                return 2;
            }

            return 3;
        } catch (e) {
            return 5;
        }
    }

    private async verPass(req:Request,dbpas:string): Promise<boolean>{
        console.log(await this.encryptPassword(req.body.pass));
        console.log(dbpas);
        console.log(await bcp.compare(dbpas,await this.encryptPassword(req.body.pass)));
        if(await bcp.compare(dbpas,await this.encryptPassword(req.body.pass))){
            return true;
        }else{
            return false;
        }
    }

    private async encryptPassword(password:string): Promise<string>{
        const salt = await bcp.genSalt(10);
        return bcp.hash(password,salt);
    }
}

export const authController = new AuthController();