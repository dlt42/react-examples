import { FunctionComponent } from "react";
import { useEffect, useState } from 'react';
import AppNav from '../components/Header';
import { Countries, selectCountries } from "../state/appSlice";
import { useAppSelector } from "../state/hooks";
import CountryStats from "../stats/CountryStats";
import "./StatsPage.css";
  
const StatsPage: FunctionComponent = (): JSX.Element => {
  const [ status, setStatus ] = useState('Loading');
  const countries: Countries = useAppSelector(selectCountries);
  useEffect(() => {
    if (countries) {
      setStatus('Loaded');
    } else {
      setStatus('No Data');
    }
  }, [countries]);
  return (
    <>
      <header>
        <AppNav title='World Map'/>
      </header>
      <main>
        <section className="Country-Stats-Section">
          { 
            status === 'Loaded'
              ? <CountryStats /> 
              : <h4>{ status }</h4>
          }
        </section>
      </main>
    </>
  )
}

export default StatsPage;