import { useState, useEffect, useCallback } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const GRID_ROWS = 19;
const GRID_COLS = 12;
const TOTAL_CELLS = GRID_ROWS * GRID_COLS;

// Helper to create an empty grid
function createEmptyGrid() {
  return Array(TOTAL_CELLS).fill(null);
}

export default function useColors(shouldStop = false) {
  const [colorGrid, setColorGrid] = useState(createEmptyGrid());

  // Real-time listener for color grid
  useEffect(() => {
    if (shouldStop) return; // Don't subscribe if stopped
    const gridDocRef = doc(db, "global", "colorGrid");
    const unsubscribe = onSnapshot(gridDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setColorGrid(docSnap.data().grid || createEmptyGrid());
      } else {
        setColorGrid(createEmptyGrid());
      }
    });
    return unsubscribe;
  }, [shouldStop]);

  // Fill a cell with a color and update Firestore (unless stopped)
  const fillCell = useCallback(
    async (cellIndex, color) => {
      if (!color) return;
      const newGrid = [...colorGrid];
      newGrid[cellIndex] = color;
      setColorGrid(newGrid);
      if (!shouldStop) {
        const gridDocRef = doc(db, "global", "colorGrid");
        await setDoc(gridDocRef, { grid: newGrid });
      }
    },
    [colorGrid, shouldStop]
  );

  // Optionally, clear a cell
  const clearCell = useCallback(
    async (cellIndex) => {
      const newGrid = [...colorGrid];
      newGrid[cellIndex] = null;
      setColorGrid(newGrid);
      if (!shouldStop) {
        const gridDocRef = doc(db, "global", "colorGrid");
        await setDoc(gridDocRef, { grid: newGrid });
      }
    },
    [colorGrid, shouldStop]
  );

  return {
    colorGrid,
    fillCell,
    clearCell,
    GRID_ROWS,
    GRID_COLS,
    TOTAL_CELLS,
  };
}
