import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import noteRoutes from "./routes/note.route.js"
import { connectDB } from "./config/db.js"
import path from "path" // Already provided from node.js, no need to install
import job from "./config/cron.js"



dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()


// Middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}


// Calling cron to send an GET request to render.com every 14 minutes 
if (NODE_ENV === "production") job.start()


app.use(express.json()) // allows you to parse the body of the request


app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true })
})



//  middleware test 
// app.use((req, res, next) => {
//     console.log(`Middleware test: ${req.method} ${req.url}`)
//     next()
// })


app.use("/api/notes", noteRoutes)

if (process.env.NODE_ENV === "production") {
    // Join the front end and backend in one path
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at http://localhost:" + PORT)
    })
})
