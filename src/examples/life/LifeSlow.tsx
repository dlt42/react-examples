/**
 * An implementation of the game of life
 * 
 * See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life 
 */
import { FC, memo, useEffect, useRef, useState } from "react";
import { LifeTypes } from "./LifeAbstract";
import { LifeSlowProps } from "./LifeEntities";

const LifeSlow: FC<LifeSlowProps<LifeTypes>> = memo(({ width, height, setInitialising, lifeStore, paused, rendered }): JSX.Element => {
  const [ renderData, setRenderData ] = useState<LifeTypes[]>([]);
  
  // Ref for paused so that it can be evaluated in the callback without it being updatd by paused being toggled  
  const isPaused = useRef<boolean>(paused); 
  useEffect(() => { isPaused.current = paused });
  useEffect(() => {
    const renderInterval = setInterval(() => {
      if (!isPaused.current) {
        lifeStore.process();
      }
      setInitialising(false);
      setRenderData(lifeStore.renderData);
      rendered();
    }, 50);
    return () => {
      clearInterval(renderInterval); 
    }
  }, [rendered, lifeStore, width, height, setInitialising]);
  return (
    <div className="Life">
      {
        renderData.map((state: LifeTypes, index: number) => 
          <div key={`${index}-${state}`} style={{ backgroundColor: lifeStore.getFillColor(state) }}  className="Cell"/>)
      }
    </div>
  );
});

export default LifeSlow;