import { FC, memo, RefObject, useRef, useEffect } from 'react'
import { logData } from '../global/util';
export type Counter = { value: number }
export type DrawFunction = (
  context: CanvasRenderingContext2D, 
  canvas: HTMLCanvasElement, 
  counter: Counter
) => void;
export type PostDrawFunction = DrawFunction;
export type PreDrawFunction = DrawFunction;
export type Options = {
  preDraw: PreDrawFunction,
  postDraw: PostDrawFunction
}
export type CanvasProps = {
  draw: DrawFunction,
  options?: Options
  canvasAttrs: Record<string, any>
}

export class CanvasTools {
  private context!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  private counter: Counter;
  private frameId: number | null;

  constructor(ref: RefObject<HTMLCanvasElement>) {
    this.setup(ref);
    this.frameId = null;
    this.counter = { value: 0 };
  }

  public setup = (ref: RefObject<HTMLCanvasElement>) => {
    if (!ref.current) 
      throw new Error("No elemen for CanvasTools");
    this.canvas = ref.current;
    if (!this.canvas) 
      throw new Error("No canvas for CanvasTools");
    const context: CanvasRenderingContext2D | null= this.canvas.getContext('2d');
    if (!context) 
      throw new Error("No context for CanvasTools");;
    this.context = context;
  }

  private resize = (): boolean => {
    const { canvas, context } = this;
    const { width, height } = canvas.getBoundingClientRect()
    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio=1 } = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
      return true;
    }
    return false;
  }

  private handleOp = (basic: Function | null,  callback: DrawFunction | null) => {
    const { context, canvas, counter } = this;
    if (callback)
      callback(context, canvas, counter);
    else if (basic)
      basic();
  }

  public getFrameId = (): number | null => this.frameId;

  public setFrameId = (id :number) => this.frameId = id;

  public postDraw = (callback?: DrawFunction) => {
    this.handleOp(() => {
      const { context, counter } = this;
      counter.value++
      context.restore()
    }, callback || null);
  }

  public draw = (callback?: DrawFunction) => {
    this.handleOp(null, callback || null);
  }

  public preDraw = (callback?: PreDrawFunction) => {
    this.handleOp(() => {
      const { context } = this;
      context.save();
      this.resize();
      const { width, height } = context.canvas;
      context.clearRect(0, 0, width, height);
    }, callback || null);
  }
}

const useCanvasWrapper: Function = (draw: DrawFunction, options?: Options): RefObject<HTMLCanvasElement> => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const tools: CanvasTools = new CanvasTools(canvasRef);
    const render = () => {
      try {
        tools.setup(canvasRef);
        tools.preDraw(options?.preDraw);
        tools.draw(draw);
        tools.postDraw(options?.postDraw);
      } catch(e: any) {
        logData(e);
      }
      const id: number = window.requestAnimationFrame(render);
      tools.setFrameId(id);
    }
    render();
    return () => {
      const id: number | null = tools.getFrameId();
      if (id !== null)
        window.cancelAnimationFrame(id);
    }
  }, [draw, options]);
  return canvasRef
}

const CanvasWrapper: FC<CanvasProps> = memo((props): JSX.Element => {
  const { draw, options, canvasAttrs } = props
  const canvasRef = useCanvasWrapper(draw, options)
  return <canvas ref={canvasRef} {...canvasAttrs}/>
});

export default CanvasWrapper;

