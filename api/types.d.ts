declare namespace Express{
    export interface Request{
        usrInfo: {
            usrname: string,
            email: string,
            pfp: string,
            type: number
        };
    }
}