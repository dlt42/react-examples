export type LifeTypes = boolean | number;

export type LifeStore = AbstractLifeStore<LifeTypes>;
export type Cell = AbstractCell<LifeTypes>;

export abstract class AbstractCell<T extends LifeTypes> {
  position: number;
  neighbourCells: AbstractCell<T>[];
  neighbourPositions: number[];
  state!: T;
  pendingState: T;

  abstract getInitialValue(): T; 
  abstract setPendingState(count: number): void;
  abstract transferOriginalState(original: Cell): void;

  constructor(position: number, width: number, height: number, original?: Cell ) {
    if (original) {
      this.transferOriginalState(original);
      this.neighbourCells = [];
      this.position = position;
      this.pendingState = this.state;
      this.neighbourPositions = original.neighbourPositions;
    } else {
      this.state = this.getInitialValue();
      this.neighbourCells = [];
      this.position = position;
      this.pendingState = this.state;
      this.neighbourPositions = [];
    }
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

  public transfer = (): LifeTypes => {
    this.state = this.pendingState;
    return this.state;
  }
}

export abstract class AbstractLifeStore<T extends LifeTypes> {
  cells: AbstractCell<T>[] = [];
  renderData: LifeTypes[] = [];
  generations: number = 0;

  constructor (width: number, height: number, original?: LifeStore) {
    this.reset(width, height, original);
  }

  abstract createCell(index: number, width: number, height: number, original?: Cell): AbstractCell<T>; 
  abstract getFillColor(state: T): string;

  private transfer = () => {
    this.renderData = this.cells.map((cell: AbstractCell<T>) => cell.transfer());
  }
  
  public reset = (width: number, height: number, original?: LifeStore) => {
    this.cells = Array.from(
      Array( width * height ), 
      (_, index, ) => {
        return this.createCell(index, width, height, original?.cells[index]);
      }
    );
    this.cells.forEach((cell: AbstractCell<T>, _, self: AbstractCell<T>[]) => {
      cell.setNeighbourCells(self);
    });
    this.generations = original ? original.generations : 0;
    this.transfer();
  }

  public process = (): void => {
    this.cells.forEach((cell: AbstractCell<T>) => cell.prepare());     
    this.generations += 1; 
    this.transfer();
  } 
}