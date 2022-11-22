/**
 * An implementation of the game of life
 * 
 * See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life 
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo, useEffect, useReducer, useRef, useState } from "react"
import './Life.css';
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

type LifeProps = {
  width: number,
  height: number,
}

class Cell {
  position: number;
  neighbourCells: Cell[];
  neighbourPositions: number[];
  alive: boolean;
  pendingState: boolean;

  constructor(position: number, width: number, height: number) {
    this.neighbourCells = [];
    this.position = position;
    this.alive = Math.random() > .5;
    this.pendingState = this.alive;
    this.neighbourPositions = [];
    if (!this.neighbourPositions.length) {
      const posY = Math.floor(this.position / width)
      const posX = this.position - (posY * width);
      for (let adjX = -1; adjX <= 1; adjX++) {
        for (let adjY = -1; adjY <= 1; adjY++) {
          if (adjY !== 0 || adjX !== 0) {
            let partY = (((posY + adjY) % height) * width);
            if (partY < 0) {
              partY += width * height;
            }
            let partX = (posX + adjX) % width;
            if (partX < 0) {
              partX += width;
            }
            this.neighbourPositions.push( partY + partX);
          }
        }
      }
    }
  }

  public setNeighbourCells = (cells: Cell[]): void => {
    this.neighbourCells = this.neighbourPositions.map((position: number) => cells[position]);
  }

  public prepare = (): void => {
    const count = this.neighbourCells.reduce(
      (count: number, current: Cell): number => {
        return current.alive ? count + 1 : count
      }, 0)
    this.pendingState = this.alive ? count >= 2 && count <= 3 : count === 3;
  }

  public transfer = (): boolean => {
    this.alive = this.pendingState;
    return this.alive;
  }
}

class LifeStore {
  cells: Cell[];
  renderData: boolean[] = [];

  constructor (width: number, height: number) {
    this.cells = Array.from(
      Array( width * height ), 
      (_, index, ) => new Cell(index, width, height)
    );
    this.cells.forEach((cell: Cell, _, self: Cell[]) => {
      cell.setNeighbourCells(self);
    });
    this.transfer();
  }

  private transfer = () => {
    this.renderData = this.cells.map((cell: Cell) => cell.transfer());
  } 

  public process = (): void => {
    this.cells.forEach((cell: Cell) => cell.prepare());      
    this.transfer();
  }
}

const Life: FC<LifeProps> = memo(({ width, height }): JSX.Element => {
  const [ initialising, setInitialising ] = useState(true);
  const [ renderData, setRenderData ] = useState<boolean[]>([]);
  const [ generations, increaseGenerations ] = useReducer((prev: number): number => prev+1, 0);
  
  // State for the UI
  const [ paused, setPaused] = useState(false);

  // Ref for the effect
  const isPaused = useRef<boolean>(paused); 

  // Every refresh update the ref
  useEffect(() => { isPaused.current = paused });

  // So that paused can be evaluated in the effect without it being triggered by paused being toggled  
  useEffect(() => {
    setInitialising(true);
    const lifeStore: LifeStore = new LifeStore(width, height);
    
    const renderInterval = setInterval(() => {
      if (!isPaused.current) {
        lifeStore.process();
        setInitialising(false);
        setRenderData(lifeStore.renderData);
        increaseGenerations();
      }
    }, 50);
    return () => {
      clearInterval(renderInterval); 
    }
  }, [width, height]);
  return (
    <div className="Life-Container">
      {
          <>
            <div className="Life">
            {
              renderData.map((state: boolean, index: number) => <div key={`${index}-${state}`} className={state?"Cell-Alive":"Cell-Dead"}/>)
            }
            </div>
            <div className="Life-Info">
              Total generations: {generations}
            </div>
            <div className="Life-Controls">
              <button onClick={(e) => setPaused((paused)=> !paused)}>
                <FontAwesomeIcon icon={paused ? faPlay : faPause} />
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

export default Life;