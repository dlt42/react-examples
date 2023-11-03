import { RefObject } from 'react';

export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const setRefStyle = (
  ref: RefObject<HTMLDivElement>,
  diameter: number
) => {
  if (!ref.current) {
    return;
  }
  const style = ref.current.style;
  const value = diameter + `px`;
  style.minWidth = value;
  style.maxWidth = value;
  style.minHeight = value;
  style.maxHeight = value;
  style.borderRadius = diameter / 2 + `px`;
};
