import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import noteRoutes from "./routes/note.route.js"
import { connectDB } from "./config/db.js"


dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json()) // allows you to parse the body of the request

//  middleware test 
// app.use((req, res, next) => {
//     console.log(`Middleware test: ${req.method} ${req.url}`)
//     next()
// })


app.use("/api/notes", noteRoutes)

const PORT = process.env.PORT || 5001



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at http://localhost:" + PORT)
    })
})
