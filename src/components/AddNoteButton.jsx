function AddNoteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-72 min-h-60 rounded-sm p-4 text-2xl font-light bg-gray-500 cursor-pointer hover:bg-gray-400 transition"
      title="➕ Add Note"
    >
      Add <br /> New Note
    </button>
  );
}

export default AddNoteButton;
