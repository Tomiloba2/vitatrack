import { z } from 'zod'

export const signupSchema = z.object({
    body: z.object({
        name: z.string().min(3),
        email: z.email("Inavlid email format"),
        //role: z.enum(['admin', 'doctor', 'nurse']),
        password: z.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*?])[A-Za-z\d@$!%*?&]{8,}$/, "Weak Password. Use 8+ characters with letters, numbers & symbols"),
    })
})

export const signinSchema = z.object({
    body: z.object({
        email: z.email("Inavlid email format"),
        //role: z.enum(['admin', 'doctor', 'nurse']),
        password: z.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*?])[A-Za-z\d@$!%*?&]{8,}$/, "Weak Password. Use 8+ characters with letters, numbers & symbols"),
        rememberMe: z.boolean().default(false)
    })
})

export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z.email("Inavlid email format").min(3)
    })
})

export const resetPasswordSchema = z.object({
    body: z.object({
        password: z.string(),
        token: z.string()
    })
})

export type signinType = z.output<typeof signinSchema>[`body`]
export type signupType = z.output<typeof signupSchema>[`body`]
export type forgotPasswordType = z.output<typeof forgotPasswordSchema>["body"]
export type resetPasswordType = z.output<typeof resetPasswordSchema>["body"]