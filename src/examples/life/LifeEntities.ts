export type LifeContainerProps = {
  width: number,
  height: number
}

export type LifeProps = {
  width: number,
  height: number,
  setInitialising: React.Dispatch<React.SetStateAction<boolean>>,
  paused: boolean,
  increaseGenerations: React.DispatchWithoutAction,
  lifeStore: LifeStore
}

export type FastLifeProps = LifeProps & {
  size: number
}

export class Cell {
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

export class LifeStore {
  cells!: Cell[];
  renderData: boolean[] = [];

  constructor (width: number, height: number) {
    this.reset(width, height);
  }

  private transfer = () => {
    this.renderData = this.cells.map((cell: Cell) => cell.transfer());
  }

  public reset = (width: number, height: number) => {
    this.cells = Array.from(
      Array( width * height ), 
      (_, index, ) => new Cell(index, width, height)
    );
    this.cells.forEach((cell: Cell, _, self: Cell[]) => {
      cell.setNeighbourCells(self);
    });
    this.transfer();
  }

  public process = (): void => {
    this.cells.forEach((cell: Cell) => cell.prepare());      
    this.transfer();
  }
}