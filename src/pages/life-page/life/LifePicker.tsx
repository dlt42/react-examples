import { FC, memo, useEffect, useState } from 'react';

import { LifeTypes } from './LifeAbstract';

type RawPattern<T extends LifeTypes> = T[];

type LifePickerProps<T extends LifeTypes> = {
  onSelect: (pattern: T[]) => void;
};

type Pattern<T extends LifeTypes> = {
  pattern: RawPattern<T>;
};

export const LifePicker: FC<LifePickerProps<LifeTypes>> = memo(
  (): JSX.Element => {
    const [patterns, setPatterns] = useState<Pattern<LifeTypes>[]>([]);
    useEffect(() => {
      setPatterns([{ pattern: [] }]);
    }, []);
    return (
      <>
        {patterns.map((_, i) => {
          /*
           *_pattern: Pattern<LifeTypes>
           */
          return <div key={i}>{i}</div>;
        })}
      </>
    );
  }
);
