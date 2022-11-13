import { 
  FunctionComponent, 
  memo 
} from "react";
import CountryList from "./CountryList";
import SimpleMap from "./SimpleMap";
import './CountryStats.css';
import CountryDetails from "./CountryDetails";

const CountryStats: FunctionComponent = memo((): JSX.Element => (
    <>
      <div className="List-Container">
        <h3>Countries</h3>
        <CountryList />
      </div>
      <div className="Map-Container">
        <h3>World Map</h3>
        <SimpleMap />
        <CountryDetails />
      </div>
    </>
  )
)

export default CountryStats;