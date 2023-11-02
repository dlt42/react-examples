import { FC, memo, useCallback, useEffect, useReducer, useState } from 'react';

import { useAppSelector } from '../../hooks/useAppDispatch/useAppDispatch';
import {
  Countries,
  Country,
  CountryCode,
  selectCountries,
  selectHighlightCountryCode,
} from '../../state/appSlice';
import CountryListItem, { CountryListItemProps } from './CountryListItem';

type ItemRefs = Record<string, HTMLDivElement>;

const CountryList: FC = memo((): JSX.Element => {
  const [allowScroll, setAllowcroll] = useState(true);
  const countries: Countries = useAppSelector(selectCountries);
  const highlightCountryCode: CountryCode = useAppSelector(
    selectHighlightCountryCode
  );
  const [itemRefs, addItemRef] = useReducer(
    (
      itemRefs: ItemRefs,
      details: { el: HTMLDivElement; code: CountryCode }
    ): Record<string, HTMLDivElement> => {
      itemRefs[details.code as string] = details.el;
      return itemRefs;
    },
    {} as ItemRefs
  );
  const scrollToHighlighted = useCallback(
    (code: CountryCode): void => {
      if (allowScroll && code && itemRefs[code]) {
        itemRefs[code].scrollIntoView();
      }
    },
    [itemRefs, allowScroll]
  );
  useEffect(() => {
    scrollToHighlighted(highlightCountryCode);
  }, [highlightCountryCode, scrollToHighlighted]);
  return (
    <div
      className='bg-zinc-300 overflow-scroll m-1 border 
        border-solid border-gray-400 w-[200px] shrink-0"}'
      onMouseEnter={() => setAllowcroll(false)}
      onMouseLeave={() => setAllowcroll(true)}
    >
      {countries &&
        countries.items &&
        countries.items.map((current: Country) => {
          const props: CountryListItemProps = {
            current,
            addItemRef,
            className: `grow m-1 border-green-500 border border-solid 
              ${
                highlightCountryCode === current.alpha3Code
                  ? `bg-red-600 text-white `
                  : `bg-white text-black cursor-default`
              }`,
          };
          return <CountryListItem key={current.key} {...props} />;
        })}
    </div>
  );
});
CountryList.displayName = 'CountryList';

export default CountryList;
