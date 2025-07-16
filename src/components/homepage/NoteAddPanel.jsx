import React, { useState } from "react";
import { useDrag } from "react-dnd";

const NoteAddPanel = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);

  const canDrag = title.trim() && content.trim() && saved;

  const [{ isDragging }, drag] = useDrag({
    type: "NOTE",
    item: { title, content },
    canDrag: () => canDrag,
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onSave({ title: item.title, content: item.content });
        setTitle("");
        setContent("");
        setSaved(false);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      setSaved(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[340px] bg-white/90 rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center tracking-tight">Create a New Note</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-400 transition rounded-lg px-3 py-2 text-base text-gray-800 shadow-sm outline-none"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-400 transition rounded-lg px-3 py-2 text-base text-gray-800 shadow-sm outline-none resize-none"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-blue-500 hover:to-blue-700 transition disabled:opacity-50"
            disabled={saved}
          >
            {saved ? "Ready to Drag" : "Save"}
          </button>
        </form>
        {saved && (
          <div className="flex flex-col items-center mt-2">
            <span className="text-xs text-gray-500 mb-1">Drag this note to the wall</span>
            <div
              ref={drag}
              className={`w-72 min-h-60 p-4 rounded-xl shadow-lg border border-yellow-200 bg-yellow-50 text-gray-900 cursor-move transition-transform ${isDragging ? "opacity-50 scale-95" : ""}`}
              style={{ boxShadow: "0 4px 24px 0 rgba(255, 193, 7, 0.10)", transform: isDragging ? "scale(0.95)" : "none" }}
            >
              <h2 className="text-xl font-semibold mb-2 break-words text-yellow-900">{title}</h2>
              <div className="text-sm whitespace-pre-line text-yellow-800">{content}</div>
              <div className="text-xs text-right mt-2 text-yellow-700">Drag me to add!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteAddPanel;
