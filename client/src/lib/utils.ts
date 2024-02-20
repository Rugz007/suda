import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// distance function allows us to calculate the differences between the x,y values.
const distanceCalculater = (a: Coordinate, b: Coordinate) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const onLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number,
  maxDistance = 1,
) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset =
    distanceCalculater(a, b) -
    (distanceCalculater(a, c) + distanceCalculater(b, c));
  return Math.abs(offset) < maxDistance ? "inside" : null; // We are giving some offset so that we can easily click on the line.
};

const positionWithinElement = (x: number, y: number, element: SElement) => {
  const { type } = element;
  switch (type) {
    case "pencil":
      const betweenAnyPoint = element.points.some((point, index) => {
        const nextPoint = element.points[index + 1];
        if (!nextPoint) return false;
        return (
          onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 20) != null
        );
      });
      return betweenAnyPoint ? "inside" : null;
    default:
      return null;
  }
};

const cursorChangerForPositions = (position: string | null) => {
  switch (position) {
    case "topLeft":
    case "bottomRight":
    case "start":
    case "end":
      return "nwse-resize"; // name of the cursor element //nort-west-south-east resize handle
    case "topRight":
    case "bottomLeft":
      return "nesw-resize"; // name of the cursor element //nort-east-south-west resize handle
    default:
      return "move";
  }
};

export {
  distanceCalculater,
  onLine,
  positionWithinElement,
  cursorChangerForPositions,
};
