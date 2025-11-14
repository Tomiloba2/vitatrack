import cookieParser from "cookie-parser"
import cors, { CorsOptions } from "cors"
import express from "express"
import errorHandler from "./middleware/errorHandler.js"
import { router } from "./routes/index.js"
//import morgan from 'morgan'

const app = express()
/* ----------------express CORS configuration------------------------ */
const corsOpt: CorsOptions = {
    origin: ["http://localhost:5173","https://vitatrack.onrender.com"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
}
/*----------- express middleware configuration------------ */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOpt))
app.use(cookieParser())
/* if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
} */

/* -------------------------Express route handlers--------------------------- */

app.use('/api', router)

/* ---------------------express error handlers------------------------------ */

app.use(errorHandler)

/* ------------------express output------------------------------------- */
const Port = process.env.port

app.listen(Port, () => {
    console.log(`server is active at port ${Port}`)
})

export default app