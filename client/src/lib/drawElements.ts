import getStroke from "perfect-freehand";
import { RoughCanvas } from "roughjs/bin/canvas";

const getSvgPathFromStroke = (stroke: number[][]) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"],
  );

  d.push("Z");
  return d.join(" ");
};

const drawElements = (
  _roughCanvas: RoughCanvas,
  context: CanvasRenderingContext2D,
  element: SElement,
) => {
  switch (element.type) {
    case "pencil":
      const stroke = getSvgPathFromStroke(
        getStroke(element.points, {
          size: 12,
          thinning: 0.7,
        }),
      );
      context.fillStyle = element.color;
      context.fill(new Path2D(stroke));
      break;
  }
};

export default drawElements;
