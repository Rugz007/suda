interface Point {
  x: number;
  y: number;
  pressure?: number;
}

interface SElement {
  id: number;
  type: "pencil";
  points: Point[];
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  color: string;
}

interface SelectedElement extends SElement {
  xOffset: number[];
  yOffset: number[];
}

interface Coordinate {
  x: number;
  y: number;
}
