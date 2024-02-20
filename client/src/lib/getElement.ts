import { positionWithinElement } from "./utils";

const getElementfromPosition = (x: number, y: number, elements: SElement[]) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};

export { getElementfromPosition };
