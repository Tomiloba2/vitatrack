import { NextFunction, Request, Response } from "express";
import crypto from 'crypto'
import { forgotPasswordType, resetPasswordType, signinType, signupType } from "../schema/auth.js";
import prisma from "../libs/prisma.js";
import transporter from "../libs/transporter.js";
import { hashString } from "../libs/bcrypt.js";
import fs from 'fs'
import { promisify } from "util";
import bcrypt from 'bcrypt'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'


interface JwtRequest extends Request {
    id?: string;
    name?: string;
    email?: string;
}
const secretKey: Secret = process.env.JWT_SECRET || "skckndkcdkcejdoedo mm kazklcd"

export const signup = async (req: Request<{}, {}, signupType>, res: Response, next: NextFunction) => {
    const salt = await bcrypt.genSalt(10)
    prisma.$connect
    try {
        const data = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, salt),
                role:"admin",
            }
        })
        const {
            password,
            ...rest
        } = data
        return res.status(201).json({
            message: "success",
            rest
        })
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}

export const login = async (req: Request<{}, {}, signinType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const data = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (!data) {
            return res.status(404).send(`account not found please sign up to create an account`)
        } else if (!await bcrypt.compare(req.body.password, data.password)) {
            res.status(401)
            throw new Error("password is incorrect");
        }
        const {
            password, createdAt,
            ...rest
        } = data
        const accesstoken = jwt.sign(rest, secretKey, { expiresIn: '10min' })
        const refreshToken = jwt.sign(rest, secretKey, { expiresIn: '30d' })
        return res
            .cookie("accessToken", accesstoken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            })
            .json("successfully logged in")
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res
            .clearCookie('accessToken')
            .clearCookie(`refreshToken`)
        return res.status(204).json({ message: "logout successful" })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
export const getSession = (req: JwtRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken
        if (!token) {
            res.status(401)
            throw new Error("not authenticated");
        } else {
            const session = jwt.verify(token, secretKey) as JwtPayload
            return res.status(200).json(session)
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const verifyJwt = (req: JwtRequest, res: Response, next: NextFunction) => {
    const accesstoken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken
    try {
        if (!accesstoken || !refreshToken) {
            res.status(401)
            throw new Error("not authenticated");
        }
        const { id } = jwt.verify(accesstoken, secretKey) as JwtPayload
        req.id = id
        next()
    } catch (error) {
        if (!refreshToken) {
            res.status(401).json({ msg: `not authenticated` })
        }
        try {
            const rest = jwt.verify(refreshToken, secretKey) as JwtPayload
            const accesstoken = jwt.sign(rest, secretKey, { expiresIn: `10min` })
            return res.cookie(`accessToken`, accesstoken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            }).send(`accesss token re-newed`)
        } catch (error) {
            next(error)
        }
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
        const resetLink = `${process.env.RESET_LINK}?token=${token}`
        /* --------------email template------------------- */
        const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
    body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 20px;
    }

    .container {
        max-width: 600px;
        margin: auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    }

    .logo {
        text-align: center;
        margin-bottom: 20px;
    }

    .logo img {
        border-radius: 50%;
        max-width: 120px;
        height: auto;
    }

    .btn {
        background-color: #007bff;
        color: #fff;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
        margin-top: 20px;
    }

    .footer {
        font-size: 12px;
        color: #888;
        margin-top: 30px;
    }
</style>
</head>
<body>
    <div class="container">
        <!-- Logo Section -->
        <div class="logo">
            <img src="cid:logo" alt="logo image" />
        </div>
        <h2>Password Reset Request</h2>
        <p>
            Hello ${user.name}, &nbsp;
            a request to reset the password for your account at vitatrack.vercel.app has been made.
            <br/> <br/>
            You were sent this email to reset your password on vitatrack.vercel.app. &nbsp;
            Click the button below to reset it
        </p>
        <a href=${resetLink} class="btn">Reset Password</a>
        <p>If you did not request a password reset, you can ignore this email</p>
        <p>This link will expire in 1 hour for security reasons</p>
        <div class="footer">
            <p>Need help? contact support</p>
        </div>
    </div>
</body>

</html>
            `
        // reading image file from the assets folder

        const readFileAsync = promisify(fs.readFile)
        const imageAttachment = await readFileAsync('../server/src/assets/logo.png')

        // mailoptions

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: `Password reset request of ${user.name} at vitatrack.vercel.app`,
            html: htmlTemplate, attachments: [{
                filename: 'logo.png',
                content: imageAttachment,
                encoding: 'base64',
                cid: "logo"
            }]
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
        const user = await prisma.user.findFirstOrThrow({
            where: { resetToken: body.token },
        })
        const expiresIn = user?.expiresIn?.getTime()
        const time = new Date().getTime()
        if (expiresIn && expiresIn < time) {
            res.status(403)
            throw new Error("reset token has expired");
        }
        if (await bcrypt.compare(body.password, user.password)) {
            res.status(403)
            throw new Error("new password cannot be the same as the old password");

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

export const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const data = await prisma.user.findMany()
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        next(error)
    }
    prisma.$disconnect
}