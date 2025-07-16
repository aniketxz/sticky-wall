import React, { useState } from "react";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useNotes from "../hooks/useNotes";
import NoteAddPanel from "../components/homepage/NoteAddPanel";
import NotesPanel from "../components/homepage/NotesPanel";
import useColors from "../hooks/useColors";
import ColorBox from "../components/homepage/ColorBox";

function getRandomRotation() {
    return Math.floor(Math.random() * 10 - 5); // -5 to +5 degrees
}

const Home = () => {
    // Set shouldStop=true to disable all API calls and use only local state
    const { notes, addNote, updateNote, deleteNote } = useNotes(false);
    const [positions, setPositions] = useState({}); // Only for rearranged notes
    const [rotations, setRotations] = useState({});

    // --- Color Box State ---
    const { colorGrid, fillCell, GRID_ROWS, GRID_COLS } = useColors(false);

    function handleDropNote(note) {
        addNote({
            title: note.title,
            content: note.content,
            x: note.x,
            y: note.y,
        });
        setTimeout(() => {
            const latest = notes[0];
            if (latest) {
                setRotations((prev) => ({
                    ...prev,
                    [latest.id]: getRandomRotation(),
                }));
            }
        }, 500);
        toast.success("Note Added 🫡");
    }

    function handleMoveNote(id, x, y) {
        setPositions((prev) => ({ ...prev, [id]: { x, y } }));
        updateNote(id, { x, y });
    }

    function handleEditNote(/* note */) {
        // Optionally, open a modal for editing
        // Not implemented in this minimal version
    }

    function handleDeleteNote(id) {
        deleteNote(id);
        setPositions((prev) => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
        setRotations((prev) => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
        toast.info("Note deleted 🚮");
    }

    // Use note.x and note.y if present, otherwise fallback to positions state
    const notesWithPos = notes.map((n, idx) => {
        const pos =
            n.x != null && n.y != null
                ? { x: n.x, y: n.y }
                : positions[n.id] || { x: 40 + idx * 40, y: 40 + idx * 30 };
        return { ...n, rotation: rotations[n.id], pos };
    });

    // Force color box to 25 rows x 12 columns
    const COLORBOX_ROWS = 22;
    const COLORBOX_COLS = 12;

    return (
        <DndProvider backend={HTML5Backend}>
            <Header />
            <div className="flex flex-row w-full h-[calc(100vh-85px)] gap-2 px-4 box-border">
                {/* Left: NoteAddPanel and NotesPanel side by side */}
                <div className="flex flex-row flex-[3] gap-2 h-full ">
                    <div className="w-[300px] h-full flex-shrink-0">
                        <NoteAddPanel onSave={() => {}} />
                    </div>
                    <div className="flex-1 h-full overflow-y-auto">
                        <NotesPanel
                            notes={notesWithPos}
                            positions={{}} // not used anymore
                            onDropNote={handleDropNote}
                            onEdit={handleEditNote}
                            onDelete={handleDeleteNote}
                            onMoveNote={handleMoveNote}
                        />
                    </div>
                </div>
                {/* Right: Color Box (vertical) */}

                <div className="flex flex-col h-fit items-center">
                    <ColorBox
                        colorGrid={colorGrid}
                        onFill={fillCell}
                        GRID_ROWS={COLORBOX_ROWS}
                        GRID_COLS={COLORBOX_COLS}
                    />
                </div>
            </div>
            <ToastContainer autoClose={2000} theme={"dark"} />
        </DndProvider>
    );
};

export default Home;
