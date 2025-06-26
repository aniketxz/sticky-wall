import { useState } from "react";
import { nanoid } from "nanoid";

export default function useNotes(initialNotes = []) {
  const [notes, setNotes] = useState(initialNotes);

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

  return { notes, addNote, updateNote, deleteNote };
}
