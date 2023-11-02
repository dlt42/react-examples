import { FC, memo, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { setHighlightCountryCode } from '../../../state/appSlice';
import { Country, CountryCode } from './Country.types';

export type CountryListItemProps = {
  current: Country;
  addItemRef: React.Dispatch<{ el: HTMLDivElement; code: CountryCode }>;
  className: string;
};

const CountryListItem: FC<CountryListItemProps> = memo(
  ({ current, addItemRef, className }): JSX.Element => {
    const appDispatch = useAppDispatch();
    const dispatchHighlightCountryCode = useCallback(
      (countryCode: CountryCode): void => {
        appDispatch(setHighlightCountryCode(countryCode));
      },
      [appDispatch]
    );
    return (
      <div
        ref={(el: HTMLDivElement) =>
          addItemRef({ code: current.alpha3Code, el })
        }
        key={current.key}
        onMouseEnter={() => dispatchHighlightCountryCode(current.alpha3Code)}
        onMouseLeave={() => dispatchHighlightCountryCode(null)}
        className={className}
      >
        {current.name}
      </div>
    );
  }
);

export default CountryListItem;
