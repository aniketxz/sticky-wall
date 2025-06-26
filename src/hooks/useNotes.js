import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function useNotes(initialNotes = []) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : initialNotes;
  });

  function addNote({ title, content }) {
    setNotes(prev => [
      ...prev,
      {
        id: nanoid(),
        title,
        content,
        createdAt: new Date(),
      },
    ]);
  }

  function updateNote(id, updated) {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, ...updated } : note
      )
    );
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return { notes, addNote, updateNote, deleteNote };
}
