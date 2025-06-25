import { getRandomColor } from "./util"

function Note({ id, title, notes }) {
  const randomBgColor = getRandomColor()

  return (
    <div
      style={{ backgroundColor: randomBgColor }}
      className="w-72 h-60 rounded-sm p-4 cursor-pointer overflow-x-clip overflow-y-auto"
    >
      <h2 className="text-xl font-medium mb-2">{title}</h2>
      <ul>
        {notes.map((item, index) => 
          <li
            key={index}
            className="text-xs text-gray-700 mb-0.5 before:content-['-'] before:mr-1"
          >{item}</li>
        )}
      </ul>
      <button
        onClick={() => handleEdit(id)}
      >
        Edit
      </button>
    </div>
  )
}

export default Note