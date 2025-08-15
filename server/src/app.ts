import express from "express"

const app = express()

app.listen(2000, () => {
    console.log(`server is active at port ${2000}`)
})

export default app