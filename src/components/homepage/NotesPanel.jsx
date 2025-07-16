import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

function getRandomRotation() {
  return Math.floor(Math.random() * 10 - 5); // -5 to +5 degrees
}

const DraggableNote = ({ note, rotation, onEdit, onDelete, onMove }) => {
  const noteRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "NOTE_CARD",
    item: () => {
      // Calculate offset between mouse and top-left of note
      const rect = noteRef.current?.getBoundingClientRect();
      const offsetX = window.__lastDragEvent ? window.__lastDragEvent.clientX - rect.left : 0;
      const offsetY = window.__lastDragEvent ? window.__lastDragEvent.clientY - rect.top : 0;
      return { id: note.id, x: note.pos.x, y: note.pos.y, offsetX, offsetY };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.x !== undefined && dropResult.y !== undefined) {
        // Adjust for offset
        const newX = dropResult.x - (item.offsetX || 0);
        const newY = dropResult.y - (item.offsetY || 0);
        onMove(note.id, newX, newY);
      }
    },
  });

  // Listen for mouse down to record the drag start event globally
  const handleMouseDown = (e) => {
    window.__lastDragEvent = e;
  };

  return (
    <div
      ref={(node) => {
        noteRef.current = node;
        drag(node);
      }}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: note.pos.x,
        top: note.pos.y,
        transform: `rotate(${rotation}deg)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        zIndex: isDragging ? 10 : 1,
      }}
      className="w-72 min-h-60 p-4 rounded shadow-md bg-yellow-100 text-gray-900"
    >
      <h2 className="text-xl font-semibold mb-2 break-words">{note.title}</h2>
      <div className="text-sm whitespace-pre-line">{Array.isArray(note.content) ? note.content.join("\n") : note.content}</div>
      <div className="flex justify-end gap-2 mt-2">
        <button onClick={() => onEdit(note)} className="text-xs px-2 py-1 bg-blue-200 rounded">Edit</button>
        <button onClick={() => onDelete(note.id)} className="text-xs px-2 py-1 bg-red-200 rounded">Delete</button>
      </div>
    </div>
  );
};

const NotesPanel = ({ notes, onDropNote, onEdit, onDelete, onMoveNote }) => {
  const panelRef = useRef(null);

  const [, drop] = useDrop({
    accept: ["NOTE", "NOTE_CARD"],
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const panelRect = panelRef.current.getBoundingClientRect();
      const x = clientOffset.x - panelRect.left;
      const y = clientOffset.y - panelRect.top;
      if (item.id) {
        // Rearranging existing note, adjust for offset
        return { x, y };
      } else {
        // Dropping new note from NoteAddPanel
        // For new notes, offset is not needed (drag always starts at top-left)
        onDropNote({ ...item, x: x - (item.offsetX || 0), y: y - (item.offsetY || 0) });
      }
    },
  });

  return (
    <div
      ref={(node) => {
        panelRef.current = node;
        drop(node);
      }}
      className="relative w-full h-full bg-white/30 rounded-lg overflow-hidden border border-gray-200"
      style={{ minHeight: 400 }}
    >
      {notes.map((note) => {
        const rotation = note.rotation || getRandomRotation();
        return (
          <DraggableNote
            key={note.id}
            note={note}
            rotation={rotation}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMoveNote}
          />
        );
      })}
    </div>
  );
};

export default NotesPanel;
