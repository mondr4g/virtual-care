import {Request, Response} from 'express';
import {connect} from '../database';

class usersController{
    
    public index (req:Request, res:Response){
        res.send("hola")
    }
}

export const indexController = new usersController();