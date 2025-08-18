import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
dotenv.config()

const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = req.statusCode ? req.statusCode : 500
    console.error(err);
    return res.status(statusCode).json({
        title: err.name,
        error: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : null
    })
}

export default errorHandler;