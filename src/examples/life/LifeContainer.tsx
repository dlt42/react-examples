/**
 * An implementation of the game of life
 * 
 * See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life 
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo, useCallback, useEffect, useReducer, useState } from "react";
import './Life.css';
import { faPause, faPlay, faGauge, faGaugeHigh, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { LifeContainerProps, LifeStore } from "./LifeEntities";
import Life from "./Life";
import FastLife from "./FastLife";

enum Speed {
  "SLOW",
  "FAST"
}

const LifeContainer: FC<LifeContainerProps> = memo((props): JSX.Element => {
  const { width, height } = props;
  const [ initialising, setInitialising ] = useState(true);
  const [ generations, increaseGenerations ] = useReducer((prev: number): number => prev+1, 0);
  const [ paused, setPaused] = useState(false);
  const [ speed, setSpeed] = useState<Speed>(Speed.SLOW);
  const [ lifeStore ] = useState<LifeStore>(new LifeStore(width, height));
  useEffect(() => setInitialising(true), []);
  const reset = useCallback(() => {
    setPaused(true);
    lifeStore.reset(width,height)
    setPaused(false);
  }, [lifeStore, width, height]);
  return (
    <div className="Life-Container">
      {
      <>
        {
          speed === Speed.FAST
          ? <FastLife {...{ ...props, setInitialising, paused, increaseGenerations, lifeStore, size: 4 }}/>
          : <Life {...{ ...props, setInitialising, paused, increaseGenerations, lifeStore }} />
        }
        <div className="Life-Info">
          Total generations: {generations}
        </div>
        <div className="Life-Controls">
          <button onClick={(e) => setPaused((paused)=> !paused)}>
            <FontAwesomeIcon icon={paused ? faPlay : faPause} />
          </button>
          <button title={speed === Speed.SLOW ? "Speed up" : "Slow down"} onClick={(e) => setSpeed((current) => current === Speed.SLOW ? Speed.FAST : Speed.SLOW )}>
            <FontAwesomeIcon icon={speed === Speed.SLOW ? faGaugeHigh : faGauge} />
          </button>
          <button title="Reset" onClick={(e) => reset()}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
        </div>
      </>
      }
      {
        initialising && <div className="Life-Initialising">Initialising...</div>
      }
    </div>
  );
 });
 
 export default LifeContainer;