import { z } from "zod"

export const AddPatientSchema = z.object({
    body: z.object({
        name: z.string(),
        dob: z.date(),
        status: z.enum(['stable', 'critical']),
        age: z.int(),
        contact: z.string(),
        lastMonitored: z.date(),
        bloodGroup: z.string(),
        GestationAge: z.string(),
        pregnancyType: z.string(),
        edd: z.string(),
        lmp: z.string(),
        epal: z.string(),
        highrisk: z.string()

    })

})

export const GetAPatientsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export type AddPatientType = z.output<typeof AddPatientSchema>['body']
export type GetAPatientsType = z.output<typeof GetAPatientsSchema>['params']