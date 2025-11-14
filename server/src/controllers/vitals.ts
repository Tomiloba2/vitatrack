import { NextFunction, Request, Response } from "express";
import prisma from "../libs/prisma.js";
import { GetVitalsType, AddVitalsType, DeleteVitalsType } from "../schema/vitals.js";


export const AddVitals = async (req: Request<{}, {}, AddVitalsType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const body = req.body
        const post = await prisma.vitals.create({
            data: {
                patient_id: body.patient_id,
                heart_rate: body.heart_rate,
                temperature: body.temperature,
                blood_oxygen: body.blood_oxygen,
                respiration_rate: body.respiration_rate,
                time_monitored: body.time_monitored
            }
        })
        return res.status(201).json(post)

    } catch (error) {
        console.error(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}


export const GetVitals = async (req: Request<GetVitalsType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const { id } = req.params
        const now = new Date()
        const timeInterval = new Date(now.getTime() - 1 * 60 * 1000)
        const post = await prisma.vitals.findMany({
            where: {
                patient_id: id/* ,
                time_monitored: {
                    gte: timeInterval
                } */
            },
            orderBy: {
                time_monitored: 'asc'
            }
        })
        return res.status(200).json(post)

    } catch (error) {
        console.error(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}
export const deleteVitals = async (req: Request<DeleteVitalsType, {}, {}>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const { id } = req.params
        const post = await prisma.vitals.deleteMany({
            where: { id },
        })
        return res.status(204).json(post)

    } catch (error) {
        console.error(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}
