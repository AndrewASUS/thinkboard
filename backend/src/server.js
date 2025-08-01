import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import noteRoutes from "./routes/note.route.js"
import { connectDB } from "./config/db.js"
import path from "path" // Already provided from node.js, no need to install


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


app.use(express.json()) // allows you to parse the body of the request


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
