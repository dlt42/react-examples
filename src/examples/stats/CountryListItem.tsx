import { FC, memo, useCallback } from 'react';

import {
  Country,
  CountryCode,
  setHighlightCountryCode,
} from '../../state/appSlice';
import { useAppDispatch } from '../../state/useAppDispatch';

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
