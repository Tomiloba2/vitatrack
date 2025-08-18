import local from 'passport-local'
import passport from 'passport'
import prisma from './prisma.js'
import *as bcrypt from 'bcrypt'

export const LocalStrategy = new local.Strategy({
    usernameField: `email`,
    passwordField: `password`
}, async (email, password, done) => {
    try {
        //check if user email exist
        const user = await prisma.user.findUnique({ where: { email: email } })
        if (!user) {
            return done(null, false, { message: `user account with this email  address was not found, please signup` })
        } else if (! await bcrypt.compare(password, user.password)) {
            return done(null, false, { message: `password is incorrect` })
        }
        return done(null, user)
    } catch (error) {
        done(error)
    }
})

passport.use(LocalStrategy)

passport.serializeUser((user: any, done) => {
    return done(null, user.id)
})
passport.deserializeUser(async (id: any, done) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: id } })
        return done(null, user)
    } catch (error) {
        done(error)
    }
})

export default passport