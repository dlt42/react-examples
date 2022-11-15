import { FunctionComponent } from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import AppNav from '../components/Header';
import { Countries, Country, setCountries } from "../state/appSlice";
import { useAppDispatch } from "../state/hooks";
import CountryStats from "../stats/CountryStats";
import "./StatsPage.css";

const emptyList: Countries = { items: [] };
  
const StatsPage: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [ status, setStatus ] = useState('Loading');
  useEffect(() => {

    // TODO: Move this code to a utility and call it higher up in the component tree 
    const loadCountries = async () => {
      try {
        const res: { data: Country[] } = await axios.get('https://restcountries.com/v2/all?fields=name,capital,region,subregion,population,alpha3Code,flag,altSpellings')
        res.data.forEach((current: Country) => {
          current.key = `${current.name}-${current.alpha3Code}`;
          current.shortName = current.name;
          if (current.altSpellings) {
            current.altSpellings
              .sort((a, b) => b.length - a.length)
              .forEach((spelling: string) => {
                if (current.shortName.length > 20 && current.shortName.length < spelling.length && spelling.length > 3) {
                  current.shortName = spelling;
                }
              })
          }
          if (current.shortName.length > 20) {
            current.shortName = current.shortName.substring(0, 16) + '...';
          }
        });
        const countries: Countries = { items: res.data };
        dispatch(setCountries(countries));
        setStatus('Loaded');
      } catch(e) {
        setCountries(emptyList);
        setStatus('Error');
      }
    }
    loadCountries();
  }, [dispatch]);
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