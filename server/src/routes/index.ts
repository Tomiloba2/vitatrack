import express from "express"
import validate from "../libs/zodValidate.js"
import { forgotPasswordSchema, resetPasswordSchema, signinSchema, signupSchema } from "../schema/auth.js"
import { fetchUser, forgotPassword, getSession, login, logout, resetPassword, signup, verifyJwt } from "../controllers/auth.js"
import { AddPatient, GetAPatients, GetPatients } from "../controllers/dashboard.js"
import { AddPatientSchema, GetAPatientsSchema } from "../schema/dashboard.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { AddVitalsSchema, DeleteVitalsSchema, GetVitalsSchema } from "../schema/vitals.js"
import { AddVitals, deleteVitals, GetVitals } from "../controllers/vitals.js"
import { completeAppointmentSchema, createAppointmentSchema, updateAppointmentSchema } from "../schema/appointments.js"
import { completedAppointment, createAppointment, deleteAppointment, fetchAppointments, updateAppointment } from "../controllers/appointments.js"
import { notFound } from "../controllers/notFound.js"

export const router = express.Router()


/* ---------------------authenticaton routes----------------- */

router.route('/signup').post(validate(signupSchema), signup)
router.route('/login').post(validate(signinSchema), login)
router.route('/forgot-password').post(validate(forgotPasswordSchema), forgotPassword)
router.route('/reset-password').post(validate(resetPasswordSchema), resetPassword)
router.route('/logout').get(logout)
router.route('/is-auth').get(verifyJwt, getSession)
router.route('/get-users').get(fetchUser)

/* ------------------------ Dashboard Routes ------------------------- */

router.route('/add-patient').post(/* isAuthenticated, */ validate(AddPatientSchema), AddPatient)
router.route('/get-patients').get(/* isAuthenticated, */GetPatients)
router.route('/get-patient/:id').get(validate(GetAPatientsSchema), GetAPatients)

/* ------------------------ Vitals Routes ------------------------- */

router.route('/add-vitals').post(isAuthenticated, validate(AddVitalsSchema), AddVitals)
router.route('/delete-patients/:id').get(validate(DeleteVitalsSchema), deleteVitals)
router.route('/get-vitals/:id').get(validate(GetVitalsSchema), GetVitals)

/* ------------------------ Appointments Routes ------------------------- */
router.route('/add-appointment').post(validate(createAppointmentSchema), createAppointment)
router.route('/update-appointment/:id').patch(validate(updateAppointmentSchema), updateAppointment)
router.route("/cancel-appointment/:id").delete(deleteAppointment)
router.route('/get-appointments').get(fetchAppointments)
router.route("/complete-appointment/:id").patch(validate(completeAppointmentSchema), completedAppointment)

/* ------------------------ Not found Routes ------------------------- */
router.route('/{*any}').all(notFound)