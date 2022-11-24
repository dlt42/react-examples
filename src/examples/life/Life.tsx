/**
 * An implementation of the game of life
 * 
 * See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life 
 */
import { FC, memo, useEffect, useRef, useState } from "react";
import { LifeProps } from "./LifeEntities";

const Life: FC<LifeProps<boolean | number>> = memo(({ width, height, setInitialising, increaseGenerations, lifeStore, paused }): JSX.Element => {
  const [ renderData, setRenderData ] = useState<(number | boolean)[]>([]);
  
  // Ref for paused
  const isPaused = useRef<boolean>(paused); 

  // Every refresh update the ref
  useEffect(() => { isPaused.current = paused });

  // So that paused can be evaluated in the effect below without it being triggered by paused being toggled  
  useEffect(() => {
    const renderInterval = setInterval(() => {
      if (!isPaused.current) {
        lifeStore.process();
        setRenderData(lifeStore.renderData);
        increaseGenerations();
      }
      setInitialising(false);
    }, 50);
    return () => {
      clearInterval(renderInterval); 
    }
  }, [lifeStore, width, height, increaseGenerations, setInitialising]);
  return (
    <div className="Life">
      {
        renderData.map((state: number | boolean, index: number) => 
          <div key={`${index}-${state}`} style={{ backgroundColor: lifeStore.getFillColor(state) }}  className={state?"Cell-Alive":"Cell-Dead"}/>)
      }
    </div>
  );
});

export default Life;