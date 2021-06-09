import {Request, Response} from 'express';
import {connect} from '../database';

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
        res.json("signin");
        if(req.body.account==""){
            res.json("ingrese una cuenta valida");
        }else{
            try {
                const search = await connect().then((conn)=>{
                    return conn.query('SELECT * FROM `personal` WHERE `email`="'+[req.body.account]
                    +'" OR `username`="'+[req.body.account]+'" OR `idUsuario`="'+[req.body.account]+'"');
                });
                if(search.length > 0){
                    
                }else{
                    res.json("Usuario no encontrado");
                }
                
            } catch (e) {
                console.log(e);
            }
        }
    }
    public async profile (req:Request, res:Response){
        res.json("profile");
    }
}

export const authController = new AuthController();