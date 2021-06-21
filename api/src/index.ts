import dotenv from 'dotenv';
dotenv.config();
import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import authRoutes from './routes/authRoutes';
import registRoutes from './routes/registRoutes';
import usersRoutes from './routes/usersRoutes';
import infoRoutes from './routes/infoRoutes';
import consultaRoutes from './routes/consultaRoutes';
import adminRoutes from 'routes/adminRoutes';

class Server {

    public app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config():void{
        this.app.set('port', process.env.PORT || 3000)
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

    }

    routes():void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/games',gamesRoutes);
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/info', infoRoutes);
        this.app.use('/api/regist', registRoutes);
        this.app.use('/api/users', usersRoutes);
        this.app.use('/api/consulta', consultaRoutes);
        this.app.use('/api/administracion', adminRoutes);
    }

    start():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log("server on port " + this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();