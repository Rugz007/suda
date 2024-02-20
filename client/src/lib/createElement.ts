import rough from "roughjs/bin/rough";

export const createElement = (
  id: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  type: string,
  color: string,
) => {
  switch (type) {
    case "pencil":
      const element: SElement = {
        id,
        type: "pencil",
        points: [{ x: x1, y: y1 }],
        color: color,
      };
      return element;
    default:
      const el: SElement = {
        id: id,
        type: "pencil",
        points: [{ x: x1, y: y1 }],
        color: color,
      };
      return el;
  }
};
