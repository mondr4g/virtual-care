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
    }
    public async profile (req:Request, res:Response){
        res.json("profile");
    }
}

export const authController = new AuthController();