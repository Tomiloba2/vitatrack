import { z } from "zod"

export const AddVitalsSchema = z.object({
    body: z.object({
        patientId: z.string(),
        heartRate: z.string(),
        Temperature: z.string(),
        bloodOxygenLevel: z.string(),
        RespirationRate: z.string(),
        timeMonitored: z.date()
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