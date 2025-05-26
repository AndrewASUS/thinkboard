import Note from "../models/note.model.js"



// CREATE CREATE CREATE CREATE CREATE CREATE  
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = new Note({
            title: title,
            content: content
        })
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error in createNote function, note.controller.js")
        res.status(500).json({ message: "Internal server error" })
    }
}



// READ READ READ READ READ READ READ READ READ
export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }) // Sorted by most recent first
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes function, note.controller.js", error)
        res.status(500).json({ message: "Internal server error" })
    }
}



// READ READ READ READ READ READ READ READ READ
export const getNoteBydId = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: "Note not found" })

        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getNoteBydId function, note.controller.js", error)
        res.status(500).json({ message: "Internal server error" })
    }
}



// UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE 
export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true }) // {new: true} will return the new note with updated fields
        if (!updatedNote) return res.status(404).json({ message: "Note not found" })

        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error in updateNote function, note.controller.js", error)
        res.status(500).json({ message: "Internal server error" })
    }
}



// DELETE DELETE DELETE DELETE DELETE DELETE 
export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({ message: "Note not found" })

        res.status(200).json({ message: "Note deleted successfully" })
    } catch (error) {
        console.error("Error in deleteNote function, note.controller.js", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
