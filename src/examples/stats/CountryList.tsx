import { 
  FunctionComponent, 
  memo, 
  MouseEvent, 
  useCallback, 
  useEffect, 
  useReducer, 
  useState
} from "react";
import { 
  Country, 
  Countries, 
  selectCountries, 
  selectHighlightCountryCode,
  CountryCode
} from "../../state/appSlice";
import {
  useAppSelector 
} from "../../state/hooks";
import "./CountryList.css"
import CountryListItem, { CountryListItemProps } from "./CountryListItem";

type ItemRefs = Record<string, HTMLDivElement>;

const CountryList: FunctionComponent = memo((): JSX.Element => {
  const [ allowScroll, setAllowcroll ] = useState(true);
  const countries: Countries = useAppSelector(selectCountries); 
  const highlightCountryCode: CountryCode = useAppSelector(selectHighlightCountryCode);
  const [ itemRefs, addItemRef ] = useReducer((itemRefs: ItemRefs, details: { el: HTMLDivElement, code: CountryCode }): Record<string, HTMLDivElement> => {
    itemRefs[details.code as string] = details.el;
    return itemRefs;
  }, {} as ItemRefs);
  const scrollToHighlighted = useCallback((code: CountryCode): void => {
    if (allowScroll && code && itemRefs[code]) {
      itemRefs[code].scrollIntoView();
    }
  }, [itemRefs, allowScroll]);
  useEffect(() => {
    scrollToHighlighted(highlightCountryCode);
  }, [highlightCountryCode, scrollToHighlighted]);
  return (
    <div 
      className="Country-List" 
      onMouseEnter={(e: MouseEvent) => setAllowcroll(false)}
      onMouseLeave={(e: MouseEvent) => setAllowcroll(true)}>
      {
        countries && countries.items && countries.items.map((current: Country) => {
          const props: CountryListItemProps = {
            current, 
            addItemRef, 
            className: highlightCountryCode === current.alpha3Code ? "CountryHighlight" : "Country"
          };
          return (
            <CountryListItem key={ current.key } {...props} />
          );
        })
      }
    </div>
  )
});

export default CountryList;