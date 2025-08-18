import express from "express"
import validate from "../libs/zodValidate.js"
import { forgotPasswordSchema, resetPasswordSchema, signinSchema, signupSchema } from "../schema/auth.js"
import { forgotPassword, login, logout, resetPassword, signup } from "../controllers/auth.js"

export const router = express.Router()


/* ---------------------authenticaton routes----------------- */

router.route('/signup').post(validate(signupSchema), signup)
router.route('/login').post(validate(signinSchema), login)
router.route('/forgot-password').post(validate(forgotPasswordSchema), forgotPassword)
router.route('/reset-password').post(validate(resetPasswordSchema), resetPassword)
router.route('/logout').post(logout)

/* ------------------------ Dashboard Routes ------------------------- */