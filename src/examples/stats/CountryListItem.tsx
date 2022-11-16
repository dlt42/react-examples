import { 
  FunctionComponent, 
  memo, 
  MouseEvent, 
  useCallback
} from "react";
import { 
  Country, 
  setHighlightCountryCode, 
  CountryCode
} from "../../state/appSlice";
import { 
  useAppDispatch, 
} from "../../state/hooks";
import "./CountryList.css"

export interface CountryListItemProps {
  current: Country,
  addItemRef: React.Dispatch<{ el: HTMLDivElement, code: CountryCode }>,
  className: string
}
const CountryListItem: FunctionComponent<CountryListItemProps> = memo(({ current, addItemRef, className }): JSX.Element => {
  const appDispatch = useAppDispatch();
  const dispatchHighlightCountryCode = useCallback((countryCode: CountryCode): void => {
    appDispatch(setHighlightCountryCode(countryCode));
  }, [appDispatch]);
  return (
    <div 
      ref={ (el: HTMLDivElement) => addItemRef({ code: current.alpha3Code, el }) }
      key={ current.key }
      onMouseEnter={ (e: MouseEvent) => dispatchHighlightCountryCode(current.alpha3Code) }  
      onMouseLeave={ (e: MouseEvent) => dispatchHighlightCountryCode(null) }  
      className={ className }>
      { current.name }
    </div>
  );
});

export default CountryListItem;