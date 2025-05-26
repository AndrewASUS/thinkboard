import express from "express"
import { createNote, deleteNote, getAllNotes, getNoteBydId, updateNote } from "../controllers/note.controller.js"

const router = express.Router()


// CREATE
router.post("/", createNote)


// READ
router.get("/", getAllNotes)


// READ
router.get("/:id", getNoteBydId)


// UPDATE
router.put("/:id", updateNote)


// DELETE
router.delete("/:id", deleteNote)



export default router