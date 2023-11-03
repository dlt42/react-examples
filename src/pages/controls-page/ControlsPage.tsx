import { FC, MouseEvent, useCallback, useState } from 'react';

import Header from '../../components/Header/Header';
import RadialSelect from './radial/RadialSelect';
import {
  RadialSelectionTypes,
  RadialSelectProps,
} from './radial/RadialSelect.types';

const ControlsPage: FC = (): JSX.Element => {
  const [value, setValue] = useState<RadialSelectionTypes | null>();
  const onChange = useCallback(
    (_e: MouseEvent, value: RadialSelectionTypes) => {
      setValue(value);
    },
    []
  );
  const radialSelectProps: RadialSelectProps<RadialSelectionTypes> = {
    label: `Select Option`,
    selectedLabel: `Selected:`,
    onChange: onChange,
    options: [
      { value: `A`, label: `Option A` },
      { value: `B`, label: `Option B` },
      { value: `C`, label: `Option C` },
      { value: `D`, label: `Option D` },
      { value: `E`, label: `Option E` },
      { value: `F`, label: `Option F` },
      { value: `G`, label: `Option G` },
    ],
    selected: ``,
    diameter: 300,
    itemDiameter: 80,
    centerDiameter: 120,
  };
  return (
    <>
      <header>
        <Header title='Controls' />
      </header>
      <main>
        <section className='flex flex-col items-center overflow-hidden'>
          <h3>Radial Select</h3>
          <div>(for a small number of options)</div>
          <div className='m-1'>
            Currently selected:
            {value
              ? radialSelectProps.options.filter((o) => value === o.value)[0]
                  .label
              : `nothing`}
          </div>
          <RadialSelect {...radialSelectProps} />
        </section>
      </main>
    </>
  );
};

export default ControlsPage;
