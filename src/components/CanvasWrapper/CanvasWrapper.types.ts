export type DrawFunction = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  counter: Counter
) => void;

export type Counter = { value: number };

export type PostDrawFunction = DrawFunction;

export type PreDrawFunction = DrawFunction;

export type CanvasOptions = {
  preDraw: PreDrawFunction;
  postDraw: PostDrawFunction;
};

export type CanvasProps = {
  draw: DrawFunction;
  options?: CanvasOptions;
  width: number;
  height: number;
};
