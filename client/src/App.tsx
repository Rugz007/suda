import { useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import rough from "roughjs/bin/rough";
import { createElement } from "@/lib/createElement";
import drawElements from "@/lib/drawElements";
import calculatePosition from "@/lib/calculateCanvasPosition";
import Sidebar from "@/components/ui/sidebar";
import { getElementfromPosition } from "./lib/getElement";
import { cursorChangerForPositions } from "./lib/utils";

// const generator = rough.generator();

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [currentTool, setCurrentTool] = useState<"pencil" | "select" | "rectangle" | "circle" | "eraser">("pencil");
  const [elements, setElements] = useState<SElement[]>([]);
  const [action, setAction] = useState<
    "drawing" | "moving" | "resizing" | "none"
  >("drawing");
  const [selectedElement, setSelectedElement] =
    useState<SelectedElement | null>(null);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { x, y } = calculatePosition(e, parentRef);

    if (currentTool === "select") {
      const element = getElementfromPosition(x, y, elements);
      if (element) {
        if (element.type === "pencil") {
          const xOffset = element.points.map((point) => x - point.x);
          const yOffset = element.points.map((point) => y - point.y);
          setSelectedElement({ ...element, xOffset, yOffset });
        }
        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
        return;
      }
    }
    setAction("drawing");
    const element = createElement(elements.length, x, y, 0, 0, "pencil", "red");
    setElements((prev) => [...prev, element]);
  };

  const handleMouseUp = () => {
    setAction("none");
  };

  const handleMouseMoving = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { x, y } = calculatePosition(e, parentRef);

    if (currentTool === "select") {
      const element = getElementfromPosition(x, y, elements);
      // @ts-ignore
      e.target.style.cursor = element
        ? cursorChangerForPositions(element.position)
        : "default";
    }
    if (action === "drawing") {
      const index = elements.length - 1;
      updateElements(index, x, y, "red");
    } else if (action === "moving") {
      if (selectedElement && selectedElement.type === "pencil") {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: x - selectedElement.xOffset[index],
          y: y - selectedElement.yOffset[index],
        }));
        const copyElementsState = [...elements];
        copyElementsState[selectedElement.id] = {
          ...copyElementsState[selectedElement.id],
          points: newPoints,
        };
        setElements(copyElementsState);
      }
    }
  };

  const updateElements = (
    id: number,
    x2: number,
    y2: number,
    color: string
  ) => {
    const copyElementsState = [...elements];
    if (copyElementsState[id].points) {
      copyElementsState[id].points = [
        ...copyElementsState[id].points,
        { x: x2, y: y2 },
      ];
    }
    copyElementsState[id].color = color;
    setElements(copyElementsState);
  };

  const onSidebarClick = (tool: "pencil" | "select" | "rectangle" | "circle" | "eraser" | "save") => {
    if (tool == "save") {
      // TODO: save the canvas
      return;
    }
    
    setCurrentTool(tool);
  };

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = parentRef.current?.clientWidth || 0;
      canvas.height = parentRef.current?.clientHeight || 0;
      const ctx = canvas.getContext("2d");
      ctxRef.current = ctx;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const roughCanvas = rough.canvas(canvas);
        elements.forEach((element) => {
          drawElements(roughCanvas, ctx, element);
        });
      }
    }
  }, [elements]);

  return (
    <>
      <Sidebar current={currentTool} onClick={onSidebarClick} />
      <h1 className="fixed top-[1%] w-full text-center text-2xl">suda</h1>
      {elements.length === 0 && (
        <div className="pointer-events-none fixed inset-0 flex flex-col items-center justify-center opacity-30		">
          <img src="elephant.png" alt="suda" className="mb-2 h-12 w-12" />
          <h1 className="text-2xl">happy drawing! ^^</h1>
        </div>
      )}
      <div className="h-[100vh] w-full" ref={parentRef}>
        <canvas
          id="suda-canvas"
          ref={canvasRef}
          onPointerUp={handleMouseUp}
          onPointerDown={handleMouseDown}
          onPointerMove={handleMouseMoving}
        />
      </div>
    </>
  );
}

export default App;
