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
                    return conn.query("SELECT * FROM `personal` WHERE `email`=\'"+
                    [req.body.account]+"\' OR `username`=\'"+[req.body.account]+"\' OR `idUsuario`=\'"+[req.body.account]+"\'");
                });
                if(search.length > 0){
                    if(search[0].email_check==1){
                        
                        if(await bcp.compare(req.body.pass,search[0].password)){
                            //generar JWT
                            var i;
                            console.log(await this.guesswho(search[0].Id));
                            switch(await this.guesswho(search[0].Id)){
                                case 0:i=0;break;//admin
                                case 1:i=1;break;//doctor
                                case 2:i=2;break;//enfermera
                                default: res.status(500).json("Error con la Base de Datos"); return; break;
                            }
                            const token:string = jwt.sign(
                                {
                                    usrname: search[0].username,
                                    email: search[0].email,
                                    pfp: search[0].profileimg,
                                    type: i},
                                process.env.TOKE_SECRET || 'uW0tM8', {expiresIn: '1d'});
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
        res.json(req.usrInfo);
    }

    private async guesswho (id:number): Promise<number>{
        try {
            var i;
            i = await connect().then((conn)=>{
                return conn.query("SELECT * FROM `admin` WHERE `idpersonal`="+id);
            });
            if(i.length>0){
                return 0;
            }

            i = await connect().then((conn)=>{
                return conn.query("SELECT * FROM `doctor` WHERE `idpersonal`="+id);
            });

            if(i.length>0){
                return 1;
            }
            i = await connect().then((conn)=>{
                return conn.query("SELECT * FROM `enfermera` WHERE `idpersonal`="+id);
            });

            if(i.length>0){
                return 2;
            }

            return 3;
        } catch (e) {
            console.log(e);
            return 5;
        }
    }
}

export const authController = new AuthController();