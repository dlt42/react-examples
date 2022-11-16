import { 
  FunctionComponent, 
  memo, 
  useEffect, 
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
import "./CountryDetails.css"

const CountryDetails: FunctionComponent = memo((): JSX.Element => {
  const countries: Countries = useAppSelector(selectCountries); 
  const highlightCountryCode: CountryCode = useAppSelector(selectHighlightCountryCode); 
  const [ country, setCountry ] = useState<Country | null>(null);
  useEffect((): void => {
    if (highlightCountryCode) {
      const found = countries.items.find((country: Country) => {
        return country.alpha3Code === highlightCountryCode;
      })
      setCountry(found || null);
    } else {
      setCountry(null);
    }
  }, [highlightCountryCode, countries.items]);
  if (country) {
    return (
      <div className="Country-Details">
        <div className="Country-Details-Image">
          <img src={country.flag} alt={`Flag: ${country.name}`}/>
        </div>
        <div className="Country-Details-Text">
          <div>
            <span>Name</span><span>{country.name}</span>
          </div>
          <div>
            <span>Population</span><span>{country.population}</span>
          </div>
          <div>
            <span>Region</span><span>{country.region}</span>
          </div>
          <div>
            <span>Sub region</span><span>{country.subregion}</span>
          </div>
          <div>
            <span>Capital</span><span>{country.capital}</span>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="Country-Details">
        <div className="Country-Details-Image">
        </div>
        <div className="Country-Details-Text">
        </div>
      </div>
    )
  }
});

export default CountryDetails;