
import { AbstractCell, AbstractLifeStore, Cell, LifeTypes } from "./LifeAbstract";

export type LifeContainerProps = {
  width: number,
  height: number
}

export type LifeSlowProps<T extends LifeTypes> = {
  width: number,
  height: number,
  setInitialising: React.Dispatch<React.SetStateAction<boolean>>,
  paused: boolean,
  lifeStore: AbstractLifeStore<T>,
  rendered: Function
}

export type LifeFastProps<T  extends LifeTypes> = LifeSlowProps<T> & {
  size: number
}

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
export const lifeBooleanColor: string = '#FFF';

export type StoreTypes =  LifeStoreBoolean | LifeStoreNumeric;

export class CellBoolean extends AbstractCell<boolean>{
  public getInitialValue(): boolean {
    return Math.random() > .5 ? true : false;
  }

  public setPendingState(count: number): void {
    this.pendingState = (this.state ? count >= 2 && count <= 3 : count === 3);
  }

  public transferOriginalState(original: Cell): void {
      this.state = original instanceof CellBoolean ? original.state : (original.state > 0 ? true : false);
  }
}

export class CellNumeric extends AbstractCell<number> {
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

  public transferOriginalState(original: Cell): void {
    this.state =  original instanceof CellNumeric ? original.state : (original.state ? 1 : 0);
  }
}

export class LifeStoreBoolean extends AbstractLifeStore<boolean> {
  public createCell(index: number, width: number, height: number, original?: Cell): CellBoolean {
    return new CellBoolean(index, width, height, original);
  }

  public getFillColor(state: boolean): string {
    return state ? lifeBooleanColor : colors[0];
  }
}

export class LifeStoreNumeric extends AbstractLifeStore<number> {
  public createCell(index: number, width: number, height: number, original?: Cell): CellNumeric {
    return new CellNumeric(index, width, height, original);
  }

  public getFillColor(state: number): string {
    return state < colors.length ? colors[state] : lastColor;
  }
}