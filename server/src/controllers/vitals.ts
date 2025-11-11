import { NextFunction, Request, Response } from "express";
import prisma from "../libs/prisma.js";
import { GetVitalsType, AddVitalsType, DeleteVitalsType } from "../schema/vitals.js";


export const AddVitals = async (req: Request<{}, {}, AddVitalsType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const body = req.body
        const post = await prisma.vitals.create({
            data: {
                patientId: body.patientId,
                heartRate: body.heartRate,
                Temperature: body.Temperature,
                bloodOxygenLevel: body.bloodOxygenLevel,
                RespirationRate: body.RespirationRate,
                timeMonitored: body.timeMonitored
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
        const post = await prisma.vitals.findMany({
            where: {
                patientId: id
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
