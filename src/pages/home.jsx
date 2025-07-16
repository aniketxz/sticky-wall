import React, { useState } from "react";
import Header from "../components/Header";
import NoteGrid from "../components/NoteGrid";
import NoteModal from "../components/NoteModal";
import useNotes from "../hooks/useNotes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

  const { notes, addNote, updateNote, deleteNote } = useNotes();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  
  
  function openNewNoteModal() {
    setEditingNote(null);
    setModalIsOpen(true);
  }
  
  function handleEditNote(note) {
    setEditingNote(note);
    setModalIsOpen(true);
  }
  
  function handleSaveNote(noteData) {
    if (noteData.id) {
      updateNote(noteData.id, {
        title: noteData.title,
        content: noteData.content,
      });
    } else {
      addNote(noteData);
    }
    setModalIsOpen(false);
    toast.success("Note Saved 🫡");
  }
  
  function handleDeleteNote(id) {
    deleteNote(id);
    toast.info("Note deleted 🚮");
  }

  return (
    <>
      <Header />
      <NoteGrid
        notes={notes}
        onEdit={handleEditNote}
        onAdd={openNewNoteModal}
        onDelete={handleDeleteNote}
      />
      {modalIsOpen && (
        <NoteModal
          onClose={() => setModalIsOpen(false)}
          onSave={handleSaveNote}
          editingNote={editingNote}
        />
      )}

      <ToastContainer autoClose={2000} theme={"dark"} />
    </>
  );
};

export default Home;
