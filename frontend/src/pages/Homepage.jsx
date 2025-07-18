import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("Error in fetching notes", error);
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        ) : notes.length === 0 ? (
          <NotesNotFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
