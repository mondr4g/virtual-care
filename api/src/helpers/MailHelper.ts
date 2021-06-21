import * as nodemailer from 'nodemailer';

import {mailConfig} from '../helpers/MailConfig';

 
class MailHelper {
    
    constructor(public to?: string, public subject?: string, public message?:string){

    }
    
    public sendMail(){
        let mailOptions = {
            from:"virtualcare.mai@gmail.com" || '',
            to:this.to || '',
            subject: this.subject || '',
            html: this.message || ''
        };
        /*
        host: mailConfig.host,
            port: Number(mailConfig.port),
            secure: false,
            auth:{
                user: mailConfig.user,
                pass: mailConfig.password
            },
            tls: {rejectUnauthorized: false}
        
        */ 
        const  transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:"virtualcare.mai@gmail.com",
                pass:"vcareMAI6A"
            }                    
        });

        console.log(mailOptions);

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        });
    }  


}

export const mailHelper = new MailHelper();