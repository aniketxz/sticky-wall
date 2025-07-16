import React, { useState } from "react";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useNotes from "../hooks/useNotes";
import NoteAddPanel from "../components/homepage/NoteAddPanel";
import NotesPanel from "../components/homepage/NotesPanel";

function getRandomRotation() {
  return Math.floor(Math.random() * 10 - 5); // -5 to +5 degrees
}

const Home = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [positions, setPositions] = useState({}); // Only for rearranged notes
  const [rotations, setRotations] = useState({});

  function handleDropNote(note) {
    addNote({ title: note.title, content: note.content, x: note.x, y: note.y });
    setTimeout(() => {
      const latest = notes[0];
      if (latest) {
        setRotations((prev) => ({ ...prev, [latest.id]: getRandomRotation() }));
      }
    }, 500);
    toast.success("Note Added 🫡");
  }

  function handleMoveNote(id, x, y) {
    setPositions((prev) => ({ ...prev, [id]: { x, y } }));
    updateNote(id, { x, y });
  }

  function handleEditNote(/* note */) {
    // Optionally, open a modal for editing
    // Not implemented in this minimal version
  }

  function handleDeleteNote(id) {
    deleteNote(id);
    setPositions((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setRotations((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    toast.info("Note deleted 🚮");
  }

  // Use note.x and note.y if present, otherwise fallback to positions state
  const notesWithPos = notes.map((n, idx) => {
    const pos = (n.x != null && n.y != null)
      ? { x: n.x, y: n.y }
      : (positions[n.id] || { x: 40 + idx * 40, y: 40 + idx * 30 });
    return { ...n, rotation: rotations[n.id], pos };
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div className="flex w-full gap-4">
        <div className="w-[35%] min-w-[320px]">
          <NoteAddPanel onSave={() => {}} />
        </div>
        <div className="w-[65%]">
          <NotesPanel
            notes={notesWithPos}
            positions={{}} // not used anymore
            onDropNote={handleDropNote}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onMoveNote={handleMoveNote}
          />
        </div>
      </div>
      <ToastContainer autoClose={2000} theme={"dark"} />
    </DndProvider>
  );
};

export default Home;
