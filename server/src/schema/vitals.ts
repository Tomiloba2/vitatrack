import { z } from "zod"

export const AddVitalsSchema = z.object({
    body: z.object({
        patient_id: z.string(),
        heart_rate: z.string().optional(),
        temperature: z.string().optional(),
        blood_oxygen: z.string().optional(),
        respiration_rate: z.string().optional(),
        time_monitored: z.date().optional()
    })

})

export const GetVitalsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})
export const DeleteVitalsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export type AddVitalsType = z.output<typeof AddVitalsSchema>['body']
export type GetVitalsType = z.output<typeof GetVitalsSchema>['params']
export type DeleteVitalsType = z.output<typeof DeleteVitalsSchema>['params']