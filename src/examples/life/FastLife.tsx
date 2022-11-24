/**
 * An implementation of the game of life
 * 
 * See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life 
 */
import { FC, memo, useCallback, useEffect, useRef, useState } from "react"
import CanvasWrapper, { DrawFunction } from "../../components/CanvasWrapper";
import { FastLifeProps, LifeTypes } from "./LifeEntities";
 
const FastLife: FC<FastLifeProps<LifeTypes>> = memo(({ width, height, setInitialising, setGenerations, lifeStore, paused, size}): JSX.Element => {
  const [ attrs] = useState({ canvasAttrs: { width: width * size, height: height * size }});

  // Ref for paused so that it can be evaluated in the callback without it being updatd by paused being toggled  
  const isPaused = useRef<boolean>(paused); 
  useEffect(() => { isPaused.current = paused });
  const draw = useCallback<DrawFunction>((context: CanvasRenderingContext2D) => {
      const render = () => {
        if (!isPaused.current) {
          lifeStore?.process();
          setGenerations();
        }
        setInitialising(false);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        const incX = context.canvas.width / width;
        const incY = context.canvas.height / height;
        const sizeX = incX * .8;
        const sizeY = incY * .8;
        lifeStore?.renderData.map((elem: LifeTypes, i: number) => {
          context.fillStyle = lifeStore.getFillColor(elem);
          const y = Math.floor(i / width)
          const x = i - (y * width);
          context.fillRect(x * incX, y * incY, sizeX, sizeY);
          return elem;
        });
      };
      render();
  }, [lifeStore, width, height, setGenerations, setInitialising]);
  return (
    <div className="FastLife"><CanvasWrapper draw={draw} {...attrs} /></div>
  );
});
 
 export default FastLife;