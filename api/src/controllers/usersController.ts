import {Request, Response} from 'express';
import {connect} from '../database';

import bcp from 'bcryptjs';

class UsersController{
    
    public index (req:Request, res:Response){
        res.send("hola")
    }

    public async encryptPass(password: string){
        const salt = await bcp.genSalt(10);
        return bcp.hash(password,salt);
    }

    public async updateNurse(req:Request, res:Response){
        console.log(req.body);
        try {
            const modd = await connect().then((conn)=>{
                return conn.query("UPDATE `direccion` SET `calle`='"+req.body.dire.calle+"',`numero`='"+req.body.dire.numero+"',`interior`='"+req.body.dire.interior+"',`colonia`='"+req.body.dire.colonia+
                "',`cp`='"+req.body.dire.cp+"',`ciudad`='"+req.body.dire.ciudad+"',`estado`='"+req.body.dire.estado+"',`pais`='"+req.body.dire.pais+"' WHERE Id="+req.body.dire.Id+";");
            });
            const modu = await connect().then((conn)=>{
                return conn.query("UPDATE `usuario` SET `nombre`='"+req.body.user.nombre+"',`apellido`='"+req.body.user.apellido+"',`genero`='"+req.body.user.genero+
                "',`fecha_nac`='"+req.body.user.fecha_nac+"',`telefono`='"+req.body.user.telefono+"',`celular`='"+req.body.user.celular+"' WHERE Id="+req.body.user.Id+";");
            });
            if(req.body.pers.password==''){
                const modp = await connect().then((conn)=>{
                    return conn.query("UPDATE `personal` SET `email`='"+req.body.pers.email+"',`username`='"+req.body.pers.username+
                    "',`profileimg`='"+req.body.pers.profileimg+"' WHERE Id="+req.body.pers.Id+";");
                });
            }else{
                req.body.pers.password=this.encryptPass(req.body.pers.password);
                const modp = await connect().then((conn)=>{
                    return conn.query("UPDATE `personal` SET `email`='"+req.body.pers.email+"',`username`='"+req.body.pers.username+
                    "',`password`='"+req.body.pers.password+"',`profileimg`='"+req.body.pers.profileimg+"' WHERE Id="+req.body.pers.Id+";");
                });
            }
            const modn = await connect().then((conn)=>{
                return conn.query("UPDATE `enfermera` SET `idUnidadmedica`="+req.body.nurs.idUnidadmedica+" WHERE Id="+req.body.nurs.Id+";");
            });
            res.status(200).json("Se actualizo la enfermera");
        } catch (error) {
            console.log(error);
            return res.status(400).json("Medico no encontrado");
        }

    }

    public async getDoctors(req:Request, res:Response){
        const ds =await connect().then((conn)=>{
            return conn.query("SELECT u.nombre, u.apellido, u.telefono, p.username, p.email, p.profileimg, d.cedula, es.nombre AS 'Especialidad' "+
            "FROM usuario AS u "+
            "INNER JOIN personal AS p ON u.Id=p.idUsuario "+
            "INNER JOIN doctor AS d ON p.Id = d.idpersonal"+
            "INNER JOIN especialidades AS es ON d.idEspecialidad = es.Id;");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Medico no encontrado"); 
        })
        return res.json(ds);
    }

    public async getDoctorInfo(req:Request, res:Response){
        
        const d = await connect().then((conn)=>{
            return conn.query("SELECT * "+
            "FROM doctor AS d "+
            "INNER JOIN personal AS p ON d.idpersonal = p.Id "+
            "INNER JOIN usuario AS u ON u.Id=p.idUsuario "+
            "INNER JOIN especialidades AS es ON d.idEspecialidad = es.Id "+
            "WHERE d.Id="+req.query.id+";");
        }).catch(err=>{
            console.log(err)
            return res.status(400).json("Medico no encontrado"); 
        })
        
        return res.json(d);
    }

    public async getNurses(req:Request, res:Response){
        var a = Number(req.query.id);
        var answe:{};
        try {
            const usr = await connect().then((conn)=>{
                return conn.query("SELECT u.* "+
                "FROM enfermera AS e INNER JOIN personal AS p ON e.idpersonal = p.Id "+
                "INNER JOIN usuario AS u ON p.idUsuario = u.Id WHERE e.Id="+a+";");
            });
            const per = await connect().then((conn)=>{
                return conn.query("SELECT p.* "+
                "FROM enfermera AS e INNER JOIN personal AS p ON e.idpersonal = p.Id "+
                "WHERE e.Id="+a+";");
            });
            const dir = await connect().then((conn)=>{
                return conn.query("SELECT d.* FROM enfermera AS e INNER JOIN personal AS p ON e.idpersonal = p.Id INNER JOIN usuario AS u ON p.idUsuario = u.Id INNER JOIN direccion AS d ON u.direccionId = d.Id WHERE e.Id="+a+";");
            });
            const uni =await connect().then((conn)=>{
                return conn.query("SELECT u.* FROM enfermera AS e INNER JOIN unidad_medica AS u ON e.idUnidadmedica = u.IdUnidad WHERE e.Id="+a+";");
            });
            const enf =await connect().then((conn)=>{
                return conn.query("SELECT * FROM enfermera AS e WHERE e.Id="+a+";");
            });
            answe={
                user: usr[0],
                pers: per[0],
                dire: dir[0],
                unid: uni[0],
                enfe: enf[0]
            }
            return res.json(answe);
        } catch (error) {
            console.log(error);
            return res.status(400).json("enfermera/o no encontrada/o");
        }
    }

    public async getNurseInfo(req:Request, res: Response){
        const d = await connect().then((conn)=>{
            return conn.query("SELECT e.Id,p.email,p.username,u.direccionId FROM enfermera AS e INNER JOIN personal AS p ON e.idpersonal = p.Id INNER JOIN usuario AS u ON p.idUsuario = u.Id");
            //"WHERE e.Id="+req.query.id+";");
        }).catch(err=>{
            console.log(err)
            return res.status(400).json("Medico no encontrado"); 
        })
        
        return res.json(d);
    }

    public async elimNurse(req: Request, res:Response){
        const e = await connect().then((conn)=>{
            return conn.query("DELETE FROM `direccion` WHERE Id="+req.query.id);
            //"WHERE e.Id="+req.query.id+";");
        }).catch(err=>{
            console.log(err)
            return res.status(400).json("Medico no encontrado"); 
        })
        console.log(e);
        return res.status(200).json(e);
    }

    public async getPacients(req:Request, res:Response){
        const es =await connect().then((conn)=>{
            return conn.query("SELECT u.nombre, u.apellido"+
            "FROM usuario AS u"+
            "INNER JOIN direccion AS d ON u.direccionId = d.Id"+
            "INNER JOIN paciente AS p ON p.idusuario = u.Id"+
            "INNER JOIN unidad_medica AS un ON p.idUnidadmedica = un.IdUnidad"+
            "WHERE p.idUnidadmedica = "+req.query.unidad+""+
            ";");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Pacientes no encontrados"); 
        })
        return res.json(es);
    }

    public async getPacientInfo(req:Request, res:Response){
        const es = await connect().then((conn) => {
            return conn.query("SELECT *"+
            "FROM usuario AS u"+
            "INNER JOIN direccion AS d ON u.direccionId = d.Id"+
            "INNER JOIN paciente AS p ON p.idusuario = u.Id"+
            "INNER JOIN unidad_medica AS un ON p.idUnidadmedica = un.IdUnidad"+
            "WHERE p.Id = "+req.query.paciente+""+
            ";");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Paciente no encontrado");
        });
        return  res.json(es);
    }

    /*public async getPacientsByUnit(req: Request, res:Response){
        const es = await connect().then((conn) => {
            return conn.query("");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Paciente no encontrado");
        });
        return  res.json(es);
    }
     public async getDoctorsWithEsp(req: Request, res: Response){
        const es = await connect().then((conn) => {
            return conn.query("");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Paciente no encontrado");
        });
        return  res.json(es);
    }
    */

    public async getEspecialidades(req: Request, res: Response){
        const es = await connect().then((conn) => {
            return conn.query("SELECT e.Id, e.nombre  FROM especialidades AS e");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("No existen especialidades");
        });
        return  res.json(es);
    }

    public async getDoctorsByEspe(req: Request, res: Response){
        const es = await connect().then((conn) => {
            return conn.query("SELECT u.nombre, u.apellido, u.telefono, p.username, p.email, p.profileimg, d.cedula "+
            "FROM usuario AS u "+
            "INNER JOIN personal AS p ON u.Id=p.idUsuario "+
            "INNER JOIN doctor AS d ON p.Id = d.idpersonal "+
            "INNER JOIN especialidades es ON d.idEspecialidad = es.Id "+
            "WHERE d.idEspecialidad = '"+req.body.especialidad.Id+"' "+
            ";");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Paciente no encontrado");
        });
        return  res.json(es);
    }

    public async getMedicUnits(req: Request, res: Response){
        const es = await connect().then((conn) => {
            return conn.query("SELECT * FROM unidad_medica");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("No hay unidades medicas");
        });
        return  res.json(es);
    }  

    public async searchPacient(req: Request, res: Response){
        const es = await connect().then((conn) => {
            return conn.query("SELECT u.nombre, u.apellido"+
            "FROM usuario AS u"+
            "INNER JOIN direccion AS d ON u.direccionId = d.Id"+
            "INNER JOIN paciente AS p ON p.idusuario = u.Id"+
            "INNER JOIN unidad_medica AS un ON p.idUnidadmedica = un.Id"+
            "WHERE p.idUnidadmedica = "+req.body.unidad+" && p.CURP='"+req.body.curp+"'"+
            ";");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Paciente no encontrado");
        });
        return  res.json(es);
    }
   

    
}

export const usersController = new UsersController();