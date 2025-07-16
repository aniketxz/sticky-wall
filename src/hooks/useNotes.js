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

export default function useNotes() {
  const [notes, setNotes] = useState([]);

  // Add note to Firestore
  async function addNote({ title, content, x, y }) {
    await addDoc(collection(db, "notes"), {
      title,
      content,
      x: x ?? null,
      y: y ?? null,
      createdAt: serverTimestamp(),
    });
  }

  // Update note in Firestore
  async function updateNote(id, updated) {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, updated);
  }

  // Delete note from Firestore
  async function deleteNote(id) {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
  }

  // Real-time listener for notes
  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    return unsubscribe;
  }, []);

  return { notes, addNote, updateNote, deleteNote };
}
