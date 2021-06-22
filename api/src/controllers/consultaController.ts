import {request, Request, Response} from 'express';
import {connect} from '../database';
import {v4 as uuidv4} from 'uuid';

class ConsultaController{
    //esta cosa retorna el id de la peticion para saber si fue aceptada.
    public async newPeticion(req: Request, res: Response){
        //Recibimos toda la info de los forms de la enfermera
        //llenar registro en BD sin videollamada
        req.body.infoConsulta.aceptada = false;
        req.body.infoConsulta.rechazada = false;
        req.body.infoConsulta.idvllamada = null;
        //Obtener el doctor adecuado
        req.body.infoConsulta.idDoctor = await this.getDoctor(req.body.espe);
        await connect().then((conn)=>{
            conn.query("INSERT INTO consulta SET ?", [req.body.infoConsulta]);
        }).catch((error:any)=>{
            return res.status(500).json(error.message);
        });
        const i = await connect().then((conn)=>{
            return conn.query("SELECT MAX(Id) AS id FROM consulta;");
        });
        //pendientes los datos del doctor
        //return res.status(200).json({"idCons":i[0].id});
        //Retornar, idconsulta, los datos del doctor asignado
         
        return res.status(200).header('idConsulta',""+i[0].id).json("ahi esta tu chingadera");
    }
    //Llenar los signos vitales
    //Tener en cuenta que es un vector de signos vitales con los sig campos
    /*
        idconsulta: n,
        signos{
            {idsigno : s, medida : m},
            {idsigno : s, medida : m},
        }
     *    
     */
    public async setSigns(req: Request, res: Response){
        req.body.signos.forEach(async (e:any) => {
            console.log(e);
            //e.idconsulta = null;
            await connect().then((conn)=>{
                conn.query("INSERT INTO signosconsulta SET ?", [e]);
            }).catch((error:any)=>{
                return res.status(500).json(error.message);
            });
        }); 
        
        
        return res.status(200).json("signos agregados correctamente");
    }
    //retornar los signos vitales disponibles
    public async getSigns(req: Request, res: Response){
        const s = await connect().then((conn)=>{
            return conn.query("SELECT * FROM signovital;");
        }).catch((error)=>{
            return res.status(500).json(error.message);
        })
        return res.status(200).json(s);
    }

    //retornar los signos de la consulta

    public async getSignsCons(req: Request, res: Response){
        const a = Number(req.query.id);
        console.log(a+"hola");
        try{
            const ss = await connect().then((conn)=>{
                return conn.query("SELECT sv.nombre, sc.medida, sv.unidades, sv.rango_superior, sv.rango_inferior FROM signosconsulta AS sc INNER JOIN signovital AS sv ON sc.idsigno = sv.Id WHERE sc.idconsulta="+a+" ;");
            });
            return res.status(200).json(ss[0]);
        }catch(error:any){
            return res.status(500).json(error.message);
        }
    }

    //aqui validar de manera asincrona que la consulta haya sido aceptada o rechazada, esta funcion se realizara en intervalos desde el cliente
    //* Por el momento la idea es que el cliente revise esta funcion cada vez, en lugar de suscribirlo a notificaciones *//
    //Una vez confirmada, se habilita el link en la vista
    public async checkValidity(req: Request, res: Response){
        const idd = Number(req.query.id);
        //traemos el id en el request
        console.log(req.params);
        const a = await connect().then((conn)=>{
            return conn.query("SELECT c.rechazada AS rechazada, c.aceptada AS aceptada, v.id_dinamico AS ruta FROM consulta AS c INNER JOIN videollamada AS v ON c.idvllamada = v.Id  WHERE c.Id="+idd+" ;");
        }).catch((error)=>{
            console.log(error);
            return res.status(500).json("No se a encontrado la consulta");
        });
        if(a[0].rechazada==false && a[0].aceptada==false){
            return res.status(200).json({"status":"espera"});
        }else if(a[0].aceptada == true && a[0].rechazada==false){
            return res.status(200).json({"status":"aceptada", "ruta":a[0].ruta});
        }else{
            return res.status(200).json({"status":"rechazada"});
        }

    } 
    //Una vez que se acepta, generar aqui el link dinamico del room para la videollamada, insertar referenica y actualizar banderas +
    // ** Podria propagar un evento desde aqui para que sea leido por el cliente, ya sea con notificaciones o algo parecido, pero eso sera del lado del cliente **
    
    public async confirmConsulta(req: Request, res: Response){
        //Creamos el registro en la videollamada
        const v = await this.createVideoCallR(Number(req.query.id));
        //se supone que recibimos el id de la consulta en e request
        await connect().then((conn)=>{
            return conn.query("UPDATE consulta SET aceptada=true, rechazada=false, idvllamada="+v+" ;");
        }).catch((error)=>{
            console.log(error);
        });

        //Entonces aqui recuperar la info del historial medico, la 
         //comenzar consulta, aqui si no se que pedo
        //aqui se inicia una vez que la acepta, que quiere decir esto, se le devuelve la info al doctor, los tres campos de texto en consulta,
        //Tambien enviar el estudio de laboratorio y el historial medico al doctor que solicito esto

        return res.status(200).json();
    }
    //Rechzamos la consulta y eliminamos de la bd
    public async rejectConsulta(req: Request, res: Response){
        await connect().then((conn)=>{
            return conn.query("UPDATE consulta SET aceptada=false, rechazada=true WHERE ;");
        }).catch((error)=>{
            console.log(error);
        });
    }
    //obtener la liga para la videollamada
    private getRoom():string{    
        return uuidv4();
    }

   /**
    * 
    * public async startConsulta(req: Request, res: Response){
    *   
    * }
    * 
    */
    
    //Elegir el doctor apropiado, o asignar de acuerdo a especialidad.
    private async getDoctor(esp:string): Promise<number>{

        //SELECT d.Id AS 'seleccionado' FROM doctor AS d INNER JOIN consulta AS c ON c.idDoctor=d.Id INNER JOIN especialidades AS e ON d.idEspecialidad=e.Id WHERE e.nombre='especialidad' AND (c.aceptada=false AND c.rechazada=false ) GROUP BY c.idDoctor ORDER BY seleccionado ASC LIMIT 1;
        console.log(esp+"doctor");
        const a = await connect().then((conn)=>{
            return conn.query("SELECT d.Id AS 'seleccionado' FROM doctor AS d INNER JOIN consulta AS c ON c.idDoctor=d.Id INNER JOIN especialidades AS e ON d.idEspecialidad=e.Id WHERE e.nombre='"+esp+"' AND (c.aceptada=false AND c.rechazada=false ) GROUP BY c.idDoctor ORDER BY seleccionado ASC LIMIT 1;")
        }).catch((error)=>{
            console.log(error);
            return null;
        });
        return a[0].seleccionado || 0;
    }
    //Retornar las consultas pendientes que tiene un medico ordenadas por antiguedad de entrada. 
    public async getConsultasByMed(req: Request, res: Response){
        console.log(req.query.Id);
        
         const a = await connect().then((conn)=>{
            return conn.query("SELECT c.Id, c.fecha, u.nombre, u.apellido, um.nombre AS 'Unidad', e.Id , u2.nombre AS 'enfermera' "+
            "FROM consulta AS c "+ 
            "INNER JOIN paciente AS p ON c.idPaciente = p.Id "+
            "INNER JOIN usuario AS u ON p.idusuario = u.Id "+
            "INNER JOIN unidad_medica AS um ON um.IdUnidad = p.idUnidadmedica "+
            "INNER JOIN enfermera AS e ON e.Id = idEnfermera "+
            "INNER JOIN personal AS p ON e.idpersonal = p.Id "+
            "INNER JOIN usuario AS u2 ON p.idUsuario = u2.Id");
        }).catch((error)=>{
            return res.status(500).json(error.message);
        });
        
          
        return res.status(200).json("aasa");
        
    }
    //retornar la info relevante, como fecha y doctor que se le asigno.
    public async getConsultaInfo(roomId:string){

    }
    //Recuperar el historial medico del paciente
    public async getPacientHistory(req:Request, res:Response){
        const h = await connect().then((conn)=>{
            return conn.query("SELECT * FROM historialmedico WHERE idpaciente="+req.query.id+";");
        }).catch((error)=>{
            return res.status(500).json(error.message);
        });
        return res.status(200).json(h); 
    }
    //Insertar historial medico
    public async postPacientHistory(req:Request, res:Response){
        await connect().then((conn)=>{
            return conn.query("INSERT INTO historialmedico SET ? ;",[req.body.historialMedico]);
        }).catch((error)=>{
            return res.status(500).json(error.message);
        });
        return res.status(200).json("Insertado correctamente");
    }

    //Recuperar los resultados de laboratorio.


    private async createVideoCallR(id:number){
        const idV = this.getRoom();
        var b = {
            "idconsulta":id,
            "id_dinamico":idV,
            //Aqui me falta especificar la ruta donde se guardara el video y el audio.
            "audio_path":null,
            "video_path":null
        };
        const a = await connect().then((conn)=>{
            return conn.query("INSERT INTO videollamada SET ? ;",[b]);
        }).catch((error)=>{
            console.log(error.message);
            return null;
        });
        const i = await connect().then((conn)=>{
            return conn.query("SELECT MAX(Id) AS id FROM videollamada");
        });
        return i[0].id;
    }
  
    /*
     * Importante aqui se realizaran diversas llamadas asincronas.  
     */
}

export const consultaController = new ConsultaController();