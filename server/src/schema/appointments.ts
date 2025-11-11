import { z } from 'zod'

export const paramSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export const createAppointmentSchema = z.object({
    body: z.object({
        patientId: z.string(),
        doctorId: z.string(),
        reason: z.string(),
        dateTime: z.coerce.date()
    })
})

export const updateAppointmentSchema = z.object({
    body: z.object({
        patientId: z.string(),
        doctorId: z.string(),
        reason: z.string().optional(),
        dateTime: z.coerce.date().optional()
    })
})
export const completeAppointmentSchema = z.object({
    body: z.object({
        isComplete: z.boolean()
    })
})

export type paramsType = z.output<typeof paramSchema>['params']
export type createAppointmentType = z.output<typeof createAppointmentSchema>['body']
export type updateAppointmentType = z.output<typeof updateAppointmentSchema>['body']
export type completeAppointmentType = z.output<typeof completeAppointmentSchema>['body']