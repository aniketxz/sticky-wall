import React, { useState, useRef, useEffect } from "react";
import PickColor from "./PickColor";

const DEFAULT_ROWS = 19;
const DEFAULT_COLS = 12;
const CELL_GAP = 2;
const CELL_MAX_SIZE = 41;
const CELL_MIN_SIZE = 20;

export default function ColorBox({ colorGrid, onFill, GRID_ROWS = DEFAULT_ROWS, GRID_COLS = DEFAULT_COLS }) {
  const [popover, setPopover] = useState({ visible: false, x: 0, y: 0, cellIdx: null, alignLeft: false, alignTop: false });
  const containerRef = useRef(null);
  const POPOVER_WIDTH = 140; // px, estimate for PickColor
  const POPOVER_HEIGHT = 80; // px, estimate for PickColor

  // Calculate cell size to fit in 90vh (or parent height)
  const [cellSize, setCellSize] = useState(CELL_MAX_SIZE);

  useEffect(() => {
    function updateCellSize() {
      const availableHeight = window.innerHeight * 0.9; // 90vh
      const size = Math.max(
        CELL_MIN_SIZE,
        Math.min(CELL_MAX_SIZE, Math.floor((availableHeight - (GRID_ROWS - 1) * CELL_GAP) / GRID_ROWS))
      );
      setCellSize(size);
    }
    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [GRID_ROWS]);

  // Handle clicking a cell: focus and show popover at cell
  const handleCellClick = (e, idx) => {
    const rect = e.target.getBoundingClientRect();
    let x = rect.left + window.scrollX + rect.width / 2;
    let y = rect.top + window.scrollY + rect.height / 2;
    let alignLeft = false;
    let alignTop = false;
    if (x + POPOVER_WIDTH > window.innerWidth - 16) { // 16px margin
      x = rect.right + window.scrollX - POPOVER_WIDTH;
      alignLeft = true;
    }
    if (y + POPOVER_HEIGHT > window.innerHeight - 16) {
      y = rect.top + window.scrollY - POPOVER_HEIGHT;
      alignTop = true;
    }
    setPopover({
      visible: true,
      x,
      y,
      cellIdx: idx,
      fixed: true,
      alignLeft,
      alignTop,
    });
  };

  // Handle hover for lively effect
  const handleCellMouseEnter = (e, idx) => {
    if (popover.fixed) return; // Don't move popover if fixed
    const rect = e.target.getBoundingClientRect();
    let x = rect.left + window.scrollX + rect.width / 2;
    let y = rect.top + window.scrollY + rect.height / 2;
    let alignLeft = false;
    let alignTop = false;
    if (x + POPOVER_WIDTH > window.innerWidth - 16) {
      x = rect.right + window.scrollX - POPOVER_WIDTH;
      alignLeft = true;
    }
    if (y + POPOVER_HEIGHT > window.innerHeight - 16) {
      y = rect.top + window.scrollY - POPOVER_HEIGHT;
      alignTop = true;
    }
    setPopover({
      visible: true,
      x,
      y,
      cellIdx: idx,
      fixed: false,
      alignLeft,
      alignTop,
    });
  };

  const handleCellMouseLeave = () => {
    if (popover.fixed) return; // Don't hide if fixed
    setPopover((p) => ({ ...p, visible: false, cellIdx: null }));
  };

  // Pick color and reset popover/focus
  const handlePick = (color) => {
    if (popover.cellIdx !== null) {
      onFill(popover.cellIdx, color);
    }
    setPopover({ visible: false, x: 0, y: 0, cellIdx: null, fixed: false, alignLeft: false, alignTop: false });
  };

  // Click outside to close popover/focus
  useEffect(() => {
    if (!popover.visible || !popover.fixed) return;
    const handleClick = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setPopover({ visible: false, x: 0, y: 0, cellIdx: null, fixed: false, alignLeft: false, alignTop: false });
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [popover.visible, popover.fixed]);

  // Only show the first GRID_ROWS * GRID_COLS cells
  const visibleCells = colorGrid.slice(0, GRID_ROWS * GRID_COLS);

  return (
    <div
      ref={containerRef}
      className="grid relative overflow-y-auto overflow-x-hidden"
      style={{
        gridTemplateRows: `repeat(${GRID_ROWS}, ${cellSize}px)`,
        gridTemplateColumns: `repeat(${GRID_COLS}, ${cellSize}px)`,
        gap: CELL_GAP,
        background: "#0f172a",
        borderRadius: 0,
        border: "",
        boxShadow: "0 2px 8px 0 #0001",
        maxHeight: `90vh`,
        maxWidth: `${GRID_COLS * (cellSize + CELL_GAP)}px`,
        minWidth: `${GRID_COLS * (cellSize + CELL_GAP)}px`,
      }}
    >
      {visibleCells.map((color, idx) => {
        const isFocused = popover.visible && popover.cellIdx === idx && popover.fixed;
        return (
          <button
            key={idx}
            tabIndex={0}
            className={`border transition-all duration-150 cursor-pointer
              ${isFocused ? "ring-2 ring-blue-400 z-10 scale-110 shadow-lg" : ""}
              ${!color ? "hover:scale-105 hover:shadow-md hover:border-blue-300" : ""}
            `}
            style={{
              width: cellSize,
              height: cellSize,
              background: color || "#1a1d2a",
              border: color ? `2px solid ${color}` : "1px solid #1a1d2a",
              borderRadius: 0,
              outline: "none",
              padding: 0,
            }}
            onMouseEnter={(e) => handleCellMouseEnter(e, idx)}
            onMouseLeave={handleCellMouseLeave}
            onClick={(e) => handleCellClick(e, idx)}
          />
        );
      })}
      <PickColor
        visible={popover.visible}
        position={{ x: popover.x, y: popover.y }}
        onPick={handlePick}
        alignLeft={popover.alignLeft}
        alignTop={popover.alignTop}
      />
    </div>
  );
}
