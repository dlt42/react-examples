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
    const loadCountries = async () => {
      try {
        const res: { data: Country[] } = await axios.get('https://restcountries.com/v2/all?fields=name,capital,region,subregion,population,alpha3Code,flag')
        res.data.forEach((current: Country) => {
          current.key = `${current.name}-${current.alpha3Code}`;
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
        <AppNav title='Country Stats'/>
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