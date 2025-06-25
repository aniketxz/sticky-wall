const notes = [
  {
    id: 1,
    title: "React JS Basics",
    notes: [
      "Components are the building blocks of React.",
      "JSX is a syntax extension for JavaScript.",
      "State and props control component behavior."
    ]
  },
  {
    id: 2,
    title: "Node.js Fundamentals",
    notes: [
      "Node.js is JavaScript runtime built on Chrome's V8 engine.",
      "Uses event-driven, non-blocking I/O model.",
      "Commonly used for building backend services."
    ]
  },
  {
    id: 3,
    title: "REST API Principles",
    notes: [
      "Uses HTTP methods like GET, POST, PUT, DELETE.",
      "Resources are represented via URLs.",
      "Stateless communication between client and server."
    ]
  },
  {
    id: 4,
    title: "Version Control with Git",
    notes: [
      "Git tracks changes in files and coordinates work.",
      "Commits are snapshots of project history.",
      "Branches allow parallel development."
    ]
  },
  // {
  //   title: "Tailwind CSS",
  //   notes: [
  //     "Utility-first CSS framework.",
  //     "Enables rapid UI development with minimal CSS.",
  //     "Customizable through `tailwind.config.js`."
  //   ]
  // }
];

const colorHexes = [
  "#D6D6FA",
  "#E1FFF4",
  "#F8C3C7",
  "#8ED0E6",
  "#E0FFF2",
  "#EAEAC0",
  "#FFE9E2",
  "#D6F1FF",
  "#FFD6E8",
  "#FFCFC5",
  "#C6FFFF",
  "#F2E5D6",
  "#FFC4A1",
  "#FFF29F"
];

function getRandomColor() {
  const idx = Math.floor(Math.random() * colorHexes.length)
  return colorHexes[idx]
}

export {notes, getRandomColor}