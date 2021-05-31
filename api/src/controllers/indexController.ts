import {Request, Response} from 'express';
import {connect} from '../database';

class IndexController{
    
    public index (req:Request, res:Response){
        res.send("hola")
    }
}

export const indexController = new IndexController();