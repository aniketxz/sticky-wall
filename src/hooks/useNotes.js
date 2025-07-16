import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export default function useNotes(shouldStop = false) {
  const [notes, setNotes] = useState([]);

  // Add note to Firestore or just local state
  async function addNote({ title, content, x, y }) {
    if (shouldStop) {
      setNotes((prev) => [
        {
          id: `local-${Date.now()}`,
          title,
          content,
          x: x ?? null,
          y: y ?? null,
          createdAt: new Date(),
        },
        ...prev,
      ]);
      return;
    }
    await addDoc(collection(db, "notes"), {
      title,
      content,
      x: x ?? null,
      y: y ?? null,
      createdAt: serverTimestamp(),
    });
  }

  // Update note in Firestore or just local state
  async function updateNote(id, updated) {
    if (shouldStop) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, ...updated } : note
        )
      );
      return;
    }
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, updated);
  }

  // Delete note from Firestore or just local state
  async function deleteNote(id) {
    if (shouldStop) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      return;
    }
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
  }

  // Real-time listener for notes
  useEffect(() => {
    if (shouldStop) return;
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    return unsubscribe;
  }, [shouldStop]);

  return { notes, addNote, updateNote, deleteNote };
}
