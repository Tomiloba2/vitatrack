import { NextFunction, Request, Response } from "express";

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            res.status(401)
            throw new Error("not authenticated");
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default isAuthenticated;