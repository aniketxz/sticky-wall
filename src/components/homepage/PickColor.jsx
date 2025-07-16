import React from "react";

const COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Green
  "#45B7D1", // Blue
  "#F0E68C", // Yellow
  "#98FB98", // Orange
  "#FFE4E1", // Purple
  "#2C3E50", // Black
  "#FFFFFF"  // White
];

export default function PickColor({ onPick, position, visible, alignLeft, alignTop }) {
  if (!visible) return null;
  let transform = "";
  if (alignLeft && alignTop) transform = "translate(-100%, -100%)";
  else if (alignLeft) transform = "translateX(-100%)";
  else if (alignTop) transform = "translateY(-100%)";
  return (
    <div
      className="fixed z-50 flex flex-col gap-1 p-2 bg-white border border-gray-300 shadow-lg"
      style={{
        top: position.y,
        left: position.x,
        minWidth: 120,
        borderRadius: 6,
        transform,
      }}
    >
      <div className="grid grid-cols-4 gap-2">
        {COLORS.map((color) => (
          <button
            key={color}
            className="w-8 h-8 border-2 border-gray-200 focus:outline-none"
            style={{ background: color, borderRadius: 0 }}
            onClick={() => onPick(color)}
            aria-label={`Pick color ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
