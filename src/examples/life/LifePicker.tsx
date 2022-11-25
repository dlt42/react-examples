import { FC, memo, useEffect, useState } from "react";
import { LifeTypes } from "./LifeAbstract";

type RawPattern<T extends LifeTypes> = T[];

export interface LifePickerProps<T extends LifeTypes>  {
  onSelect: (pattern: T[]) => void;
}

export interface Pattern<T extends LifeTypes> {
  pattern: RawPattern<T>
}

export const LifePicker: FC<LifePickerProps<LifeTypes>> = memo(({onSelect}): JSX.Element => {
  const [ patterns, setPatterns ] = useState<Pattern<LifeTypes>[]>([]);
  useEffect(() => {
    setPatterns([
      { pattern: []}
    ]);
  },[])
  return (
    <>
      { 
        patterns.map((pattern: Pattern<LifeTypes>) => {
          return (
            <div></div>
          );
        })
      }
    </>
  )
})