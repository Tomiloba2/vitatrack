import prisma from '../libs/prisma.js'
import { NextFunction, Request, Response } from 'express'
import { completeAppointmentType, createAppointmentType, paramsType, updateAppointmentType } from "../schema/appointments.js"


/* ------------------create an appointment------------------------------- */

export const createAppointment = async (
    req: Request<{}, {}, createAppointmentType>, res: Response, next: NextFunction
) => {
    prisma.$connect
    try {
        const { patientId, doctorId, dateTime, reason } = req.body
        const data = await prisma.appointment.create({
            data: {
                patientID: patientId,
                userId: doctorId,
                reason: reason,
                dateTime: dateTime
            }
        })
        return res.status(201).json(data)
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}
/* ------------------update an appointment------------------------------- */

export const updateAppointment = async (
    req: Request<paramsType, {}, updateAppointmentType>, res: Response, next: NextFunction
) => {
    prisma.$connect
    try {
        const { reason, dateTime, patientId, doctorId } = req.body
        const ifExist = await prisma.appointment.findFirstOrThrow({
            where: {
                id: req.params.id
            }
        })
        const data = await prisma.appointment.update({
            where: {
                id: req.params.id
            },
            data: {
                patientID: patientId,
                userId: doctorId,
                reason: reason || ifExist?.reason,
                dateTime: dateTime || ifExist?.dateTime
            }
        })
        return res.status(201).json(data)
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}

/* ------------------fetch all appointments------------------------------- */

export const fetchAppointments = async (
    req: Request<paramsType, {}, {}>, res: Response, next: NextFunction
) => {
    prisma.$connect
    try {
        const data = await prisma.appointment.findMany({
            where: {
                userId: req.params.id
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}
/* ------------------delete an appointment------------------------------- */

export const deleteAppointment = async (
    req: Request<paramsType, {}, {}>, res: Response, next: NextFunction
) => {
    prisma.$connect
    try {
        const data = await prisma.appointment.delete({
            where: {
                id: req.params.id
            }
        })
        return res.status(204).json({
            message: "success",
        })
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}
/* ------------------mark an appointment as complete ------------------------------- */

export const completedAppointment = async (
    req: Request<paramsType, {}, completeAppointmentType>, res: Response, next: NextFunction
) => {
    prisma.$connect
    try {
        const { id } = req.params
        const body = req.body
        const data = await prisma.appointment.update({
            where: {
                id: id
            },
            data: {
                isComplete: body.isComplete === true ? false : true
            }
        })
        return res.status(200).json({
            message: `successfully completed`
        })
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}