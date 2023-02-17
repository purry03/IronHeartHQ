
declare namespace Express {
    export interface Request {
        user:{
            name: string,
            admin: boolean,
            dev: boolean,
            roles: string[],
        } | null
    }
 }