import { Button } from "./button";
import { MousePointer2, Pen, Square, Circle, Eraser, Save } from "lucide-react";

interface SidebarProps {
  current: string;
  onClick: (e: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ current, onClick }) => {
  return (
    <div className="sidebar bg-background fixed bottom-[1%] left-[50%]	 flex -translate-x-1/2 flex-row gap-2 rounded-md border px-3 py-2 shadow-2xl ">
      <Button
        variant={current === "select" ? "default" : "outline"}
        onClick={() => onClick("select")}
        size="icon"
      >
        <MousePointer2 />
      </Button>
      <Button
        variant={current === "pencil" ? "default" : "outline"}
        onClick={() => onClick("pencil")}
        size="icon"
      >
        <Pen />
      </Button>
      <Button
        variant={current === "rectangle" ? "default" : "outline"}
        onClick={() => onClick("rectangle")}
        size={"icon"}
      >
        <Square />
      </Button>
      <Button
        variant={current === "circle" ? "default" : "outline"}
        onClick={() => onClick("circle")}
        size={"icon"}
      >
        <Circle />
      </Button>
      <Button
        variant={current === "eraser" ? "default" : "outline"}
        onClick={() => onClick("eraser")}
        size={"icon"}
      >
        <Eraser />
      </Button>
      <Button variant={"outline"} onClick={() => onClick("save")} size={"icon"}>
        <Save />
      </Button>
    </div>
  );
};

export default Sidebar;
