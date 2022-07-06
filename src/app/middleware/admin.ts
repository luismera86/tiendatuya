import { NextFunction, Request, Response } from "express"

export const checkAdmin = (req: Request, resp: Response, next: NextFunction) => { 

    const admin = true
    if (admin) {
        next()
    } else {

        resp.status(401).json({
            erro: 'No es usuario administrador'
        })
    }
    
 } 