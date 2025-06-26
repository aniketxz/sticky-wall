import NoteCard from "./NoteCard";
import AddNoteButton from "./AddNoteButton";

function NoteGrid({ notes, onEdit, onAdd, onDelete }) {
  return (
    <section className="flex flex-wrap gap-4 my-6">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      <AddNoteButton onClick={onAdd} />
    </section>
  );
}

export default NoteGrid;