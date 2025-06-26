export function getRandomColor() {
  const colors = [
    "#D6D6FA",
    "#E1FFF4",
    "#F8C3C7",
    "#8ED0E6",
    "#E0FFF2",
    "#EAEAC0",
    "#D6F1FF",
    "#FFD6E8",
    "#FFCFC5",
    "#F2E5D6",
    "#FFC4A1",
    "#FFF29F"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}