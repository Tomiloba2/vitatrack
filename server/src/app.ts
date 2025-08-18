import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import cookieParser from "cookie-parser"
import cors, { CorsOptions } from "cors"
import express, { Response, Request } from "express"
import session from "express-session"
import passport from "passport"
import prisma from "./libs/prisma.js"
import errorHandler from "./middleware/errorHandler.js"
import { router } from "./routes/index.js"

const app = express()
/* ----------------express CORS configuration------------------------ */
const corsOpt: CorsOptions = {
    origin: [""],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
}
/*----------- express middleware configuration------------ */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOpt))
app.use(cookieParser())
/* -------------express session configuration--------------------- */
app.use(session({
    secret: process.env.session || "hbnbhhh",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined
        })
}))
/* ---------------------passport configuration------------------------------- */
app.use(passport.initialize())
app.use(passport.session())

/* -------------------------Express route handlers--------------------------- */
app.use('/api', router)
app.get('/', (res: Response, req: Request) => {

    console.log('hello');
    res.status(200).send("hello world")

})
/* ---------------------express error handlers------------------------------ */
app.use(errorHandler)

/* ------------------express output------------------------------------- */
const Port = process.env.port

app.listen(Port, () => {
    console.log(`server is active at port ${Port}`)
})

export default app