import { useState, useEffect, useRef } from "react";

function NoteModal({ onClose, onSave, editingNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(
        Array.isArray(editingNote.content)
          ? editingNote.content.join("\n")
          : editingNote.content || ""
      );
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      id: editingNote?.id,
      title: title.trim(),
      content: content.split("\n").filter((line) => line.trim() !== ""),
    });
  }

  return (
    <div className='fixed inset-0 z-50 font-hanken flex items-center justify-center backdrop-blur-sm'>
      <div className='bg-white w-full max-w-xl overflow-hidden rounded-lg shadow-lg p-6'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            name='title'
            placeholder='Grocery List'
            value={title}
            ref={titleRef}
            onChange={(e) => setTitle(e.target.value)}
            className='text-xl/loose border-b border-gray-300 focus:outline-none'
            required
          />
          <textarea
            name='content'
            rows={8}
            placeholder={"Aloo, \nPyaz"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='text-sm resize-none border p-2 focus:outline-none rounded-md'
            required
          />
          <div className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border rounded-md hover:bg-gray-100 cursor-pointer'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-black text-white rounded hover:opacity-80 cursor-pointer'
            >
              {editingNote ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
