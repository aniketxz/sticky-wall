import { useMemo } from "react";
import { getRandomColor } from "../data/noteColors";
import { MdEditNote } from "react-icons/md";
import { IoMdTrash } from "react-icons/io"

function NoteCard({ id, title, content, onEdit, onDelete }) {
  const backgroundColor = useMemo(() => getRandomColor(), []);

  return (
    <div
      style={{ backgroundColor }}
      className="w-72 min-h-60 p-4 flex flex-col justify-between rounded shadow-md text-gray-900 overflow-y-auto"
    >
      <div>
        <h2 className="text-xl font-hanken font-semibold mb-2 break-words">{title}</h2>
        <ul className="mb-4">
          {content.map((line, index) => (
            <li key={index} className="text-sm mb-1 before:content-['-'] before:mr-1">
              {line}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end items-end text-xs gap-1">
        <button
          onClick={() => onEdit({ id, title, content })}
          className="hover:opacity-80 cursor-pointer"
          title="Edit note"
        >
          <MdEditNote className="w-5 h-5 text-[#161b21]" />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="hover:opacity-80 cursor-pointer"
          title="Delete note"
        >
          <IoMdTrash className="w-4 h-5 text-[#161b21]" />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;