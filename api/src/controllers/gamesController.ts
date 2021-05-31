import {Request, Response} from 'express';

import {connect} from '../database';


class GamesController{
    
    public async list (req:Request, res:Response){
        const games = await connect().then((conn)=>{
            return conn.query("SELECT * FROM games");
        });
        res.json(games)
    }

    public async create(req:Request, res:Response): Promise<void>{
        console.log(req.body);
        await connect().then((conn)=>{
            return conn.query("INSERT INTO games set ?",[req.body]);
        });
        res.json('Juego guardado');
    }

    public async delete(req:Request, res:Response){
        const {id} = req.params;
        await connect().then((conn)=>{
            return conn.query("DELETE FROM games WHERE id = ?",[id]);
        });
        res.json({message:"Juego eliminado "});
    }
    public async update(req:Request, res:Response){
        const {id} = req.params;
        await connect().then((conn)=>{
            return conn.query("UPDATE games set ? WHERE id = ?",[req.body,id]);
        });
        res.json({text:"Juego actualizado"});
    }
    public async getOne(req:Request, res:Response){
        const {id} = req.params;
        const g = await connect().then((conn)=>{
            return conn.query("SELECT * FROM games WHERE id = ?",[id]);
        });
        if(g.length>0){
            return res.json(g[0]);
        }
        
        res.status(404).json({text: "juego no existe"});
    }
}

export const gamesController = new GamesController();