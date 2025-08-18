import { NextFunction, Request, Response } from "express";
import crypto from 'crypto'
import { forgotPasswordType, resetPasswordType, signinType, signupType } from "../schema/auth.js";
import prisma from "../libs/prisma.js";
import passport from "../libs/passport.js";
import transporter from "../libs/transporter.js";
import { hashString } from "../libs/bcrypt.js";

/* ---------------signup controller------------------------------ */

export const signup = async (req: Request<{}, {}, signupType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const body = req.body
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: await hashString(body.password),
                role: "admin"
            }
        })
        const { password, ...rest } = user
        return res.status(201).json({
            message: `success`,
            data: rest
        })
    } catch (error) {
        next(error)
        console.error(error);
    } finally {
        prisma.$disconnect
    }
}

/* ----------------------- signin controller --------------------------------------- */

export const login = async (req: Request<{}, {}, signinType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        passport.authenticate(`local`, (err: any, user: any, info: any) => {
            if (err || !user) {
                return res.status(401).json({ err: info.message });
            }
            if (req.body.rememberMe) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
            }
            req.logIn(user, err => {
                if (err) {
                    return res.status(409).json({ err: err.message });
                }
                return res.status(200).json(`successfully logged in`)
            })

        })(req, res, next)
    } catch (error) {
        next(error)
        console.error(error);
    } finally {
        prisma.$disconnect
    }
}

/* ----------------------- logout controller --------------------------------------- */

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        if (req.session) {
            res.clearCookie('connect.sid')
            req.logout(error => {
                //logout passport
                req.session.destroy((err = error) => {
                    //destroy session
                    if (err) {
                        next(err)
                    }
                    res.status(200).json('successfully logout')
                })
            })
        }
    } catch (error) {
        next(error)
        console.error(error);
    } finally {
        prisma.$disconnect
    }
}

/* ----------------------- forgot Password controller --------------------------------------- */

export const forgotPassword = async (req: Request<{}, {}, forgotPasswordType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const body = req.body
        //create a reset token
        const token = crypto.randomBytes(16).toString('hex')
        const expiresIn = new Date()
        expiresIn.setHours(expiresIn.getHours() + 1)

        const user = await prisma.user.update({
            where: { email: body.email },
            data: {
                expiresIn: expiresIn,
                resetToken: token
            }
        })
        const resetLink = `http://localhost:3000/auth/reset/${token}`
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: `Replacement of Login information of ${user.name} at blog.vercel.app`,
            text: `
            hello ${user.name}

            A request to reset the password for your account at blog.vercel.app has been made

            You were sent this email to reset your password on blog.vercel.app
            click on the link or copy and paste in your browser
            ${resetLink}. 
            This link expires in one hour
                        
            Note: If this is not you please ignore this email`
        }
        const info = await transporter.sendMail(mailOptions)
        console.log(token);
        return res.status(200).json(`feedback has been sent successfully`)
    } catch (error) {
        next(error)
        console.error(error);
    } finally {
        prisma.$disconnect
    }
}


/* ----------------------- Reset Password controller --------------------------------------- */

export const resetPassword = async (req: Request<{}, {}, resetPasswordType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const body = req.body
        const user = await prisma.user.findFirst({
            where: { resetToken: body.token },
        })
        const expiresIn = user?.expiresIn?.getTime()
        const time = new Date().getTime()
        if (expiresIn && expiresIn < time) {
            res.status(403)
            throw new Error("token has expired");
        }
        const updated = await prisma.user.update({
            data: {
                password: await hashString(body.password),
                resetToken: null,
                expiresIn: null
            },
            where: {
                resetToken: body.token
            },
        })
        const { password, ...rest } = updated
        return res.status(200).json({
            message: "sucessful",
            data: rest
        })
    } catch (error) {
        next(error)
        console.error(error);
    } finally {
        prisma.$disconnect
    }
}