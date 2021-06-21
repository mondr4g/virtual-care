declare namespace Express{
    export interface Request{
        usrInfo: {
            usrname: string,
            id:number,
            email: string,
            pfp: string,
            type: number
        };
    }
}