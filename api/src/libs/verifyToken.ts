import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import {IPayload} from '../models/tokenPayload';

export const tokenValid = (req: Request, res: Response, next:NextFunction)=>{
    const token = req.header('auth-token');
    console.log(token);
    if(!token) return res.status(401).json("Acceso denegado");
    
    const payload = jwt.verify(token, process.env.TOKE_SECRET || 'uW0tM8') as IPayload;
    req.usrInfo=payload;
    console.log(payload);

    next();
}