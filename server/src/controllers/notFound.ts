import { NextFunction, Request, Response } from 'express'


export const notFound = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(404)
        throw new Error(`api route ${req.originalUrl} does not exist`);
    } catch (error) {
        next(error)
    }
}
