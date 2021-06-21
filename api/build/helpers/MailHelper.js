"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailHelper = void 0;
const nodemailer = __importStar(require("nodemailer"));
class MailHelper {
    constructor(to, subject, message) {
        this.to = to;
        this.subject = subject;
        this.message = message;
    }
    sendMail() {
        let mailOptions = {
            from: "virtualcare.mai@gmail.com" || '',
            to: this.to || '',
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
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "virtualcare.mai@gmail.com",
                pass: "vcareMAI6A"
            }
        });
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return error;
            }
            else {
                return "E-mail enviado com sucesso!";
            }
        });
    }
}
exports.mailHelper = new MailHelper();
