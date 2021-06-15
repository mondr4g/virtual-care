import {Request, Response} from 'express';
import {connect} from '../database';

class UsersController{
    
    public index (req:Request, res:Response){
        res.send("hola")
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
        const es =await connect().then((conn)=>{
            return conn.query("SELECT u.nombre, u.apellido, u.telefono, p.username, p.email, p.profileimg, un.nombre AS 'Unidad Medica' "+
            "FROM usuario AS u "+
            "INNER JOIN personal AS p ON u.Id=p.idUsuario "+
            "INNER JOIN enfermera AS e ON p.Id = e.idpersonal "+
            "INNER JOIN unidad_medica AS un ON e.idUnidadmedica = un.idUnidad;");
        }).catch(error=>{
            console.log(error);
            return res.status(400).json("Medico no encontrado"); 
        })
        return res.json(es);
    }

    public async getNurseInfo(req:Request, res: Response){
        const d = await connect().then((conn)=>{
            return conn.query("SELECT * "+
            "FROM enfermera AS e "+
            "INNER JOIN personal AS p ON e.idpersonal = p.Id "+
            "INNER JOIN unidad_medica AS un ON e.idUnidadmedica = un.idUnidad "+
            "WHERE e.Id="+req.query.id+";");
        }).catch(err=>{
            console.log(err)
            return res.status(400).json("Medico no encontrado"); 
        })
        
        return res.json(d);
    }

    public async getPacients(req:Request, res:Response){
        const es =await connect().then((conn)=>{
            return conn.query("SELECT u.nombre, u.apellido"+
            "FROM usuario AS u"+
            "INNER JOIN direccion AS d ON u.direccionId = d.Id"+
            "INNER JOIN paciente AS p ON p.idusuario = u.Id"+
            "INNER JOIN unidad_medica AS un ON p.idUnidadmedica = un.Id"+
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
            "INNER JOIN unidad_medica AS un ON p.idUnidadmedica = un.Id"+
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