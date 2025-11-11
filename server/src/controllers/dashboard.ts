
import { Request, Response, NextFunction } from "express"
import prisma from '../libs/prisma.js'
import { AddPatientType, GetAPatientsType } from "../schema/dashboard.js"

export async function GetPatients(req: Request<{}, {}, {}>, res: Response, next: NextFunction) {
    prisma.$connect
    try {
        const user = await prisma.patient.findMany()
        return res.status(200).json(
             user
        )
    } catch (error) {
        next(error)
        console.error(error);
    } finally {
        prisma.$disconnect
    }
}

export async function GetAPatients(req: Request<GetAPatientsType, {}, {}>, res: Response, next: NextFunction) {
    prisma.$connect
    try {
        const { id } = req.params
        const user = await prisma.patient.findUniqueOrThrow({
            where: {
                id: id
            },
            include:{
                Vitals:true
            }
        })
        return res.status(200).json(user)
    } catch (error) {
        next(error)
        console.error(error);
    } finally {
        prisma.$disconnect
    }
}
export const AddPatient = async (req: Request<{}, {}, AddPatientType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const body = req.body
        const user = await prisma.patient.create({
            data: {
                name: body.name,
                Dob: body.dob,
                status: body.status,
                age: body.age,
                contact: body.contact,
                lastMonitored: body.lastMonitored,
                bloodGroup: body.bloodGroup,
                GestationAge: body.GestationAge,
                pregnancyType: body.pregnancyType,
                EDD: body.edd,
                LMP: body.lmp,
                GPAL: body.epal,
                HighRisk: body.highrisk
            }
        })
        return res.status(201).json({
            message: `success`,
            data: user
        })
    } catch (error) {
        next(error)
        console.error(error);
    } finally {
        prisma.$disconnect
    }
}