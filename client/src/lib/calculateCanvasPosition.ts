const calculatePosition = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  parentReference: React.MutableRefObject<HTMLDivElement | null>,
) => {
  if (!parentReference.current) return { x: 0, y: 0 };
  const x = e.clientX - parentReference.current.offsetLeft;
  const y = e.clientY - parentReference.current.offsetTop;
  return { x, y };
};

export default calculatePosition;
