import { useState } from "react"
import { notes } from "./util"
import Note from "./Note"
import Modal from "./components/Modal"
import {nanoid} from "nanoid"

function App() {
  const [notesCollection, setNotesCollection] = useState(notes)
  console.log(notesCollection)

  return (
    <>
      <header className="mt-4">
        <h1 className="text-4xl font-semibold text-white">Sticky Wall</h1>
      </header>

      <main className="flex gap-4 flex-wrap my-6">
        {notesCollection.map((noteItem) => (
          <Note key={noteItem.id} id={noteItem.id} title={noteItem.title} notes={noteItem.notes} />
        ))}
        <DialogModal setNotesCollection={setNotesCollection} />
      </main>
    </>
  )
}

function DialogModal({notesCollection, setNotesCollection}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  function saveNote(formData) {
    const newTitle = formData.get("title")
    const newNotes = formData.get("notes").split("\n").filter(line => line.trim() !== "")
    setNotesCollection(prevNotes => [...prevNotes, {id: nanoid(), title: newTitle, notes: newNotes}])
    closeModal()
  }

  return (
    <>
      <button
        onClick={openModal}
        className="min-h-60 w-72 rounded-sm p-4 text-2xl font-light bg-gray-500 cursor-pointer hover:bg-gray-400 transition">
        Add <br /> New Note
      </button>

      <Modal
        showModal={modalIsOpen}
        saveNote={saveNote}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
