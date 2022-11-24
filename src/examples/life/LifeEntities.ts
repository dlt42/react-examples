
export const colors: string[] = [
  "#000000",
  "#ff0000",
  "#ff8c00",
  "#e1ff00",
  "#55ff00",
  "#00ff37",
  "#00ffc8",
  "#00aaff",
  "#001eff",
  "#7300ff",
  "#ff00ff"
];

export const lastColor: string = colors[colors.length-1];

export type LifeTypes = boolean | number;

export type LifeContainerProps = {
  width: number,
  height: number
}

export type LifeProps<T extends LifeTypes> = {
  width: number,
  height: number,
  setInitialising: React.Dispatch<React.SetStateAction<boolean>>,
  paused: boolean,
  setGenerations: React.DispatchWithoutAction,
  lifeStore: AbstractLifeStore<T>
}

export type FastLifeProps<T  extends LifeTypes> = LifeProps<T> & {
  size: number
}

export abstract class AbstractCell<T extends LifeTypes> {
  position: number;
  neighbourCells: AbstractCell<T>[];
  neighbourPositions: number[];
  state!: T;
  pendingState: T;

  abstract getInitialValue(): T; 
  abstract setPendingState(count: number): void;

  constructor(position: number, width: number, height: number) {
    this.state = this.getInitialValue();
    this.neighbourCells = [];
    this.position = position;
    this.pendingState = this.state;
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

  public setNeighbourCells = (cells: AbstractCell<T>[]): void => {
    this.neighbourCells = (this.neighbourPositions.map((position: number): AbstractCell<T> => cells[position]));
  }

  public prepare = (): void => {
    const count: number = this.neighbourCells.reduce(
      (count: number, current: AbstractCell<T>): number => {
        return current.state ? count + 1 : count
      }, 0)
    this.setPendingState(count);
  }

  public transfer = (): T => {
    this.state = this.pendingState;
    return this.state;
  }
}

export abstract class AbstractLifeStore<T extends LifeTypes> {
  cells!: AbstractCell<T>[];
  renderData: T[] = [];

  constructor (width: number, height: number) {
    this.reset(width, height);
  }

  abstract createCell(index: number, width: number, height: number): AbstractCell<T>; 
  abstract getFillColor(state: T): string;

  private transfer = () => {
    this.renderData = this.cells.map((cell: AbstractCell<T>) => cell.transfer());
  }

  public reset = (width: number, height: number) => {
    this.cells = Array.from(
      Array( width * height ), 
      (_, index, ) => this.createCell(index, width, height)
    );
    this.cells.forEach((cell: AbstractCell<T>, _, self: AbstractCell<T>[]) => {
      cell.setNeighbourCells(self);
    });
    this.transfer();
  }

  public process = (): void => {
    this.cells.forEach((cell: AbstractCell<T>) => cell.prepare());      
    this.transfer();
  } 
}

export class Cell extends AbstractCell<boolean>{
  public getInitialValue(): boolean {
    return Math.random() > .5 ? true : false;
  }

  public setPendingState(count: number): void {
    this.pendingState = (this.state ? count >= 2 && count <= 3 : count === 3);
  }
}

export class LifeStore extends AbstractLifeStore<boolean> {
  public createCell(index: number, width: number, height: number): Cell {
    return new Cell(index, width, height);
  }

  public getFillColor(state: boolean): string {
    return state ? '#000' : '#FFF';
  }
}

export class CellNumeric extends AbstractCell<number>{
  public getInitialValue(): number {
    return Math.random() > .5 ? 1 : 0;
  }

  public setPendingState(count: number): void {
    if (this.state > 0) {
      this.pendingState = count >= 2 && count <= 3 ? this.state + 1 : 0;
    } else {
      this.pendingState = count === 3 ? 1 : 0;
    }
  }
}

export class LifeStoreNumeric extends AbstractLifeStore<number> {
  public createCell(index: number, width: number, height: number): CellNumeric {
    return new CellNumeric(index, width, height);
  }

  public getFillColor(state: number): string {
    return state < colors.length ? colors[state] : lastColor;
  }
}