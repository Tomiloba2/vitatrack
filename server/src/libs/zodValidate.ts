import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError } from "zod";

const validate = (scheme: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        scheme.parse({
            params: req.params,
            query: req.query,
            body: req.body
        })
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                title: error.name,
                error: error.issues.map((item) => {
                    return { path: item.path, errorMessage: item.message }
                })
            })
        }
        next(error)
    }
}

export default validate